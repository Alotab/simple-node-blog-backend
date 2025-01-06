const mongoose = require("mongoose");

const connectionToDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log('mongodb connected successfully.')

    }catch(error){
        console.error("MongoDB connection failed.");
        process.exit(1);
    }
}

module.exports = connectionToDB;