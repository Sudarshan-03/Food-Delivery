import express from "express";
import cors from "cors";
import  { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoutes.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import bodyParser from 'body-parser';
import contactRouter from './routes/contactRoute.js';
import applicationRouter from './routes/applicationRoute.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 4000 ;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

connectDB();
// api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter  )
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)
app.use('/api/contact', contactRouter);
app.use('/api/application', applicationRouter);


app.get("/", (req, res) => {
    res.send("Food delivery backend is running successfully!")
})


app.listen(port ,()=>{
    console.log(`server is running on http://localhost:${port}`)
})
