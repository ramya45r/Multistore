import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "shopper",
    });

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user._id, user.role),
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const loginUser = async(req,res)=>{
    try{
        const {email,password}=req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({
                message:"User not found"
            });
        }

        const match = await bcrypt.compare(
            password,
            user.password
        );

        if(!match){
            return res.status(401).json({
                message:"Invalid password"
            });
        }


        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );


        res.cookie("token",token,{
            httpOnly:true,
            secure:false
        });


        res.json({
            message:"Login successful",
            user
        });


    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
}