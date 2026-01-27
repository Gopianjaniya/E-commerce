import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderroute.js";
dotenv.config();

//-----App config
const app = express();
const port = process.env.PORT || 4000;

// ------ middleware
app.use(express.json());
// app.use(cors());
app.use(
  cors({
    origin: [
      "https://e-commerce-nu-swart.vercel.app",
      "https://e-commerce-2pjf.vercel.app",
    ],
    credentials: true,
  }),
);

//  ------------ api endpints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working.....");
});

app.listen(port, () => {
  connectDB();
  connectCloudinary()
  console.log(`Server running on Port : ${port}`);
});
export default app;