import express from "express";
import {
  getUser,
  getAllUser,
  updateUser,
} from "../controllers/User.controller.js";
import upload from "../config/multer.js";
import { authenticate } from "../middleware/authenticate.js";
const UserRoute = express.Router();

UserRoute.use(authenticate);
UserRoute.get("/get-user/:userid", getUser);
UserRoute.put("/update-user/:userid", upload.single("file"), updateUser);
UserRoute.get("/get-all-user", getAllUser);

export default UserRoute;
