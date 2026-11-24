import type { Response } from "express";

type TResponse <T>={
    statusCode: number;
    success:boolean;
    message:string;
    data?: T;
    error?:any;
} 

const sendREsponse = <T>(res:Response,data:TResponse<T>)=>{

    res.status(200).json({
        success:data.success,
        message:data.message,
        data:data.data,
        error:data.error,
    })
}
export default sendREsponse