import bcrypt from "bcryptjs";
import User from "../models/User.js";


const createAdmin = async()=>{

  try{

    const adminExists = await User.findOne({
      role:"admin"
    });


    if(adminExists){
      console.log("Admin already exists");
      return;
    }


    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );


    const admin = await User.create({

      name:"Admin",

      email:process.env.ADMIN_EMAIL,

      password:hashedPassword,

      role:"admin"

    });


    console.log(
      "Admin created:",
      admin.email
    );


  }catch(error){

    console.log(
      "Admin seeding failed",
      error.message
    );

  }

};


export default createAdmin;