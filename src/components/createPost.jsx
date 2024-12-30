import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "../createPost.css";
import userMain from "../img/usermain.jpg";
import photo from "../img/photo.png";
import video from "../img/video.png";
import event from "../img/event.png";
import downArrow from "../img/down-arrow.png";
import UserPost from "./userPost";
import { CloudinaryContext, Image } from "cloudinary-react";
import UserOwnPost from "./userOwnPosts";
const CreatePost = (props) => {
  const addPost = () => {
    let cont = document.getElementsByClassName("container-add-post-form")[0];
    cont.style.display = "block";
    cont.style.width = "100%";
    cont.style.height = "100vh";
    cont.style.background = "#00000047";
    cont.style.opacity = "1";
    cont.style.position = "fixed";
    cont.style.top = "0";
    console.log(cont);
    // let cont = document.getElementsByClassName("homePageContainer");
    // for (let i = 0; i < cont.length; i++) {
    //   cont[i].style = "opacity: 0.3";
    // }
    let form = document.getElementsByClassName("add-post-form")[0];
    form.style.opacity = "1";
    form.style.display = "block";
  };
  return (
    <div>
      <div className="post-contain">
        <div className="main-content">
          <div className="create-post">
            <div className="create-post-input">
              <CloudinaryContext cloudName="dkjrsdvof">
                <div>
                  <Image publicId={props.pro_public_id} />
                </div>
              </CloudinaryContext>
              <textarea
                rows="2"
                placeholder="Write a post"
                onClick={addPost}
              ></textarea>
            </div>
            <div className="create-post-links">
              <li>
                <img src={photo} />
                Photo
              </li>
              <li>
                <img src={video} />
                Video
              </li>
              <li>
                <img src={event} />
                Event
              </li>
              <li>
                {/* <img src={event} /> */}
                Post
              </li>
            </div>
          </div>
          <div className="sort-by">
            <hr />
            <p>
              Sort by: <span>top</span> <img src={downArrow} />
            </p>
          </div>
        </div>
        <UserPost pro_public_id={props.pro_public_id} name={props.name} />
      </div>
    </div>
  );
};
export default CreatePost;
