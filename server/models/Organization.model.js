import { model, Schema } from "mongoose";

const OrganizationSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Organization name is required"],
      minlength: [2, "Organization name must be at least 2 characters"],
      maxlength: [255, "Organization name must be less than 255 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [1000, "Description must be less than 1000 characters"],
    },
    website: {
      type: String,
      validate: {
        validator: (val) => /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(val),
        message: "Please enter a valid website URL",
      },
    },
    industry: {
      type: String,
      required: [true, "Industry is required"],
    },
    size: {
      type: String,
      enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'],
      required: [true, "Company size is required"],
    },
    foundedYear: {
      type: Number,
      min: [1900, "Founded year must be after 1900"],
      max: [new Date().getFullYear(), "Founded year cannot be in the future"],
    },
    logo: {
      type: String,
      required: [true, "Logo is required"],
    },
    location: {
      address: String,
      city: String,
      state: String,
      country: String,
      zipCode: String,
    },
    socialMedia: {
      linkedin: String,
      twitter: String,
      facebook: String,
    }
  },
  { timestamps: true }
);

const Organization = model("Organization", OrganizationSchema);
export default Organization; 