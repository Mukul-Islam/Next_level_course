import { Router,} from "express";
import { userController } from "./user.controller";

const router = Router();

router.post("/",userController.createUser)

router.get("/",userController.allUsers)

router.get("/:id",userController.getSingleUsers)

router.put("/:id",userController.updateUser)

router.delete("/:id",userController.deleteUser)


export const userRoute = router