const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      autopopulate: true,
    },
    postArr: [
      {
        caption: String,
        createdAt: {
          type: Date,
          default: Date.now, // Set the default value to the current time
        },
        public_id: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
