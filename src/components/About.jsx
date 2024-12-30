import React, { useState, useEffect } from "react";
import "../About.css";
import editIcon from "../img/edit.jpg";
const userId = sessionStorage.getItem("userId");
function About(props) {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [aboutText, setAboutText] = useState("");
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore((prevState) => !prevState);
  };

  const handleEditIconClick = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleSaveChanges = async (e) => {
    const pAbout = document.getElementById("about");
    setAboutText(pAbout.innerText);
    console.log(aboutText);
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
          about: aboutText,
        }),
      });
    } else {
      res = await fetch(`http://localhost:3001/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          about: aboutText,
          user: userId,
        }),
      });
    }
    const data = await res.json();
    if (data) setPopupOpen(false); // Close the popup after saving changes
  };
  useEffect(() => {
    setAboutText(props.about || []);
  }, [props.about]);
  const MAX_LENGTH = 320;
  let shortText = "";
  let longText = "";
  if (aboutText.length > 0) {
    shortText = aboutText.substring(0, MAX_LENGTH);
    longText = aboutText;
  }
  const shouldShowMoreLink = aboutText.length > MAX_LENGTH;

  return (
    <div className="profile-description">
      <div className="edit-icon-wrapper">
        <img
          src={editIcon}
          className="edit-icon"
          onClick={handleEditIconClick}
        />
      </div>
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
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-header">
            <h4>Edit About</h4>
            <button className="close-icon" onClick={closePopup}>
              &#10005;
            </button>
          </div>
          <hr />
          <p>
            You can write about your years of experience, industry, or skills.
            People also talk about their achievements or previous job
            experiences.
          </p>
          <textarea
            className="about-textarea"
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            placeholder="Enter your new About"
          />
          <button
            className="btn btn-small btn-primary save-button"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}

export default About;
