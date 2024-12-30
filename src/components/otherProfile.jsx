import React from "react";
import "../profile.css";
import NavBar from "./navBar";
import user2 from "../img/user-2.png";
import connect from "../img/connect.png";
// import connected from "../img/connected.png";
import pending from "../img/pendingIcon.png";
import companyLogo from "../img/north.png";
import chat from "../img/chat.png";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { CloudinaryContext, Image } from "cloudinary-react";
const OtherProfile = (props) => {
  const location = useLocation();
  const { id } = location.state;
  const [userId, setUserId] = useState(null);
  const [ownId, setOwnId] = useState(null);
  const [connApiData, setConnApiData] = useState(null);
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [bio, setBio] = useState("");
  const [pro_pub_id, setPro_pub_id] = useState("");
  const [cov_pub_id, setCov_pub_id] = useState("");
  const [locations, setLocations] = useState({
    country: "",
    city: "",
  });

  const [aboutText, setAboutText] = useState("");
  const [showMore, setShowMore] = useState(false);

  const [educations, setEducations] = useState([]);

  const [experiences, setExperiences] = useState([]);

  const [skills, setSkills] = useState([]);

  const [languages, setLanguages] = useState([]);
  console.log(id);
  useEffect(() => {
    const waitingFuntion = async () => {
      const storedUserId = sessionStorage.getItem("userId");
      await setOwnId(storedUserId);
      console.log(storedUserId);
    };
    waitingFuntion();
  }, [sessionStorage.getItem("userId")]);
  useEffect(() => {
    setUserId(id);
  }, [id]);

  const fetchData = async () => {
    if (userId && ownId) {
      try {
        const response = await fetch(
          `http://localhost:3001/connection?param1=${ownId}&param2=${userId}`,
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
        setConnApiData(data);

        // Process the received data here
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, [ownId, userId]);
  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
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
          setBio(data.bio);
          setCov_pub_id(data.cover_public_id);
          setPro_pub_id(data.profile_public_id);
          setAboutText(data.about || []);
          setEducations(data.education);
          setExperiences(data.experience);
          setSkills(data.skills);
          setLanguages(data.language);
          setLocations({
            country: data.address.city,
            city: data.address.country,
          });
        } catch (error) {
          console.error(error);
        }
      }
    };
    if (userId) {
      fetchData();
    }
  }, [userId]);
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
        const data = await response.json();
        setUsername(data.username);
      } catch (error) {
        console.error(error);
      }
    };
    if (userId) {
      fetchData();
    }
  }, [userId]);
  const toggleShowMore = () => {
    setShowMore((prevState) => !prevState);
  };
  const MAX_LENGTH = 320;
  let shortText = "";
  let longText = "";
  if (aboutText.length > 0) {
    shortText = aboutText.substring(0, MAX_LENGTH);
    longText = aboutText;
  }
  const shouldShowMoreLink = aboutText.length > MAX_LENGTH;
  function Skill({ name, description }) {
    return (
      <div className="skill-item">
        <h4>{name}</h4>
        <p>{description}</p>
      </div>
    );
  }
  const handleConnectClick = async (userId, friendId) => {
    try {
      const res = await fetch(`http://localhost:3001/connectionSend`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          friend_id: friendId,
          status: "pending",
        }),
      });
      if (res.ok) {
        fetchData();
        //window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="containerr">
        {/* Profile */}
        <div className="profile-main">
          <div className="profile-container">
            <div className="cover-photo-wrapper">
              <CloudinaryContext cloudName="dkjrsdvof">
                <CloudinaryContext cloudName="dkjrsdvof">
                  <div
                    className="cover-photo"
                    style={{
                      backgroundImage: `url(https://res.cloudinary.com/dkjrsdvof/image/upload/${cov_pub_id})`,
                    }}
                  ></div>
                </CloudinaryContext>
              </CloudinaryContext>
            </div>
            <div className="profile-container-inner">
              <div className="profile-picture-wrapper">
                <CloudinaryContext cloudName="dkjrsdvof">
                  <div>
                    <Image
                      className="profile-pic"
                      publicId={pro_pub_id}
                      width="550px"
                      height="250px"
                    />
                  </div>
                </CloudinaryContext>
              </div>
              <h1>{username}</h1>
              <b>{bio}</b>
              <p>
                {locations.city}, {locations.country} &middot;{" "}
              </p>
              <div className="mutual-connection">
                <img src={user2} alt="User" />
                <span>0 Mutual Friends</span>
              </div>
              <div className="profile-btn">
                {connApiData && connApiData.user !== userId && (
                  <React.Fragment>
                    {connApiData.friendIds &&
                    connApiData.friendIds.length > 0 ? (
                      connApiData.friendIds.some(
                        (d) => d.friendId === userId
                      ) ? (
                        <button id="primary-btn" disabled>
                          {connApiData.friendIds.find(
                            (d) => d.friendId === userId
                          ).status === "pending" ? (
                            <img
                              src={pending}
                              alt="Pending"
                              style={{ filter: "brightness(0) invert(1)" }}
                            />
                          ) : (
                            <img
                              src={pending}
                              alt="Connected"
                              style={{ filter: "brightness(0) invert(1)" }}
                            />
                          )}
                          {connApiData.friendIds.find(
                            (d) => d.friendId === userId
                          ).status === "pending"
                            ? "Pending"
                            : "Connected"}
                        </button>
                      ) : (
                        <button
                          id="primary-btn"
                          onClick={() =>
                            handleConnectClick(connApiData.user, userId)
                          }
                        >
                          <img src={connect} alt="Connect" /> Connect
                        </button>
                      )
                    ) : (
                      <button
                        id="primary-btn"
                        onClick={() =>
                          handleConnectClick(connApiData.user, userId)
                        }
                      >
                        <img src={connect} alt="Connect" /> Connect
                      </button>
                    )}
                  </React.Fragment>
                )}

                <a href="#">
                  <img src={chat} alt="Chat" /> Message
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="profile-description">
          <div className="about">
            <h2>About</h2>
            {showMore ? (
              <div>
                <p id="about">{longText}</p>
                <div className="see-more-link-wrapper">
                  <button
                    className="see-more-link button-solid"
                    onClick={toggleShowMore}
                  >
                    See Less...
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p id="about">{shortText}</p>
                {shouldShowMoreLink && (
                  <div className="see-more-link-wrapper">
                    <button
                      className="see-more-link button-solid"
                      onClick={toggleShowMore}
                    >
                      See More...
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Education  */}
          <h3>Education</h3>
          {educations.map((education, index) => (
            <div key={index} className="profile-desc-row">
              <img src={companyLogo} alt="Google Logo" />
              <div>
                <h3>{education.schoolName}</h3>
                <b>
                  {education.degree} &middot; {education.field}
                </b>
                <b>
                  {education.startDate.month} {education.startDate.year} -{" "}
                  {education.endDate.month} {education.endDate.year} &middot;
                </b>
                <p>{education.description}</p>
                <hr />
              </div>
            </div>
          ))}

          {/* Experience */}
          <h3>Experience</h3>
          {experiences.map((experience, index) => (
            <div className="profile-desc-row" key={index}>
              <img src={companyLogo} alt="Google Logo" />
              <div>
                <h3>{experience.position}</h3>
                <b>
                  {experience.companyName} &middot; {experience.extraComment}
                </b>
                <b>
                  {experience.startDate.month} {experience.startDate.year} -{" "}
                  {experience.endDate.month} {experience.endDate.year} &middot;
                </b>
                <p>{experience.description}</p>
                <hr />
              </div>
            </div>
          ))}

          {/* Skills */}
          <h3>Skills</h3>
          <div className="profile-desc-row">
            <div className="skills">
              {skills.map((skill, index) => (
                <Skill
                  key={index}
                  name={skill.name}
                  description={skill.description}
                />
              ))}
            </div>
          </div>

          {/* Languages */}
          <h3>Languages</h3>
          <div className="language-buttons">
            {languages.map((lang, index) => (
              <button className="btn btn-small language-btn" key={index}>
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default OtherProfile;
