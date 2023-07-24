import mongoose, { Schema, Types } from "mongoose";
import bcrypt from 'bcrypt'
import { response } from "../helpers/Response";

export interface IUser {
    username:string,
    email:string,
    country:Types.ObjectId,
    state:Types.ObjectId,
    city:string,
    gender:string,
    interest:string,
    zip_code:string,
    profile:string,
    password:string,
    dob:string
  }

export interface IUserModel extends IUser, Document {
    comparePassword(p: string, r: any);
}


const userSchema:Schema = new mongoose.Schema({
    username:String,
    email:String,
    city:String,
    gender:String,
    zip_code:String,
    profile:String,
    state:
    {
        type:mongoose.Types.ObjectId,
        ref:"State"
    },
          
    country:
    {
        type:mongoose.Types.ObjectId,
        ref:"Country"
    },
    password:String,
    dob:String,
    interest:String
          
},{
  timestamps:true
})

userSchema.pre('save',async function(next){
    if (!this.isModified("password")) {
      return next(null);
  }else{
    this.password = await bcrypt.hash(this.password,10)
  }
  })
  
  userSchema.methods.comparePassword = async function (password:string,res:Response){
  const matchPassword = await bcrypt.compare(password,this.password)
  if (!matchPassword) {
    response(400,0,'invalid credentials ','check credentials',res)
  }
  return matchPassword;
  }
  
export default mongoose.model<IUserModel>("User",userSchema)