const mongoose = require("mongoose");

dbUri = process.env.MONGODB_URI;

mongoDB = async ()=>{
    try{
        mongoose.connect(dbUri);
        console.log("connected to Database successfully..");
    }
    catch(err){
        console.log(`Database connection failed! : `, err);
    }
}

module.exports = mongoDB;