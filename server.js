require('dotenv').config();
const express = require('express');
const connectionToDB = require("./database/db");
const authRoutes= require('./routes/auth-routes');
const blogRoutes = require('./routes/blog-routes');


// connect to monogo database
connectionToDB();


const app = express();
const port = process.env.PORT || 3000

//middleware
app.use(express.json());

// connect to endpoints
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);


app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
});
