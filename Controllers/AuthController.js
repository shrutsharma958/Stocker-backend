const User = require("../models/UserModel.js");
const { createSecretToken } = require("../util/Secrettoken.js");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

   

    // Create new user with hashed password
    const user = await User.create({
      email,
      password,
      username,
      createdAt,
    });

    // Generate JWT token
    const token = createSecretToken(user._id);

    // Set token in cookie
   res
  .cookie("token", token, {
    httpOnly: true,
    secure: true,           // ✅ required for HTTPS
    sameSite: "None",       // ✅ required for cross-origin cookies
  })
  .json({ success: true, message: "Login successful", user: user.username });

    // Send success response
    res
      .status(201)
      .json({ message: "User signed up successfully", success: true,   user: user.username  });
     

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password  } = req.body;
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect password or email' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:'Incorrect password or email' }) 
    }
     const token = createSecretToken(user._id);
     res.cookie("token", token, {
       withCredentials: true,
       httpOnly: false,
     });
     res.status(201).json({ message: "User logged in successfully", success: true ,  user: user.username });
      console.log("Login response:", user);
     //next()
  } catch (error) {
    console.error(error);
  }
}
