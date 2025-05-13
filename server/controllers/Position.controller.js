import Position from "../models/Position.model.js";

const PositionController = {
  createPosition: async (req, res , next) => {
    const { name, description, skills, contractType, deadline, location } = req.body;

    try {
      const position = await Position.create({ name, description, skills, contractType: contractType.split(',').map((t) => t.trim()), deadline, location,  organization: req.user.id});
      
      res.status(201).json(position);
    } catch (error) {
      next(error);
    }
  },
  getPositionsByOrganization: async (req, res, next) => {

    const { organizationID } = req.user.id;
    try {
      const positions = await Position.find({ organizationID });
      if (!positions) {
        return res.status(404).json({ message: "Positions not found" });
      }
      res.status(200).json(positions);
    } catch (error) {
      next(error);
    }
  },
  getPositionById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const position = await Position.findById(id);
      if (!position) {
        return res.status(404).json({ message: "Position not found" });
      }
      res.status(200).json(position);
    } catch (error) {
      next(error);
    }
  },
  
};

export default PositionController;
