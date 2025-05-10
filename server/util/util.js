import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()




export const generateToken=(user)=>{
    const payload= {
        id : user._id
    }
    return   jwt.sign(payload , process.env.SECRET_KEY, {expiresIn: '1h'})
}   
export const isAuth = (req , res, next)=>{
  
    const token = req.cookies.token;
   
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
      jwt.verify(
        token,
        process.env.SECRET_KEY,
        (err, decode) => {
          if (err) {
            res.status(401).send({ message: 'Invalid Token' });
          } else {
            req.user = decode;
            next();
          }
        }
      );
  };