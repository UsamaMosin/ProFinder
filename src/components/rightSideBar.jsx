import React from "react";
import infoIcon from "../img/more.png";
import miIcon from "../img/mi-logo.png";
import "../rightSideBar.css";
import { CloudinaryContext, Image } from "cloudinary-react";

const RightSideBar = (props) => {
  console.log(props);
  return (
    <div className="right-sidebar">
      <div className="sidebar-news">
        <img src={infoIcon} className="info-icon" />
        <h3>Trending News</h3>
        <a>Highest Demand For Freelancers</a>
        <span>1d ago · 10,989 readers</span>
        <a>Careers Growing Rate is Fast</a>
        <span>12h ago · 13,989 readers</span>
        <a>Visa for trained Workers for UK</a>
        <span>19d ago · 10,989 readers</span>
        <a>Subscribe the freecodebox youtube channel</a>
        <span>20d ago · 10,989 readers</span>
        <a href="#" className="read-more-link">
          Read More
        </a>
      </div>
      <div className="sidebar-ad1">
        <small>Ad · · ·</small>
        <p>Expert in these Principles for Web Designs</p>
        <div className="img-contain">
          <CloudinaryContext cloudName="dkjrsdvof">
            <div>
              <Image publicId={props.pro_public_id} />
            </div>
          </CloudinaryContext>
          <img src={miIcon} />
        </div>
        <b>brand &amp; Demand in Xiaomi</b>
        <a href="#" className="ad1-link">
          Learn More
        </a>
      </div>
      <div className="sidebar-useful-links">
        <a href="#">About</a>
        <a href="#">Accessibility</a>
        <a href="#">Help Center</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Advertising</a>
        <a href="#">Get the App</a>
        <a href="#">More</a>
      </div>
      <div className="copyright-message">
        <i className="text">
          Pro<span style={{ color: "red", fontSize: "19px" }}>Finder</span>
        </i>
        <p>ProFinder © 2023. All right reserved</p>
      </div>
    </div>
  );
};
export default RightSideBar;
