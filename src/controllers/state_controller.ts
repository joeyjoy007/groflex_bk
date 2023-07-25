import { RequestHandler } from "express";
import state_model from "../models/state_model";
import { response } from "../helpers/Response";
import country_model from "../models/country_model";

export const createState:RequestHandler=async(req,res,next)=>{
    try {
            const create_state = new state_model(req.body);
            if(create_state){
                create_state.save()
                const update_country_state = await country_model.findByIdAndUpdate({_id:req.body.country},{
                    $push:{state:create_state._id}
                })
                if(update_country_state){
                    response(201,1,create_state,'state created and country_state_updated',res)
                }
                else{
                    response(400,0,'country_state_not_updated','state created but country_state_not_updated',res)

                }
            }else{
                response(400,0,'state not created','state not created',res)
            }
    } catch (error:any) {
        response(400,0,error.message,'state not created',res)
    }
}

export const getAllState:RequestHandler=async(req,res,next)=>{
    try {
            const get_state = await state_model.find({country:req.body.countryId});
            if(get_state){
                response(201,1,get_state,'state fetched',res)
            }else{
                response(400,0,'state not fetched','state not fetched',res)
            }
    } catch (error:any) {
        response(400,0,error.message,'state not fetched',res)
    }
}
