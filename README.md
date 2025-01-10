
SCREENSHOT OF WORKING DEMO:
<p><img align="center" src="https://asset.cloudinary.com/dflwersfp/c76888bfe9de1aa6dcfe1c01782ad1f3" alt="7twik" /></p>
<p><img align="center" src="https://asset.cloudinary.com/dflwersfp/0815020ec2dc584cb7f6c2217f975c7a" alt="7twik" /></p>

Documentation:
--------------

    Cron job: 
       2 Hourly update of cryptocurrency collection

    MODEL:
       
      symbol:
      currentPrice:
      marketCap:
      change24h : 
      time:


    GET METHOD:


        1.  Route       =>  /stats

            Purpose     =>  It will return the latest data about the requested cryptocurrency.
            
            Dependancy=>

            params:{
                coin: "bitcoin"          
            }

            Note:Possible values are only bitcoin, matic-network or ethereum.

        2.  Route       =>  /deviation

            Purpose     =>  It will return the standard deviation of the price of the requested cryptocurrency for the last 100 records stored by the background service in the database.
            
            Dependancy  =>

               params:{
                coin: "bitcoin"          
              }
  




ENV VARIABLES NEEDED ARE:
DB_USERNAME=
DB_PASSWORD=
API_KEY=
