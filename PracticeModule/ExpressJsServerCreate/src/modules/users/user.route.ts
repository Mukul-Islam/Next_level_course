import { Router} from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router = Router();


router.post("/",userController.createUser)

router.get("/",auth,userController.allUsers)

router.get("/:id",userController.getSingleUsers)

router.put("/:id",userController.updateUser)

router.delete("/:id",userController.deleteUser)


export const userRoute = router