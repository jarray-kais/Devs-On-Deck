import { model, Schema } from "mongoose";

const ApplicationSchema = new Schema(
  {
    position: {
      type: Schema.Types.ObjectId,
      ref: "Position",
      required: true,
    },
    developer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cv: {
      type: String, 
      required: true,
    },
    coverLetter: {
      type: String, 
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
);

const Application = model("Application", ApplicationSchema);
export default Application; 