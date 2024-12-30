import React, { useState } from "react";
import "../skills.css";
import addIcon from "../img/add-icon.png";
import { useEffect } from "react";
const userId = sessionStorage.getItem("userId");
const userName = sessionStorage.getItem("userName");
function Skill({ name, description }) {
  return (
    <div className="skill-item">
      <h4>{name}</h4>
      <p>{description}</p>
    </div>
  );
}
console.log(userId);
const Skills = (props) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [skillName, setSkillName] = useState("");
  const [skillDescription, setSkillDescription] = useState("");
  const [skills, setSkills] = useState([]);
  console.log(skills);
  const handleAddIconClick = () => {
    setSkillName("");
    setSkillDescription("");
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };
  const handleSaveChanges = async (e) => {
    const newSkill = {
      name: skillName,
      description: skillDescription,
    };
    setSkills([...skills, newSkill]);
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
          skills: [...skills, newSkill],
        }),
      });
    } else {
      res = await fetch(`http://localhost:3001/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skills: [...skills, newSkill],
          user: userId,
        }),
      });
    }
    const data = await res.json();
    if (data) {
      setSkillName("");
      setSkillDescription("");
      setPopupOpen(false);
    }
  };
  useEffect(() => {
    setSkills(props.skills || []);
  }, [props.skills]);
  return (
    <div className="profile-description">
      <h3>Skills</h3>
      <div className="add-icon-wrapper">
        <img src={addIcon} className="add-icon" onClick={handleAddIconClick} />
      </div>
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

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-header">
            <h4>Add Skill</h4>
            <button className="close-icon" onClick={closePopup}>
              &#10005;
            </button>
          </div>
          <hr />
          <div className="form-fields">
            <label htmlFor="skillName">Skill*</label>
            <input
              type="text"
              id="skillName"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              required
            />
          </div>
          <div className="form-fields">
            <label htmlFor="skillDescription">Describe Skills</label>
            <input
              type="text"
              id="skillDescription"
              value={skillDescription}
              onChange={(e) => setSkillDescription(e.target.value)}
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
};

export default Skills;
