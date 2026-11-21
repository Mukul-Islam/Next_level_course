import type { Request, Response } from "express";
import { profileService } from "./profile.service";


const  createProfile = async(req:Request,res:Response)=>{
    try {

        const result = await profileService.createProfileIntroDB(req.body);

        res.status(500).json({
      success: true,
      message: "profile created Successfully",
      // data:body,
      // data: { name, age },
      data: result.rows[0]
    });
        
    } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      // data:body,
      // data: { name, age },
      error: error,
    });
}}

export const profileController = {
    createProfile
};