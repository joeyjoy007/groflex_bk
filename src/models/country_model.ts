import mongoose, { Schema, Types } from "mongoose";

export interface Country {
    country:string
    state:Types.ObjectId,
  }

export interface ICountryModel extends Country, Document {}


const countrySchema:Schema = new mongoose.Schema({
    country:String,
    state:[{type:mongoose.Types.ObjectId,ref:'State'}]
 
          
},{
  timestamps:true
})

  
export default mongoose.model<ICountryModel>("Country",countrySchema)