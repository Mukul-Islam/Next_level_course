import { Router } from "express";
import { loginController } from "./auth.controller";

const router = Router();
// console.log(router)
router.post("/login",loginController.createLogin)

export const loginRoute = router;