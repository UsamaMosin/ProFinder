import React from "react";
import "../navBar.css";
import { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import home from "../img/home.png";
import network from "../img/network.png";
import jobs from "../img/jobs.png";
import message from "../img/message.png";
import notification from "../img/notification.png";
import search from "../img/search.png";
import feedback from "../img/feedback.png";
import setting from "../img/setting.png";
import help from "../img/help.png";
import display from "../img/display.png";
import logout from "../img/logout.png";
import { CloudinaryContext, Image } from "cloudinary-react";
const NavBar = ({ name, pro_public_id }) => {
  const history = useHistory();
  const [userId, setUserId] = useState(null);
  const [pro_pub_id, setPro_pub_id] = useState("");
  const [username, setUsername] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const waitingFuntion = async () => {
      const storedUserId = sessionStorage.getItem("userId");
      await setUserId(storedUserId);
      console.log(storedUserId);
    };
    waitingFuntion();
  }, [sessionStorage.getItem("userId")]);
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
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // User clicked outside the dropdown, hide it
        setSuggestions([]);
      }
    }

    // Attach event listener to the document when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchValue.trim() !== "") {
      // Make API request when search value changes
      fetch(`/search?query=${searchValue}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setSuggestions(data);
        })
        .catch((error) => {
          console.error("Error retrieving username suggestions:", error);
        });
    } else {
      // Clear suggestions if search value is empty
      setSuggestions([]);
    }
  }, [searchValue]);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = () => {
    // Perform logout actions here
    // Clear session storage or any other necessary tasks
    sessionStorage.removeItem("userId");
    console.log(sessionStorage.getItem("userId"));
    // Redirect to the login page
    history.push("/login");
  };
  const handleClick = (userId) => {
    history.push({
      pathname: "/otherProfile",
      state: { id: userId },
    });
  };
  return (
    <div className="homePageContainer">
      <nav className="navbar" style={{ zIndex: 2 }}>
        <div className="logo">
          <Link
            to={{
              pathname: "/homePage",
              state: { name: name },
            }}
          >
            <i className="text">
              Pro<span style={{ color: "red", fontSize: "19px" }}>FINDER</span>
            </i>
          </Link>
          <div className="search-box">
            <img src={search} alt="Search" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search"
            />
          </div>
          {suggestions.length > 0 && (
            <ul className="suggestions-dropdown" ref={dropdownRef}>
              {suggestions.map((user) => (
                <li key={user._id} onClick={() => handleClick(user._id)}>
                  {user.username}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="navbar-center">
          <ul>
            <li>
              <Link
                to={{
                  pathname: "/homePage",
                  state: { name: username },
                }}
                className="active-link"
              >
                <img src={home} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to={{
                  pathname: "/myNetwork",
                  state: { name: username },
                }}
                className="active-link"
              >
                <img src={network} />
                <span>My Network</span>
              </Link>
            </li>
            <li>
              <a href="#">
                <img src={jobs} />
                <span>Jobs</span>
              </a>
            </li>
            <li>
              <Link
                to={{
                  pathname: "/messenger",
                  state: { name: username },
                }}
                className="active-link"
              >
                <img src={network} />
                <span>Messaging</span>
              </Link>
            </li>
            <li>
              <a href="#">
                <img src={notification} />
                <span>Notifications</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="navbar-right">
          <div className="online">
            <CloudinaryContext cloudName="dkjrsdvof">
              <div>
                <Image
                  publicId={pro_pub_id}
                  className="nav-profile-img"
                  onClick={toggleMenu}
                />
                <span
                  onClick={toggleMenu}
                  style={{ position: "center", paddingLeft: "12px" }}
                >
                  Me
                </span>
              </div>
            </CloudinaryContext>
            {/* <img
              src={userMain}
              className="nav-profile-img"
              onClick={toggleMenu}
            /> */}
          </div>
        </div>
        {/* ==================================Profile-drop-down -menu=================================== */}
        <div className={`profile-menu-wrap ${isMenuOpen ? "open-menu" : ""}`}>
          <div className="profile-menu">
            <div className="user-info">
              <CloudinaryContext cloudName="dkjrsdvof">
                <div>
                  <Image publicId={pro_pub_id} />
                </div>
              </CloudinaryContext>
              <div>
                <h5>{username}</h5>
                <Link
                  to={{
                    pathname: "/userProfile",
                    state: { name: username },
                  }}
                >
                  See Your Profile
                </Link>
              </div>
            </div>
            <hr />
            <a href="#" className="profile-menu-link">
              <img src={feedback} />
              <p>Give Feedback</p>
              <span>&gt;</span>
            </a>
            <a href="#" className="profile-menu-link">
              <img src={setting} />
              <p>Setting &amp; Privacy</p>
              <span>&gt;</span>
            </a>
            <a href="#" className="profile-menu-link">
              <img src={help} />
              <p>Help &amp; Support</p>
              <span>&gt;</span>
            </a>
            <a href="#" className="profile-menu-link">
              <img src={display} />
              <p>Display &amp; Accessibility</p>
              <span>&gt;</span>
            </a>
            <a href="#" className="profile-menu-link" onClick={handleLogout}>
              <img src={logout} />
              <p>Logout</p>
              <span>&gt;</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
