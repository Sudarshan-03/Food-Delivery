import express from "express"
import auth from "../middleware/auth.js"
import cartControllers from "../controllers/cartControllers.js";

const { addToCart, removeFromCart, getCart } = cartControllers;
const cartRouter = express.Router();

cartRouter.post("/add", auth, addToCart)
cartRouter.post("/remove", auth, removeFromCart)
cartRouter.post("/get", auth, getCart)

export default cartRouter;
