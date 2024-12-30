import React, { useEffect, useState } from "react";
import Profile from "./profile";
import About from "./About";
import NavBar from "./navBar";
import Experience from "./Experiences";
import Education from "./Education";
import Skills from "./skills";
import Language from "./languages";
import RightSideBar from "./rightSideBar";
import CreateOwnPost from "./createOwnPost";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const userProfile = () => {
  const history = useHistory();
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);
  useEffect(() => {
    if (sessionStorage.getItem("userId") == null) history.push("/login");
  }, []);
  console.log(userId);
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
        const data = await response.json();
        console.log(data);
        setUserData(data);
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
      <NavBar
        name={userData && userData.username}
        pro_public_id={userData && userData.profile_public_id}
      />
      <div className="containerr">
        <Profile
          name={userData && userData.username}
          bio={userData && userData.bio}
          country={userData && userData.address && userData.address.country}
          city={userData && userData.address && userData.address.city}
        />
        <RightSideBar pro_public_id={userData && userData.profile_public_id} />
        <About about={userData && userData.about} />
        <Education education={userData && userData.education} />
        <Experience experience={userData && userData.experience} />
        <Skills skills={userData && userData.skills} />
        <Language languages={userData && userData.language} />
        <CreateOwnPost
          pro_public_id={userData && userData.profile_public_id}
          name={userData && userData.username}
        />
      </div>
    </div>
  );
};

export default userProfile;
