const express = require('express');
const mongo = require('./database/mongo')

const app = express();
const port = 8000;





async function startServer()
{
  await mongo.mongoConnect()
  
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

}

startServer()
