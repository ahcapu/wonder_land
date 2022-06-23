import { Router } from "express";
import { UserController } from "../User/User.controller";
import { VisitorController } from "./Visitor.controller";


const router = Router();

router.use(UserController.protect);

router.post("/", VisitorController.add);
router.post("/new", VisitorController.addNew);
router.get("/", VisitorController.getAll);
router.get("/:phone", VisitorController.get);
router.post("/station-status", VisitorController.stationStatus);
export default router;