import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { CloudinaryContext, Image } from "cloudinary-react";
import "../chatOnline.css";
import noAvatar from "../img/noAvatar.png";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/getFriendsPic/" + currentId);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId, onlineUsers]);

  //   useEffect(() => {
  //     setOnlineFriends(
  //       friends.friendIds.filter((f) => onlineUsers.includes(f.friendId))
  //     );
  //   }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(`/conversations/find/${currentId}/${user}`);
      if (res.data === null) {
        setCurrentChat([]);
      } else {
        setCurrentChat(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {friends.map((o) =>
        o.status === "connected" ? (
          <div
            className="chatOnlineFriend"
            onClick={() => handleClick(o.friendId)}
          >
            <div className="chatOnlineImgContainer">
              {o.profile_public_id ? (
                <CloudinaryContext cloudName="dkjrsdvof">
                  <div>
                    <Image
                      publicId={o.profile_public_id}
                      className="conversationImg"
                      alt=""
                    />
                  </div>
                </CloudinaryContext>
              ) : (
                <img className="conversationImg" src={noAvatar} alt="" />
              )}
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{o.username}</span>
          </div>
        ) : null
      )}
    </div>
  );
}
