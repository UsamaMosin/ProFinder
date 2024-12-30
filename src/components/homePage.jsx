import React, { useState, useEffect } from "react";
import NavBar from "./navBar";
import Sidebar from "./sideBar";
import { useLocation, history } from "react-router-dom";
import CreatePost from "./createPost";
import "../homePage.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import RightSideBar from "./rightSideBar";
const HomePage = (props) => {
  const [userId, setUserId] = useState(null);
  const [pro_pub_id, setPro_pub_id] = useState("");
  const [cov_pub_id, setCov_pub_id] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    const waitingFuntion = async () => {
      const storedUserId = sessionStorage.getItem("userId");
      await setUserId(storedUserId);
      console.log(storedUserId);
    };
    waitingFuntion();
  }, [sessionStorage.getItem("userId")]);
  const history = useHistory();
  // Using location state
  const location = useLocation();
  const nameFromState = location.state && location.state.name;

  // Using props
  const nameFromProps = props.name;

  // Setting the name variable
  const name = nameFromState || nameFromProps;
  useEffect(() => {
    if (sessionStorage.getItem("userId") == null) history.push("/login");
  }, []);
  let data = [];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/profile/${userId}`,
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
        data = await response.json();
        setPro_pub_id(data.profile_public_id);
        setCov_pub_id(data.cover_public_id);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (userId) {
      fetchData();
    }
  }, [userId]);
  let userData = [];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/login/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Request failed");
        }
        userData = await response.json();
        console.log(userData);
        setUsername(userData.username);
      } catch (error) {
        console.error(error);
      }
    };
    if (userId) {
      fetchData();
    }
  }, [userId]);
  return (
    <div>
      <NavBar name={username} pro_public_id={pro_pub_id} />
      <div className="containerr">
        <Sidebar
          name={username}
          pro_public_id={pro_pub_id}
          cov_public_id={cov_pub_id}
        />
        <CreatePost pro_public_id={pro_pub_id} name={username} />
        <RightSideBar pro_public_id={pro_pub_id} />
      </div>
    </div>
  );
};
export default HomePage;
