import type { NextFunction, Request, Response } from "express";
import fs from "fs"

const logger =(req:Request,res:Response,next:NextFunction)=>{
    // console.log("custom middleware",Date.now())

    const log = `\n method-> ${req.method} \n url-> ${req.url} \n Date-> ${Date.now()}`

    fs.appendFile("logger.txt",log,(err)=>{
    //   console.log(err)  
    });

    next();

}

export default logger