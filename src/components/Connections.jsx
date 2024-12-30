import React from "react";
import { useState, useEffect } from "react";
import "../connections.css";
import NavBar from "./navBar";

const Connections = () => {
  const getUserID = sessionStorage.getItem("userId");
  const [friendsData, setFriendsData] = useState(null);

  const getFriends = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/getFriends/${getUserID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      setFriendsData(data.friendIds);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getFriends();
  }, []);

  const handleMessage = async (friendId) => {
    // Logic to accept the connection request
    try {
      const res = await fetch(`http://localhost:3001/connectionSend`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: getUserID,
          friend_id: friendId,
          status: "connected",
        }),
      });
      if (res.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const userData = null;
  return (
    <div>
      <NavBar
        name={userData && userData.username}
        pro_public_id={userData && userData.profile_public_id}
      />
      <div className="network-container">
        <h1>My Connections</h1>
        {friendsData &&
          friendsData.map((d) => (
            <React.Fragment key={d.friendId}>
              {d.status === "connected" ? (
                <div className="user-container">
                  <div className="user-details">
                    <span className="user-name">{d.username}</span>
                    <span className="user-connection">
                      1st degree connection
                    </span>
                  </div>
                  <div className="action-buttonss">
                    <button
                      className="action-buttons acceptt"
                      //onClick={() => handleMessage(d.friendId)}
                    >
                      Messsage
                    </button>
                  </div>
                </div>
              ) : null}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};
export default Connections;
