import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    role: { type: String, default: 'user' },
    address: { type: String, default: "" },
    age: { type: Number, default: null },
    phone: { type: String, default: "" },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    forgetPasswordToken: { type: String },
    tokenExpiryTime: { type: Date },


}, { minimize: false }, { timestamps: true });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;