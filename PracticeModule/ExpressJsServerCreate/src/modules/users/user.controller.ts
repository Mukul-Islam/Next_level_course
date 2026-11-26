import type { Request, Response } from "express";
import { userService } from "./user.service";
const createUser = async(req:Request,res:Response)=>{
  
    const result =await userService.createUserIntoDB(req.body);

        res.status(200,).json({
            success: true,
            message:"Users2 created successfully",
            data:result.rows[0]
        });
    
}

// Get all users
const allUsers = async(req:Request,res:Response)=>{
  const result =await userService.getALlUsersIntoDB();

    try {
        res.status(200).json({
            success:true,
            message:"all users are getting successfully",
            data:result.rows[0]
        })
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:"everything are not okay",
            error:error
    })
}}

// GetSingleUsers
const getSingleUsers = async(req:Request,res:Response)=>{
    // ekhane niye aste gele 2ta jinis dekhte hoi 
    //? 1. amra body theke ki pacci
    //? 2. second amra amra ki query likhbo
    

    const {id} = req.params
    // console.log(id)
    const result =  userService.getSingleUsersFromDB(id as string)

    try {

        if((await result).rowCount === 0){
            res.status(404).json({
                success:false,
                message:"Users not found"
            })
        }


        res.status(200).json({
            success:true,
            message:"single users are getting successfully",
            data:(await result).rows
        })
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:"everything are not okay",
            data:error
    })
}
};

const updateUser = async(req:Request,res:Response)=>{
    // ekhane niye aste gele 2ta jinis dekhte hoi 
    //? 1. amra body theke ki pacci
    //? 2. second amra amra ki query likhbo
    
    const {id} = req.params
   const result = await userService.updateUserFromDB(id as string,req.body)
    try {

        if(result.rowCount === 0){
            res.status(404).json({
                success:false,
                message:"Users not found"
            })
        }


        res.status(200).json({
            success:true,
            message:"single users are getting successfully",
            data:result.rows
        })
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:"everything are not okay",
            data:error
    })
}
};

const deleteUser = async(req:Request,res:Response)=>{
    // ekhane niye aste gele 2ta jinis dekhte hoi 
    //? 1. amra body theke ki pacci
    //? 2. second amra amra ki query likhbo
    

    const {id} = req.params
    // console.log(id)
    const result = await userService.deleteUserFromDB(id as string);

    try {

        if(result.rowCount === 0){
            res.status(404).json({
                success:false,
                message:"Users not found"
            })
        }


        res.status(200).json({
            success:true,
            message:"users deleted successfully",
            // data:result.rows[0]
        })
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:"deleting are not okay",
            error:error
    })
}
}

export const userController = {
    createUser,allUsers,getSingleUsers,
    updateUser,deleteUser
}