import type { Request, Response } from "express";

import { userService } from "./user.service";

 const createUser =async (req: Request, res: Response) => {
  try {
    // console.log(req.body);
    // const body = req.body;
   const result = await userService.crateUserIntoDB(req.body);

    //   console.log(password);
    res.status(201).json({
      success: "true",
      message: "User created",
      // data:body,
      // data: { name, age },
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      // data:body,
      // data: { name, age },
      data: error,
    });
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  try {
   const result = await userService.getAllUsersFromDB();
    // console.log(result)
    res.status(200).json({
      success: true,
      message: "Users fetching successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      // data:body,
      // data: { name, age },
      error: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
   
    const { id } = req.params;
    const result = await userService.getSingleUserFromDB(id as string)
    // console.log(result)
    res.status(201).json({
      success: "true",
      message: "User created",
      // data:body,
      // data: { name, age },
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      // data:body,
      // data: { name, age },
      error: error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
     const { id } = req.params;
    const result =await userService.updateUserFromDB(req.body,id as string);
    res.status(200).json({
      success: "true",
      message: "User Updated Successfully",
      // data:body,
      // data: { name, age },
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      // data:body,
      // data: { name, age },
      error: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
   const result = await userService.deleteUserFromDB(id as string)
    // console.log(result);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: true,
        message: "User not found",
        // data:body,
        // data: { name, age },
        // data:result.rows[0]
      });
    }

     res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
        // data:body,
        // data: { name, age },
        // data:result.rows[0]
      });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      // data:body,
      // data: { name, age },
      error: error,
    });
  }
}


export const userController = {
    createUser,getAllUsers,getSingleUser,updateUser,deleteUser
}