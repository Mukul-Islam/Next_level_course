import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { User_Role } from "../../types";

const router = Router()



// /api/v1/users
router.post("/", userController.createUser);

router.get("/",auth(User_Role.admin,User_Role.agent,User_Role.user), userController.getAllUsers);

router.get("/:id",userController.getSingleUser );

router.put("/:id",userController.updateUser );

router.delete("/:id", userController.deleteUser);



export const userRoute = router;