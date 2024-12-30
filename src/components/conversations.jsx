import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import "../conversations.css";
import noAvatar from "../img/noAvatar.png";
import { CloudinaryContext, Image } from "cloudinary-react";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser);
    const getUser = async () => {
      try {
        const res = await axios("/profile/" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <div className="conversation">
      <div>
        {user && user.profile_public_id ? (
          <CloudinaryContext cloudName="dkjrsdvof">
            <div>
              <Image
                publicId={user.profile_public_id}
                className="conversationImg"
                alt=""
              />
            </div>
          </CloudinaryContext>
        ) : (
          <img className="conversationImg" src={noAvatar} alt="" />
        )}
      </div>
      <span className="conversationName">{user && user.username}</span>
    </div>
  );
}
