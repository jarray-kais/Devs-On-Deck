import { uploadImage } from "../middleware/upload.js";
import Application from "../models/Application.model.js";
import fs from "fs";

const ApplicationController = {
  createApplication: async (req, res, next) => {
    const { position, organization } = req.body;
    const cv = req.files ? req.files["cv"][0]?.path : null;
    const coverLetter = req.files ? req.files["coverLetter"][0]?.path : null;
    const developer = req.user.id;
    let cvUrl = null;
    let coverLetterUrl = null;

    if (cv) {
      cvUrl = await uploadImage(cv);
       fs.unlinkSync(cv);
    }

    if (coverLetter) {
      coverLetterUrl = await uploadImage(coverLetter);
      fs.unlinkSync(coverLetter);
    }
    try {
      const application = await Application.create({
        position,
        developer,
        organization,
        cv: cvUrl,
        coverLetter: coverLetterUrl,
      });
      res.status(201).json(application);
    } catch (error) {
      next(error);
    }
  },
  getApplications: async (req, res, next) => {
    const applications = await Application.find();
    res.status(200).json(applications);
  },
  getApplicationById: async (req, res, next) => {
    const application = await Application.findById(req.params.id);
    res.status(200).json(application);
  },
};

export default ApplicationController;
