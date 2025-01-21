import express from "express"
import { ChatbotLLM } from "../controllers/chatbotController.js";


const chatbotRouter = express.Router();
chatbotRouter.post("/message", ChatbotLLM);
export default chatbotRouter;