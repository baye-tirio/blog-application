import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
  },
  { timestamps: true }
);
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
