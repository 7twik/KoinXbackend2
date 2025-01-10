const cryptoSchema = require("../model/cryptoSchema");
async function update(){
    var names=['bitcoin','matic-network','ethereum'];
    var apikey=process.env.API_KEY;
    var tot=[];
    for(var i=0;i<names.length;i++)
    {
        
        const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids='+names[i];
        const options = {
        method: 'GET',
        headers: {accept: 'application/json', 'x-cg-demo-api-key': apikey}
        };
        
       const d=await fetch(url, options)
        .then(res => res.json())
        .catch(err => console.error(err));
        console.log(d);
        tot=tot.concat({symbol:names[i],currentPrice:d[0].current_price,marketCap:d[0].market_cap,change24h:d[0].price_change_24h});
    }
    for(var i=0;i<tot.length;i++)
    {
        const data=new cryptoSchema(tot[i]);
        const res=await cryptoSchema.findOne({symbol:tot[i].symbol});
            await data.save();
    }
}

async function stats(req,res){
    var coin=req.query.coin;
    if(coin[0]=='"'||coin[0]=="'")
        {
            coin=coin.slice(1,coin.length-1);
        }
    console.log(coin);
    var data=await cryptoSchema.find({symbol:coin});
    data=data[data.length-1];
    console.log(data)
    res.send({price:data.currentPrice,marketCap:data.marketCap,"24hChange":data.change24h});
}

async function deviation(req,res){
    var coin=req.query.coin;
    //if coin is wrapped with a "" then remove it
    if(coin[0]=='"'||coin[0]=="'")
    {
        coin=coin.slice(1,coin.length-1);
    }
    console.log(coin);
    var data=await cryptoSchema.find({symbol:coin});
    console.log(data);
    var sum=0;
    for(var i=0;i<data.length;i++)
    {
        sum+=data[i].currentPrice;
    }
    var mean=sum/data.length;
    console.log(mean);
    sum=0;
    for(var i=0;i<data.length;i++)
    {
        sum+=Math.pow(data[i].currentPrice-mean,2);
    }
    var deviation=Math.sqrt(sum/data.length);
    console.log(deviation);
    res.send({deviation:deviation});
}
module.exports={update,stats,deviation};