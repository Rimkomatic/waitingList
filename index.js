const http = require('http')
const express = require('express');
const mongo = require('./database/mongo')
const dotenv = require('dotenv')
const bodyParser = require('body-parser');


const emailRouter = require('./routes/email.router')

const app = express();
const port = 8000;


const server = http.createServer(app)

app.use(bodyParser.json());

dotenv.config()

app.use(express.urlencoded({ extended: true }));
app.use( '/' , emailRouter )


async function startServer()
{
  try{
    await mongo.mongoConnect()
    
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }catch(err)
  {
    console.log(err)
  }

}

startServer()
