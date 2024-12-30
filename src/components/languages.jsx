import React, { useState, useEffect } from "react";
import addIcon from "../img/add-icon.png";
import "../languages.css";
const userId = sessionStorage.getItem("userId");
function Language(props) {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [language, setLanguage] = useState("");
  const [languages, setLanguages] = useState([]);

  const handleAddIconClick = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setLanguage("");
  };

  const handleSaveChanges = async (e) => {
    if (language.trim() !== "") {
      setLanguages([...languages, language]);
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
      console.log(result);
      let res = "";
      if (result) {
        res = await fetch(`http://localhost:3001/profile/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: [...languages, language],
          }),
        });
      } else {
        res = await fetch(`http://localhost:3001/profile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: [...languages, language],
            user: userId,
          }),
        });
      }
      const data = await res.json();
      console.log(data);
      if (data) {
        setLanguage("");
        setPopupOpen(false);
      }
    }
  };
  useEffect(() => {
    setLanguages(props.languages || []);
  }, [props.languages]);
  return (
    <div className="profile-description">
      <h3>Languages</h3>
      <div className="language-buttons">
        {languages.map((lang, index) => (
          <button className="btn btn-small language-btn" key={index}>
            {lang}
          </button>
        ))}
      </div>
      <div className="add-icon-wrapper">
        <img src={addIcon} className="add-icon" onClick={handleAddIconClick} />
      </div>
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-header">
            <h4>Add Language</h4>
            <button className="close-icon" onClick={closePopup}>
              &#10005;
            </button>
          </div>
          <hr />
          <div className="form-field">
            <label htmlFor="language">Language:</label>
            <input
              type="text"
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
            />
          </div>
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

export default Language;
