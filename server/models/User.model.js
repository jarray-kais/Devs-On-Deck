import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minlength: [2, "First name must be at least 2 characters"],
      maxlength: [20, "First name must be at less than 20 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [2, "Last name must be at least 2 characters"],
      maxlength: [20, "Last name must be at less than 20 characters"],
    },
    email: {
      type: String,
      unique: true,
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
    address : {
      type: String,
      required: [true, "Adress is required"],
      minlength: [10, "Adress must be at least 10 characters"],
      maxlength: [255, "Adress must be at less than 255 characters"],
    },
    city : {
        type: String,
      required: [true, "city is required"],
      minlength: [2, "city must be at least 2 characters"],
      maxlength: [255, "city must be at less than 255 characters"],
    },
    state :{
      type: String,
      required: [true, "state is required"],
      minlength: [2, "state must be at least 2 characters"],
      maxlength: [255, "state must be at less than 255 characters"],
    },
    image : {
      type: String,
      required: [true, "image is required"],
    },
    isDeveloper : {
      type: Boolean,
      default: true,
    },
    skills: {
      type: [String],
      required: function() { return this.isDeveloper === true; },
      validate: [arrayLimit, 'You can only select a maximum of 5 skills.']
    },
    bio: {
      type: String,
      maxlength: [500, "Bio must be less than 500 characters"],
      required: function() { return this.isDeveloper === true; }
    },
  },
  { timestamps: true }
);

UserSchema.virtual("confirmPassword")
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value) {
    this._confirmPassword = value;
  });

UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Password must match confirm password");
  }
  next();

});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
      .then(hash => {
        this.password = hash;
        next();
      });
  });

function arrayLimit(val) {
  return val.length <= 5;
}

const User = model("User", UserSchema);
export default User;