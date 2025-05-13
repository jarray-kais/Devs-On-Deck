import bcrypt from "bcryptjs";
import { model, Schema } from "mongoose";

const OrganizationSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Organization name is required"],
      minlength: [2, "Organization name must be at least 2 characters"],
      maxlength: [255, "Organization name must be less than 255 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
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
      address: {
        type: String,
        required: [true, "Address is required"],
      },
      city: {
        type: String,
        required: [true, "City is required"],
      },
      state: {
        type: String,
        required: [true, "State is required"],
      },
      country: String,
      zipCode: String,
    },
    isOrganization: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

OrganizationSchema.virtual("confirmPassword")
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value) {
    this._confirmPassword = value;
  });

  OrganizationSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Password must match confirm password");
  }
  next();

});

OrganizationSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
      .then(hash => {
        this.password = hash;
        next();
      });
  });


const Organization = model("Organization", OrganizationSchema);
export default Organization; 