const express = require("express");
const router = express.Router();
const Connection = require("../models/connectionData");
const User = require("../models/userData");

router.route("/connection").get(async (req, res) => {
  try {
    const user_id = req.query.param1.slice(2, -1);
    const other_id = req.query.param2.slice(2, -1);

    console.log(user_id);
    console.log(other_id);

    const user = await Connection.findOne({ user: user_id });
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(user);
    const otherExist = user.friendIds.some(
      (friend) => friend.friendId.toString() === other_id
    );
    if (!otherExist) {
      return res.status(404).json({ error: "Other not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve connection" });
  }
});

router.route("/connectionSend").put(async (req, res) => {
  console.log(req.body);
  try {
    const { user_id, friend_id, status } = req.body;

    const user = await User.findOne({ _id: user_id });
    // const user = await Connection.findOne({ user: user_id });
    // if (!user) {
    //   return res.status(404).json({ error: "User not found" });
    // }
    // const friendExist = user.friendIds.some(
    //   (friend) => friend.friendId.toString() === friend_id
    // );
    // if (!friendExist) {
    //   user.friendIds.push({ friendId: friend_id, status });
    // } else {
    //   const index = user.friendIds.findIndex(
    //     (friend) => friend.friendId.toString() === friend_id
    //   );
    //   if (index > -1) {
    //     user.friendIds.splice(index, 1); // Remove object from the array at the found index
    //   }
    // }
    //const updateUser = await user.save();

    const friendUser = await Connection.findOne({ user: friend_id });
    if (!friendUser) {
      return res.status(404).json({ error: "Friend not found" });
    }
    const userExist = friendUser.friendIds.some(
      (friend) => friend.friendId.toString() === user_id
    );
    if (!userExist) {
      friendUser.friendIds.push({
        friendId: user_id,
        status,
        username: user.username,
      });
    } else {
      const index = friendUser.friendIds.findIndex(
        (friend) => friend.friendId.toString() === user_id
      );
      if (index > -1) {
        friendUser.friendIds.splice(index, 1); // Remove object from the array at the found index
      }
    }
    const updateFriendUser = await friendUser.save();

    res.status(200).json({ updateFriendUser });
  } catch (error) {
    res.status(500).json({ error: "Failed to create connection" });
  }
});

module.exports = router;
