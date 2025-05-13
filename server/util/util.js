import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

export const generateToken = (user) => {
  if (!user || !user._id || !user.email) {
    throw new Error('Invalid user data for token generation');
  }

  if (!process.env.SECRET_KEY) {
    throw new Error('Invalid or insecure SECRET_KEY');
  }

  const payload = {
    id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    image: user.image,
    isDeveloper: user.isDeveloper,
    isOrganized: false,
    iat: Date.now(),
    jti: crypto.randomBytes(16).toString('hex') 
  };

  const options = {
    expiresIn: "1h",
    algorithm: "HS256", 
    audience: process.env.JWT_AUDIENCE,
  };

  try {
    return jwt.sign(payload, process.env.SECRET_KEY, options);
  } catch (error) {
    throw new Error('Error generating token');
  }
};

export const generateOrganizationToken = (organization) => {
  if (!organization || !organization._id || !organization.email) {
    throw new Error('Invalid organization data for token generation');
  }

  if (!process.env.SECRET_KEY) {
    throw new Error('Invalid or insecure SECRET_KEY');
  }

  const payload = {
    id: organization._id,
    email: organization.email,
    name: organization.name,
    logo: organization.logo,
    isOrganized: true,
    isDeveloper: false,
    iat: Date.now(),
    jti: crypto.randomBytes(16).toString('hex')
  };

  const options = {
    expiresIn: "1h", 
    algorithm: "HS256",
    audience: process.env.JWT_AUDIENCE,
  };

  try {
    return jwt.sign(payload, process.env.SECRET_KEY, options);
  } catch (error) {
    throw new Error('Error generating organization token');
  }
};

export const isAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    jwt.verify(token, process.env.SECRET_KEY, { algorithms: ['HS256'] }, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid Token" });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Error verifying authentication" });
  }
};

export const isDeveloper = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!req.user.isDeveloper) {
      return res.status(403).json({ message: "Not authorized as developer" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Error verifying developer status" });
  }
};

export const isOrganized = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!req.user.isOrganized) {
      return res.status(403).json({ message: "Not authorized as organization" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Error verifying organization status" });
  }
};

export const isDeveloperOrOrganized = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!req.user.isDeveloper && !req.user.isOrganized) {
      return res.status(403).json({ message: "Not authorized as developer or organization" });
    }

    next();
  } catch (error) { 
    return res.status(500).json({ message: "Error verifying developer or organization status" });
  }
};

