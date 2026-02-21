import userModel from "../models/userModel.js";
import validator from "validator";
import { comparePassword, bcryptPassword } from "../util/bcrypt.js";
import { createToken } from "../middleware/adminAuth.js";

// -------- Route for user Login
const loginUser = async (req, res) => {
 try {
    const { email, password } = req.body;

    // ---- find User
    const user = await userModel.findOne({ email });

    if (!user) {
      res.json({ success: false, message: "User doesn't exists" });
    }

    // ----------------- compare password

    const isMatch = await comparePassword(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, message: "Login success", token });
    } else {
      res.json({ success: false, message: "Invalid creadentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// -------- Route for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //--------------------- checking user already exist or not
    const exist = await userModel.findOne({ email });
    if (exist) {
      res.json({ success: false, message: "User Already Exists" });
    }
    //---------------------  validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a  valid email",
      });
    }
    //---------------------  for strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }
    //---------------------  for newUser
    const user = await userModel.create({
      name,
      email,
      password: await bcryptPassword(password),
    });

    //--------------------- Create-Token
    const token = createToken(user._id);

    res.json({ success: true, message: "Register success", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// -------- Route for user admin
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = createToken(
        process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD,
      );
      res.status(200).json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin };
