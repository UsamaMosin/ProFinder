import React, { useState, useEffect } from "react";
import "../profile.css";
import user2 from "../img/user-2.png";
import chat from "../img/chat.png";
import cameraIcon from "../img/camera.png";
import editIcon from "../img/edit.jpg";
import { CloudinaryContext, Image } from "cloudinary-react";
const Profile = (props) => {
  const [userId, setUserId] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [username, setUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(props.name);
  const [bio, setBio] = useState(props.bio);
  const [pro_pub_id, setPro_pub_id] = useState("");
  const [cov_pub_id, setCov_pub_id] = useState("");
  const [location, setLocation] = useState({
    country: props.city,
    city: props.country,
  });
  useEffect(() => {
    const waitingFuntion = async () => {
      const storedUserId = sessionStorage.getItem("userId");
      await setUserId(storedUserId);
      console.log(storedUserId);
    };
    waitingFuntion();
  }, [sessionStorage.getItem("userId")]);
  useEffect(
    () => {
      setBio(props.bio); // Update bio state when props.bio changes
      setLocation({ country: props.city, city: props.country });
    },
    [props.bio],
    [{ country: props.city, city: props.country }]
  );
  let result = "";
  useEffect(() => {
    const saveProfilePic = async () => {
      if (!profilePicture) {
        return; // Skip the API call if profilePicture is not set
      }
      if (profilePicture) {
        const data = new FormData();
        data.append("file", profilePicture);
        data.append("upload_preset", "images");
        data.append("cloud_name", "dkjrsdvof");
        try {
          const response = await fetch(
            "https://api.cloudinary.com/v1_1/dkjrsdvof/image/upload",
            {
              method: "post",
              body: data,
            }
          );
          result = await response.json();
          if (result) {
            console.log(result.public_id);
          } else {
            // Handle error case
            console.error("Failed to create a post");
          }
          console.log(result);
        } catch (error) {
          console.error(error);
        }
      }
      try {
        const resp = await fetch("http://localhost:3001/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: userId,
          }),
        });
        const resultBool = await resp.json();
        let response = "";
        console.log(result.public_id);
        if (resultBool) {
          response = await fetch(`http://localhost:3001/profile/${userId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              profile_public_id: result.public_id,
            }),
          });
        } else {
          response = await fetch("http://localhost:3001/profile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: userId,
              profile_public_id: result.public_id,
            }),
          });
        }
        const data = await response.json();
        if (data) {
          console.log(data);
          console.log("Profile Photo Updated");
        } else {
          // Handle error case
          console.error("Failed to updata");
        }
      } catch (error) {
        console.error(error);
      }
      window.location.reload();
    };

    saveProfilePic();
  }, [profilePicture]);
  const handleProfilePictureUpload = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  const handleCoverPhotoUpload = (event) => {
    setCoverPhoto(event.target.files[0]);
  };
  useEffect(
    () => {
      setBio(props.bio); // Update bio state when props.bio changes
      setLocation({ country: props.city, city: props.country });
    },
    [props.bio],
    [{ country: props.city, city: props.country }]
  );
  useEffect(() => {
    const saveCoverPic = async () => {
      if (!coverPhoto) {
        return; // Skip the API call if profilePicture is not set
      }
      if (coverPhoto) {
        const data = new FormData();
        data.append("file", coverPhoto);
        data.append("upload_preset", "images");
        data.append("cloud_name", "dkjrsdvof");
        try {
          const response = await fetch(
            "https://api.cloudinary.com/v1_1/dkjrsdvof/image/upload",
            {
              method: "post",
              body: data,
            }
          );
          result = await response.json();
          if (result) {
            console.log(result.public_id);
          } else {
            // Handle error case
            console.error("Failed to create a post");
          }
          console.log(result);
        } catch (error) {
          console.error(error);
        }
      }
      try {
        const resp = await fetch("http://localhost:3001/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: userId,
          }),
        });
        const resultBool = await resp.json();
        let response = "";
        console.log(result.public_id);
        if (resultBool) {
          response = await fetch(`http://localhost:3001/profile/${userId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cover_public_id: result.public_id,
            }),
          });
        } else {
          response = await fetch("http://localhost:3001/profile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: userId,
              cover_public_id: result.public_id,
            }),
          });
        }
        const data = await response.json();
        if (data) {
          console.log(data);
          console.log("Profile Photo Updated");
        } else {
          // Handle error case
          console.error("Failed to updata");
        }
      } catch (error) {
        console.error(error);
      }
      window.location.reload();
    };

    saveCoverPic();
  }, [coverPhoto]);
  const openGalleryCover = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => handleCoverPhotoUpload(e);
    input.click();
  };

  const openGalleryProfile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => handleProfilePictureUpload(e);
    input.click();
  };

  const handleNameChange = (event) => {
    let nameInput = event.target.value;
    const lettersOnlyRegex = /^[A-Za-z]+$/;

    if (!lettersOnlyRegex.test(nameInput)) {
      // If the input contains numbers or special characters, remove them
      nameInput = nameInput.replace(/[^A-Za-z]/g, "");
    }

    // Update the state with only alphabetic characters
    setName(nameInput);
  };

  const handleBioChange = (event) => {
    let bio = event.target.value;
    const lettersOnlyRegex = /^[A-Za-z]+$/;

    if (!lettersOnlyRegex.test(bio)) {
      // If the input contains numbers or special characters, remove them
      bio = bio.replace(/[^A-Za-z]/g, "");
    }
    setBio(bio);
  };

  const handleCountryChange = (event) => {
    let country = event.target.value;
    const lettersOnlyRegex = /^[A-Za-z]+$/;

    if (!lettersOnlyRegex.test(country)) {
      // If the input contains numbers or special characters, remove them
      country = country.replace(/[^A-Za-z]/g, "");
    }
    setLocation({ ...location, country: country });
  };

  const handleCityChange = (event) => {
    let city = event.target.value;
    const lettersOnlyRegex = /^[A-Za-z]+$/;

    if (!lettersOnlyRegex.test(city)) {
      // If the input contains numbers or special characters, remove them
      city = city.replace(/[^A-Za-z]/g, "");
    }
    setLocation({ ...location, city: city });
  };
  const handleSaveChanges = async (e) => {
    const resp = await fetch("http://localhost:3001/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userId,
      }),
    });
    const result = await resp.json();
    let res = "";
    if (result) {
      res = await fetch(`http://localhost:3001/profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bio,
          address: location,
        }),
      });
    } else {
      res = await fetch(`http://localhost:3001/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bio,
          address: location,
          user: userId,
        }),
      });
    }
    data = await res.json();
    // Save the changes to the profile
    setIsEditing(false);
  };
  let data = {};
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
  useEffect(() => {
    console.log(data); // Check the value of data.profile_public_id
  }, [data]);
  return (
    <div className="">
      <div className="profile-main">
        <div className="profile-container">
          <div className="cover-photo-wrapper">
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverPhotoUpload}
              className="cover-photo-input"
            />
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
            <div className="camera-icon-wrapper">
              <img
                src={cameraIcon}
                className="camera-icon-cover-pic"
                onClick={openGalleryCover}
                alt="Camera"
              />
            </div>
          </div>
          <div className="profile-container-inner">
            <div className="profile-picture-wrapper">
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureUpload}
                className="profile-picture-input"
              />
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
              <div className="camera-icon-wrapper">
                <img
                  src={cameraIcon}
                  className="camera-icon"
                  onClick={openGalleryProfile}
                  alt="Camera"
                />
              </div>
              <div className="edit-icon-wrapper">
                <img
                  src={editIcon}
                  className="edit-icon"
                  onClick={() => setIsEditing(true)}
                  alt="Edit"
                />
              </div>
            </div>
            <h1>{username}</h1>
            <b>{bio}</b>
            <p>
              {location.city}, {location.country} &middot;{" "}
              <a href="#">Contact Info</a>
            </p>

            <div className="mutual-connection">
              <img src={user2} alt="User" />
              <span>0 Mutual Friends</span>
            </div>
            <div className="profile-btn">
              {/* <a href="#" id="primary-btn">
                <img src={connect} alt="Connect" /> Connect
              </a> */}
              <a href="#">
                <img src={chat} alt="Chat" /> Message
              </a>
            </div>
          </div>
        </div>
      </div>
      {isEditing && (
        <div className="popup">
          <h2>Basic Info</h2>
          <hr />
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={handleNameChange} />
          </div>
          <div>
            <label>Bio:</label>
            <input type="text" value={bio} onChange={handleBioChange} />
          </div>
          <div>
            <h4>Location</h4>
            <label>Country:</label>
            <input
              type="text"
              value={location.country}
              onChange={handleCountryChange}
            />
          </div>
          <div>
            <label>City:</label>
            <input
              type="text"
              value={location.city}
              onChange={handleCityChange}
            />
          </div>
          <button className="save-button" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
