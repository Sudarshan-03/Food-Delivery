// User controller for handling user-related operations
import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Login user 
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User Does'nt Exist ." })
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });

    }
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

// Login admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User Does'nt Exist ." })
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });

    }
    if (user.role !== 'admin') {
      return res.json({ success: false, message: "Not an Admin" });
    }
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}


// Register new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: 'User already exists' });
    }
    //validating email format 
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Please Enter a Valid Email' });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const isFirstUser = (await userModel.countDocuments({})) === 0;

    //new user to store
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
      verificationToken: verificationToken,
      role: isFirstUser ? 'admin' : 'user'
    })
    // Save user to database
    const user = await newUser.save();

    // Create JWT token
    const token = createToken(user._id)
    res.json({ success: true, token });
    console.log("User Registered Successfully");
    console.log(user);
  }
  catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
};

export { loginUser, registerUser, loginAdmin, updateProfile, getProfile };
// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { userId, name, address, age, phone } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (name) user.name = name;
    if (address !== undefined) user.address = address;
    if (age !== undefined) user.age = age;
    if (phone !== undefined) user.phone = phone;

    await user.save();

    const updatedUser = {
      name: user.name,
      email: user.email,
      address: user.address,
      age: user.age,
      phone: user.phone,
      role: user.role
    };

    res.json({ success: true, message: "Profile Updated", user: updatedUser });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating profile" });
  }
}

// get user profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({
      success: true, user: {
        name: user.name,
        email: user.email,
        address: user.address,
        age: user.age,
        phone: user.phone,
        role: user.role,
        _id: user._id
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching profile" });
  }
}
