import { RequestHandler } from "express";
import user_model from "../models/user_model";
import { response } from "../helpers/Response";
import { generateToken } from "../helpers/Generate_tokens";

export const createUser:RequestHandler=async(req,res,next)=>{
    try {
        const check = await user_model.find({email:req.body.email})
        if(check.length > 0){
            response(400,0,'user already exist','user already exist',res) 
        }
        else{
            const create = new user_model(req.body);
            if(create){
                create.save()
                response(201,1,create,'user created',res)
            }else{
                response(400,0,'user not created','user not created',res)
            }
        }
 
    } catch (error:any) {
        response(400,0,error.message,'user not created',res)
    }
}


export const loginUser: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body;
    let token;
    try {
        if (!email || !password) {
            response(400, 0, "Complete details", "Details not found", res);
        } else {
            const user = await user_model.findOne({ email });
            if (!user) {
                response(400, 0, "User not found", "User not found", res);
            } else {
                const matchPassword = await user.comparePassword(password, res);
                if (!matchPassword) {
                    response(400, 0,"Invalid credentials", "invalid credentials", res);
                } else {
                    token = await generateToken(user._id);
                    response(200, 1, { user, token }, "Login Successfull", res);
                }
            }
        }
    } catch (error: any) {
        response(400, 0, error.message, "User not found", res);
    }
};


export const getAllUser:RequestHandler = async(req:any,res,next)=>{
    try {
        const searchUser = await user_model.find().populate('country state')
        if(searchUser.length > 0){
            response(200,1,searchUser,'user found',res)
        }else{
            response(400,0,'user not found','user not found',res)

        }
        
    } catch (error:any) {
        response(400,0,error.message,'user not found',res)
    }
}

export const getUserDetail:RequestHandler = async (req,res,next)=>{
    console.log(req.body)
    try {
        const checkUser = await user_model.findById(req.body._id)
        if(checkUser){
            response(200,1,checkUser,'user fetched',res)
        }
        else{
            response(400,0,'user not found','user not found',res)
        }
        
    } catch (error:any) {
        response(400,0,error,'user not found',res)
    }
}

export const deleteUser:RequestHandler = async (req,res,next)=>{
    console.log(req.body)
    try {
        const deleteUser = await user_model.findByIdAndDelete(req.body._id,{new:true})
        if(deleteUser){
            response(200,1,deleteUser,'user deleted',res)
        }
        else{
            response(400,0,'user not deleted','user not deleted',res)
        }
        
    } catch (error:any) {
        response(400,0,error,'user not found',res)
    }
}

export const updateUser:RequestHandler = async (req,res,next)=>{
    console.log(req.body.userId)

    try {
        const checkUser = await user_model.findByIdAndUpdate({_id:req.body.userId},req.body)
        console.log(checkUser)
      if(checkUser){
        response(201,1,checkUser,'user updated',res)

        }else(
            response(400,0,'user not updated','user not updated ',res)
        )
    } catch (error:any) {
        response(400,0,error,'user not updated',res)
    }
}



export const searchUser:RequestHandler = async(req,res,next)=>{
    console.log(req.params.searchKey)
   try{
     const searchUser = await user_model.find(
        {
        "$or":[
            {username:{$regex:req.params.searchKey}}
        ]
        }
    )
    if(searchUser.length > 0){
        response(200,1,searchUser,'user found',res)
    }else{
        response(400,0,'user not found','user not found',res)

       }
    }
    catch (error: any) {
        response(400,0,error.message,'user not fetched',res)
    }
}

export const page_controller:RequestHandler = async(req,res,next)=>{
    try {
        console.log(req.body)
        const page = req.body.page || 1
        const limit = req.body.limit || 5

        const skip = (page -1)* limit
        const count = await user_model.find().count();
        const pagination = await user_model.find().skip(skip).limit(limit);
        if(pagination){
            response(200,1,{pagination,count},'paginated',res)
        }else{
            response(400,0,'page error','page error',res)
        }
        
       
    } catch (error: any) {
        response(400,0,error.message,'page error',res)
    }
}