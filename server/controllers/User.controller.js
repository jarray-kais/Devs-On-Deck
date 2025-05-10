import User from "../models/User.model.js";
import { generateToken } from "../util/util.js";




const UserControler = {
    register: async (req, res, next) => {
      try {
        const existuser = await User.findOne({ email: req.body.email });
        if (existuser) {
          return res.status(400).json({ message: "User already exists" });
        }
        const user = await User.create(req.body);
        res
          .cookie("token", generateToken(user), {
            httpOnly: true,
          })
          .json({ msg: "success registered!", user: user });
      } catch (err) {
        next(err);
      }
    },

}