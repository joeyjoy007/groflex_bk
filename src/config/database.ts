import Logging from "../helpers/Logging";

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/user_info').then((res: any)=>{
    Logging.info("Database connected successfully");
}).catch((err: any)=>{
    Logging.error(err);
   
})


module.exports = mongoose

