import { model, Schema } from "mongoose";

const PositionSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Position name is required"],
      minlength: [2, "Position name must be at least 2 characters"],
      maxlength: [255, "Position name must be less than 255 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [2000, "Description must be less than 2000 characters"],
    },
    skills: [
      {
        type: String,
        required: true,
      },
    ],
    contractType: {
      type: [String],
      enum: {
        values: ["CDI", "CDD", "Freelance", "Stage", "Alternance"],
        message: '{VALUE} is not a valid contract type. Valid types are: CDI, CDD, Freelance, Internship,'
      },
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    organization: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Position = model("Position", PositionSchema);
export default Position;
