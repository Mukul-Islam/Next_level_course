import { Router} from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { User_Role } from "../../types";

const router = Router();


router.post("/",userController.createUser)

router.get("/",auth(User_Role.admin,User_Role.agent,User_Role.user),userController.allUsers)

router.get("/:id",userController.getSingleUsers)

router.put("/:id",userController.updateUser)

router.delete("/:id",userController.deleteUser)


export const userRoute = router