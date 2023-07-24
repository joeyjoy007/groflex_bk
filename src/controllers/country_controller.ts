import { RequestHandler } from "express";
import state_model from "../models/state_model";
import { response } from "../helpers/Response";
import country_model from "../models/country_model";

export const createCountry:RequestHandler=async(req,res,next)=>{
    try {
            const create_country = new country_model(req.body);
            if(create_country){
                create_country.save()
                response(201,1,create_country,'country created',res)
            }else{
                response(400,0,'country not created','country not created',res)
            }
    } catch (error:any) {
        response(400,0,error.message,'country not created',res)
    }
}

export const getAllCountry:RequestHandler=async(req,res,next)=>{
    try {
            const get_country = await state_model.find();
            if(get_country){
                response(201,1,get_country,'country fetched',res)
            }else{
                response(400,0,'country not fetched','country not fetched',res)
            }
    } catch (error:any) {
        response(400,0,error.message,'country not fetched',res)
    }
}
