import React, { useState, useEffect } from "react";
import "../Exp-Edu.css";
import addIcon from "../img/add-icon.png";
import companyLogo from "../img/north.png";
const userId = sessionStorage.getItem("userId");
function Experience(props) {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [extraComment, setExtraComment] = useState("");
  const [startDate, setStartDate] = useState({ month: "", year: "" });
  const [endDate, setEndDate] = useState({ month: "", year: "" });
  const [description, setDescription] = useState("");
  const [experiences, setExperiences] = useState([]);

  const handleAddIconClick = () => {
    // Clear input fields when the add icon is clicked
    setCompanyName("");
    setPosition("");
    setExtraComment("");
    setStartDate({ month: "", year: "" });
    setEndDate({ month: "", year: "" });
    setDescription("");

    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleSaveChanges = async (e) => {
    // Create a new experience object
    const newExperience = {
      companyName,
      position,
      extraComment,
      startDate: { ...startDate },
      endDate: { ...endDate },
      description,
    };

    // Add the new experience to the experiences array
    setExperiences([...experiences, newExperience]);
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
          experience: [...experiences, newExperience],
        }),
      });
    } else {
      res = await fetch(`http://localhost:3001/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          experience: [...experiences, newExperience],
          user: userId,
        }),
      });
    }
    const data = await res.json();
    if (data) {
      // Close the popup after saving changes
      setPopupOpen(false);
    }
  };
  useEffect(() => {
    setExperiences(props.experience || []);
  }, [props.experience]);
  return (
    <div className="profile-description">
      <h3>Experience</h3>
      <div className="add-icon-wrapper">
        <img src={addIcon} className="add-icon" onClick={handleAddIconClick} />
      </div>
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

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-header">
            <h4>Add Experience</h4>
            <button className="close-icon" onClick={closePopup}>
              &#10005;
            </button>
          </div>
          <hr />
          <div className="form-fields">
            <label htmlFor="companyName">Company Name*:</label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>
          <div className="form-fields">
            <label htmlFor="position">Position*:</label>
            <input
              type="text"
              id="position"
              value={position}
              onChange={(e) =>
                setPosition(e.target.value.replace(/[^A-Za-z]/g, ""))
              }
              required
            />
          </div>
          <div className="form-fields">
            <label htmlFor="extraComment">Extra Comment:</label>
            <input
              type="text"
              id="extraComment"
              value={extraComment}
              onChange={(e) => setExtraComment(e.target.value)}
            />
          </div>
          <div className="form-fields">
            <label htmlFor="startDate">Start Date*:</label>
            <div className="input-wrapper">
              <select
                id="startDateMonth"
                value={startDate.month}
                onChange={(e) =>
                  setStartDate({ ...startDate, month: e.target.value })
                }
                required
              >
                <option value="">Select Month</option>
                <option value="January">January</option>
                <option value="Fabruary">Fabruary</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
              <select
                id="startDateYear"
                value={startDate.year}
                onChange={(e) =>
                  setStartDate({ ...startDate, year: e.target.value })
                }
                required
              >
                <option value="">Select Year</option>
                {Array.from({ length: 54 }, (_, index) => 1970 + index).map(
                  (year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          <div className="form-fields">
            <label htmlFor="endDate">End Date*:</label>
            <div className="input-wrapper">
              <select
                id="endDateMonth"
                value={endDate.month}
                onChange={(e) =>
                  setEndDate({ ...endDate, month: e.target.value })
                }
                required
              >
                <option value="">Select Month</option>
                <option value="January">January</option>
                <option value="Fabruary">Fabruary</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
              <select
                id="endDateYear"
                value={endDate.year}
                onChange={(e) =>
                  setEndDate({ ...endDate, year: e.target.value })
                }
                required
              >
                <option value="">Select Year</option>
                {Array.from({ length: 54 }, (_, index) => 1970 + index).map(
                  (year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
          <div className="form-fields">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
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

export default Experience;
