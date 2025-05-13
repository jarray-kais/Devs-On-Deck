import Organization from "../models/Organization.model.js";
import { generateOrganizationToken } from "../util/util.js";
import bcrypt from "bcryptjs";
import fs from "fs";
import { uploadImage } from "../middleware/upload.js";

const OrganizationController = {
  createOrganization: async (req, res, next) => {
    try {
      const cleanLocation = {
        address: Array.isArray(req.body.address)
          ? req.body.address[0]
          : req.body.address,
        city: Array.isArray(req.body.city) ? req.body.city[0] : req.body.city,
        state: Array.isArray(req.body.state)
          ? req.body.state[0]
          : req.body.state,
        country: req.body.country,
        zipCode: req.body.zipCode,
      };

      const org = {
        ...req.body,
        foundedYear: parseInt(req.body.foundedYear),
        location: cleanLocation,
      };

      const logo = req.file ? req.file.path : null;
      const existOrganization = await Organization.findOne({
        email: org.email,
      });
      if (existOrganization) {
        if (logo) {
          fs.unlinkSync(logo);
        }
        return res.status(400).json({ message: "Organization already exists" });
      }
      let logoUrl = null;
      if (logo) {
        logoUrl = await uploadImage(logo);
        fs.unlinkSync(logo);
      }
      const organization = await Organization.create({
        ...org,
        logo: logoUrl,
        isOrganization: true,
      });
      res
        .status(201)
        .json({ message: "Organization created successfully", organization });
    } catch (error) {
      next(error);
    }
  },
  loginOrganization: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const organization = await Organization.findOne({ email });
      if (!organization) {
        return res.status(400).json({ message: "Organization not found" });
      }
      const isPasswordValid = await bcrypt.compare(
        password,
        organization.password
      );
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
      }
      const token = generateOrganizationToken(organization);
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res
        .status(200)
        .json({ message: "Organization logged in successfully", organization });
    } catch (error) {
      next(error);
    }
  },
};

export default OrganizationController;
