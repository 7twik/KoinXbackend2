const express = require('express');
const app = express();
require('dotenv').config();
const port = 8080;
require("./db/conn");
const cors = require("cors");
const cron = require('node-cron');

app.use(express.json());

const {update,stats,deviation}=require("./controller/crypto");
app.use(cors());

cron.schedule('0 */2 * * *', async () => {
    await update();
  });
// every 10 second
// cron.schedule('*/10 * * * * *', async () => {
//     await update();
//   });
app.use('/stats',stats);
app.use('/deviation',deviation);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});