import express from "express"
import { sendMail } from "../controllers/sendMail.js";


const mailRouter = express.Router();
mailRouter.post("/sendInvite", sendMail);
export default mailRouter;