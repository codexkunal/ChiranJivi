import express from "express"
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";
import mailRouter from "./routes/videoCallRoute.js";
import chatbotRouter from "./routes/chatbotRoute.js";
import chartRouter from "./routes/chartRoutes.js";
const app = express()
const PORT = process.env.PORT || 3000;
connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors({
  origin: "*", 
  credentials: true 
}));

app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/admin", adminRouter);
app.use("/api/mail", mailRouter);
app.use("/api", chatbotRouter);
app.use("/api", chartRouter);


app.get("/", (req, res) => {
    res.send("Hello from the backend!");
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });