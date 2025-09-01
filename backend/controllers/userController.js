// User controller for handling user-related operations
import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
 
// Login user 
const loginUser =async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user  =await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User Does'nt Exist ."})
        }
        const isMatch =await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Invalid Credentials"});

        }
        const token =createToken(user._id);
        res.json({success:true,token});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


// Register new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists){
      return res.json({success:false ,message: 'User already exists' });
    }
    //validating email format 
    if(!validator.isEmail(email)){
      return res.json({success:false ,message: 'Please Enter a Valid Email' });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationToken= Math.floor(100000 + Math.random() * 900000).toString();

    //new user to store
    const newUser = new userModel({
      name:name,
      email:email,
      password:hashedPassword,
      verificationToken:verificationToken
    })
    // Save user to database
    const user = await newUser.save();

    // Create JWT token
    const token = createToken(user._id)
    res.json({success: true, token});
    console.log("User Registered Successfully");
    console.log(user);
  }
  catch (error) {
    console.log(error);
    res.json({success: false, message: "Error" })
  }
};

export { loginUser, registerUser };