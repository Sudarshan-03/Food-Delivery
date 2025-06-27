import userModel from "../models/userModel.js"


const addToCart = async (req, res) => {
    try {
      let userData = await userModel.findById(req.body.userId);
      let cartData = await userData.cartData;

      if(!cartData[req.body.itemId]){
        cartData[req.body.itemId] = 1;
      }else{
        cartData[req.body.itemId] += 1;
      }
      await userModel.findByIdAndUpdate(req.body.userId ,{cartData});
      res.json({success:true, msg:"Added to cart"});

    } catch (error) {
      console.log(error);
      return res.json({ success: false, msg: "Error adding to cart" });
    }
  };

  // Get cart items
  const getCart =  async (req, res) => {
    try {
      let userData = await userModel.findById(req.body.userId);
      let cartData = await userData.cartData;
      res.json({success:true, cartData});

    } catch (err) {
      console.log(err);
      return res.json({ success: false, msg: err.message });
    }

  };
  // Remove item from cart
  const removeFromCart = async (req, res) => {
    try {
      let userData = await userModel.findById(req.body.userId);
      let cartData = await userData.cartData;
      if(cartData[req.body.itemId]>0){
         cartData[req.body.itemId] -= 1;
      } 
      await userModel.findByIdAndUpdate(req.body.userId, {cartData});
      res.json({success:true, msg:"Removed from cart"});

    } catch (error) {
      console.log(error);
      return res.json({ success: false, msg: error.message });
    }
};

const cartControllers = {
  addToCart,
  getCart,
  removeFromCart
};

export default cartControllers;