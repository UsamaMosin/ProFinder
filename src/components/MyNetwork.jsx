import React, { useEffect } from "react";
import { useState } from "react";
import "../MyNetwork.css";

import NavBar from "./navBar";

const MyNetwork = (props) => {
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
  // const users = [
  //   { id: 1, name: "John Doe" },
  //   { id: 2, name: "Jane Smith" },
  //   { id: 3, name: "Bob Johnson" },
  // ];

  const handleAccept = async (friendId) => {
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

  const handleReject = async (friendId) => {
    // Logic to reject the connection request
    try {
      const res = await fetch(`http://localhost:3001/connectionSend`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: getUserID,
          friend_id: friendId,
          status: "rejected",
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
        <h1>My Network</h1>
        {friendsData &&
          friendsData.map((d) => (
            <React.Fragment key={d.friendId}>
              {d.status === "pending" && d.sendRequest === false ? (
                <div className="user-container">
                  <div className="user-details">
                    <span className="user-name">{d.username}</span>
                    <span className="user-connection">
                      1st degree connection
                    </span>
                  </div>
                  <div className="action-buttons">
                    <button
                      className="action-button accept"
                      onClick={() => handleAccept(d.friendId)}
                    >
                      Accept
                    </button>
                    <button
                      className="action-button reject"
                      onClick={() => handleReject(d.friendId)}
                    >
                      Reject
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
export default MyNetwork;
