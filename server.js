require('dotenv').config();
const express = require('express');
const connectionToDB = require("./database/db");


// connect to monogo database
connectionToDB();


const app = express();
const port = process.env.PORT || 3000

//middleware
app.use(express.json());

// connect to endpoints



app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
});
