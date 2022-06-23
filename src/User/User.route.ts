import { Router } from "express";
import { UserController } from "./User.controller";

const router = Router();

// router.post("/signup",UserController.protect, UserController.signUp); // Actual signup
router.post("/signup", UserController.signUp);  // is to be commented out

router.post("/signin", UserController.signIn);

router.post("/password-forgot", UserController.forgotPassword);

router.use(UserController.protect);

router.get("/", UserController.getAll);
router.get("/:id", UserController.getOne);
router.post("/password-change", UserController.changePassword);


export default router;
