import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      minlength: 1,
      maxlength: 100,
      required: true,
    },
    content: {
      type: String,
      minlength: 1,
      required: true,
    },
  },
  { timestamps: true }
);
if (mongoose.models.Post) delete mongoose.models.Post;
const Post = mongoose.model("Post", postSchema);
export default Post;
