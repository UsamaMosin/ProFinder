const express = require("express");
const router = express.Router();
const path = require("path");
const Post = require("../models/postData");
// POST /api/posts - Create a new post
router.post("/post", async (req, res) => {
  try {
    const { caption, public_id, user } = req.body;
    // Save the post data to the database
    const post = new Post({
      user,
      postArr: [
        {
          caption,
          public_id,
        },
      ],
    });
    const savedPost = await post.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a new post" });
  }
});

router.route("/post/:userId").get(async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.findOne({ user: userId });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve post" });
  }
});

router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find({}, "postArr");
    const postArr = posts.map((post) => post.postArr).flat();
    res.status(200).json(postArr);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve posts" });
  }
});

router.put("/post/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { caption, public_id } = req.body;

    // Find the post by the user ID
    const post = await Post.findOne({ user: userId });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    /// Create a new post object to be added to postArr
    const newPost = {};

    if (caption) {
      newPost.caption = caption;
    }

    if (public_id) {
      newPost.public_id = public_id;
    }

    // Add the new post object to postArr
    post.postArr.push(newPost);

    // Save the updated post
    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update post" });
  }
});
router.route("/checkPost").post(async (req, res) => {
  try {
    const { user } = req.body; // Get the user ID from the request body
    // Check if a profile exists for the given user ID
    const profileExists = await Post.findOne({ user });
    if (profileExists) {
      res.status(200).json(true);
    } else {
      res.status(200).json(false);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to check profile existence" });
  }
});
module.exports = router;
