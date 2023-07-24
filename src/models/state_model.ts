import mongoose, { Schema, Types } from "mongoose";

export interface IState {
    state:String,
    country:Types.ObjectId,
    city:Types.ObjectId
  }

export interface IStateModel extends IState, Document {}


const stateSchema:Schema = new mongoose.Schema({
    state:String,
    country:{type:mongoose.Types.ObjectId,ref:'Country'},
    city:
   [ 
    {
        type:mongoose.Types.ObjectId,
        ref:"City"
    }
   ],
          
},{
  timestamps:true
})

  
export default mongoose.model<IStateModel>("State",stateSchema)