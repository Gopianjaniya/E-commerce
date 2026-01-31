import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
dotenv.config();

connectDB();
connectCloudinary();
//-----App config
const app = express();
const port = process.env.PORT || 4000;

// ------ middleware
app.use(express.json());
// app.use(cors());
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://e-commerce-u7or.vercel.app",
  "https://e-commerce-r5vi.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // postman / server-side requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "token"],
  }),
);

// preflight fix (VERY IMPORTANT)
// app.options("*", cors());


//  ------------ api endpints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  return res.send("API Working.....");
});

app.listen(port, () => {
  console.log(`Server running on Port : ${port}`);
});
// export default app;
