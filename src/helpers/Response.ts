import { Response } from 'express';
interface Res{
    Status:number,
    resStatus:number,
    payload:{} | any,
    message:string,
    res:Response
}

export const response= (Status,resStatus,payload,message,res)=>{
return res.status(Status).json({
    status:resStatus,
    payload:payload,
    message:message,
    response:response
})
}