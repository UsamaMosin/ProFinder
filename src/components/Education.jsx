import React, { useState, useEffect } from "react";
import "../Exp-Edu.css";
import addIcon from "../img/add-icon.png";
import companyLogo from "../img/north.png";
const userId = sessionStorage.getItem("userId");
function Education(props) {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [schoolName, setSchoolName] = useState("");
  const [degree, setDegree] = useState("");
  const [field, setField] = useState("");
  const [startDate, setStartDate] = useState({ month: "", year: "" });
  const [endDate, setEndDate] = useState({ month: "", year: "" });
  const [description, setDescription] = useState("");
  const [educations, setEducations] = useState([]);
  const [showRequiredMessage, setShowRequiredMessage] = useState(false);

  const handleAddIconClick = () => {
    setPopupOpen(true);
    clearFormFields();
  };

  const closePopup = () => {
    setPopupOpen(false);
    setShowRequiredMessage(false);
    clearFormFields();
  };

  const handleSaveChanges = async (e) => {
    if (!schoolName || !degree || !field) {
      setShowRequiredMessage(true);
      return;
    }
    const newEducation = {
      schoolName,
      degree,
      field,
      startDate,
      endDate,
      description,
    };
    setEducations([...educations, newEducation]);
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
          education: [...educations, newEducation],
        }),
      });
    } else {
      res = await fetch(`http://localhost:3001/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          education: [...educations, newEducation],
          user: userId,
        }),
      });
      setShowRequiredMessage(false);
    }
    const data = await res.json();
    console.log(data);
    if (data) {
      setPopupOpen(false);
      clearFormFields();
    }
  };
  useEffect(() => {
    setEducations(props.education || []);
  }, [props.education]);
  const clearFormFields = () => {
    setSchoolName("");
    setDegree("");
    setField("");
    setStartDate({ month: "", year: "" });
    setEndDate({ month: "", year: "" });
    setDescription("");
  };

  return (
    <div className="profile-description">
      <h3>Education</h3>
      <div className="add-icon-wrapper">
        <img src={addIcon} className="add-icon" onClick={handleAddIconClick} />
      </div>

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

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-header">
            <h4>Add Education</h4>
            <button className="close-icon" onClick={closePopup}>
              &#10005;
            </button>
          </div>
          <hr />
          <div className="form-fields">
            <label htmlFor="schoolName">School*:</label>
            <input
              type="text"
              id="schoolName"
              value={schoolName}
              onChange={(e) =>
                setSchoolName(e.target.value.replace(/[^A-Za-z]/g, ""))
              }
              required
            />
            {showRequiredMessage && !schoolName && (
              <span style={{ color: "red" }}>This field is required.</span>
            )}
          </div>
          <div className="form-fields">
            <label htmlFor="degree">Degree*:</label>
            <input
              type="text"
              id="degree"
              value={degree}
              onChange={(e) =>
                setDegree(e.target.value.replace(/[^A-Za-z]/g, ""))
              }
              required
            />
            {showRequiredMessage && !degree && (
              <span style={{ color: "red" }}>This field is required.</span>
            )}
          </div>
          <div className="form-fields">
            <label htmlFor="field">Field Of Study*:</label>
            <input
              type="text"
              id="field"
              value={field}
              onChange={(e) =>
                setField(e.target.value.replace(/[^A-Za-z]/g, ""))
              }
            />
            {showRequiredMessage && !field && (
              <span style={{ color: "red" }}>This field is required.</span>
            )}
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
                <option value="February">February</option>
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
                <option value="February">February</option>
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

export default Education;
