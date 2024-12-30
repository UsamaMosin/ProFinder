import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../sideBar.css";
import { CloudinaryContext, Image } from "cloudinary-react";
import userMain from "../img/usermain.jpg";
import coverPic from "../img/cover-pic.jpeg";
import recent from "../img/recent.png";
import group from "../img/group.png";

function Sidebar(props) {
  console.log(props);
  const getUserID = sessionStorage.getItem("userId");
  const [friends, setFriends] = useState(null);

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
      const connectedFriendsLength = data.friendIds.reduce((count, friend) => {
        if (friend.status === "connected") {
          return count + 1;
        } else {
          return count;
        }
      }, 0);
      setFriends(connectedFriendsLength);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getFriends();
  }, []);
  return (
    <div className="" style={{ width: "25%", margin: "15px" }}>
      <div className="left-sidebar">
        <div className="sidebar-profile-box">
          <CloudinaryContext cloudName="dkjrsdvof">
            <div>
              <Image
                publicId={props.cov_public_id}
                width="400px"
                height="50px"
              />
            </div>
          </CloudinaryContext>
          <div className="sidebar-profile-info">
            <Link
              to={{
                pathname: "/userProfile",
                state: { name: props.name },
              }}
            >
              <CloudinaryContext cloudName="dkjrsdvof">
                <div>
                  <Image publicId={props.pro_public_id} />
                </div>
              </CloudinaryContext>
            </Link>
            <Link
              to={{
                pathname: "/userProfile",
                state: { name: props.name },
              }}
            >
              <h1>{props.name}</h1>
            </Link>
            <h3>MERN DEVELOPER</h3>
            <ul>
              <li>
                <Link
                  to={{
                    pathname: "/connections",
                  }}
                >
                  Connections <span>{friends}</span>
                </Link>
              </li>
              <li>
                Followers <span>1</span>
              </li>
              <li>
                Liked Pages <span>0</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="sidebar-activity" id="sidebarActivity">
          <h3>RECENT</h3>
          <a href="#">
            <img src={recent} />
            Web Development
          </a>
          <a href="#">
            <img src={recent} />
            User Interface
          </a>
          <a href="#">
            <img src={recent} />
            Group Learning
          </a>
          <a href="#">
            <img src={recent} />
            Code Better
          </a>
          <a href="#">
            <img src={recent} />
            freecodebox
          </a>
          <a href="#">
            <img src={recent} />
            Online Learning
          </a>
          <h3>GROUPS</h3>
          <a href="#">
            <img src={group} />
            Web Designing League
          </a>
          <a href="#">
            <img src={group} />
            HTML &amp; CSS Group
          </a>
          <a href="#">
            <img src={group} />
            Javascript Legends
          </a>
          <a href="#">
            <img src={group} />
            Mrinfobaba
          </a>
          <div className="discover-more-link">
            <a href="">Discover More</a>
          </div>
        </div>
        <p id="showMoreLink" onclick="toggleActivity()">
          Show More <b>+</b>
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
