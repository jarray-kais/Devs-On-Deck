import bcrypt from "bcryptjs";
import { uploadImage } from "../middleware/upload.js";
import User from "../models/User.model.js";
import { generateToken } from "../util/util.js";
import fs from "fs";

const UserControler = {
  registerDeveloper: async (req, res, next) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        address,
        city,
        state,
        skills,
        bio,
      } = req.body;
      const image = req.file ? req.file.path : null;
      const existuser = await User.findOne({ email: req.body.email });
      if (existuser) {
        if (image) {
          fs.unlinkSync(image);
        }
        return res.status(400).json({ message: "User already exists" });
      }
      let imageUrl = null;
      if (image) {
       imageUrl = await uploadImage(image);
       fs.unlinkSync(image);
      }
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        address,
        city,
        state,
        skills,
        bio,
        image: imageUrl,
        isDeveloper: true,
      })
      res.status(201).json({ msg: "success registered!", user: user });
    } catch (err) {
      next(err);
    }
  },

  loginDeveloper: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
      }
      const token = generateToken(user);
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ msg: "success login!", user: user });
    } catch (error) {
      next(error);
    }
  },
  logoutDeveloper: async (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({ msg: "success logout!" });
  }
};


export default UserControler;
