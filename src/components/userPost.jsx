import React, { useState, useEffect } from "react";
import postPic from "../img/usermain.jpg";
import filledHeart from "../img/filledHeart.png";
import like from "../img/emptyHeart.png";
import comment from "../img/comment.png";
import share from "../img/share.png";
import "../userPost.css";
import { CloudinaryContext, Image } from "cloudinary-react";
import { format } from "timeago.js";
const UserPost = (props) => {
  const [userId, setUserId] = useState(null);
  const [postData, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Get the current date
  const currentDate = new Date().toLocaleDateString();
  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);
  const fetchDataPosts = async () => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      setPostData(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchDataPosts();
    }
  }, [userId]);
  const handleLike = (publicID, postID, userId) => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/postLike`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            post_id: postID,
            public_id: publicID,
            user_id: userId,
          }),
        });
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const data = await response.json();
        fetchDataPosts();
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    if (userId) {
      fetchData();
    }
  };
  return (
    <div className="post-container">
      {isLoading ? (
        <p>Loading posts...</p>
      ) : (
        postData.map((post, index) => (
          <div className="post" key={index}>
            <div className="post-author">
              <CloudinaryContext cloudName="dkjrsdvof">
                <div>
                  <Image publicId={post.profile_public_id} />
                </div>
              </CloudinaryContext>
              <div>
                <h1>{post.username}</h1>
                <small>{format(currentDate)}</small>
              </div>
            </div>
            {post.postArr.map((d, innerIndex) => (
              <div className="posttt" key={innerIndex}>
                <p>{d.caption}</p>
                <CloudinaryContext cloudName="dkjrsdvof">
                  <div>
                    <Image
                      publicId={d.public_id}
                      width="550px"
                      height="250px"
                    />
                  </div>
                </CloudinaryContext>

                <div className="post-stats">
                  <div>
                    <img src={filledHeart} alt="Liked" />
                    <span className="linked-users">{d.like} Likes</span>
                  </div>
                  <div>
                    <span>0 comments &middot; 0 shares</span>
                  </div>
                </div>

                <div className="post-activity">
                  <div className="post-activity-links">
                    <img
                      src={d.userIds.includes(userId) ? filledHeart : like}
                      alt="Like"
                      onClick={() => handleLike(d.public_id, post._id, userId)}
                    />
                    <span>Like</span>
                  </div>
                  <div className="post-activity-links">
                    <img src={comment} alt="Comment" />
                    <span>Comment</span>
                  </div>
                  <div className="post-activity-links">
                    <img src={share} alt="Share" />
                    <span>Share</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))
        //   postData.map((post, index) => (
        //     <div className="post" key={index}>
        //       <div className="post-author">
        //         <CloudinaryContext cloudName="dkjrsdvof">
        //           <div>
        //             <Image publicId={post.profile_public_id} />
        //           </div>
        //         </CloudinaryContext>
        //         <div>
        //           <h1>{post.username}</h1>
        //           <small>{format(currentDate)}</small>
        //         </div>
        //       </div>
        //       {post.postArr.map((d, index) => (
        //         <div key={index}>
        //           <p>{d.caption}</p>
        //           <CloudinaryContext cloudName="dkjrsdvof">
        //             <div>
        //               <Image
        //                 publicId={d.public_id}
        //                 width="550px"
        //                 height="250px"
        //               />
        //             </div>
        //           </CloudinaryContext>
        //         </div>
        //       ))}
        //       {post.postArr.map((d, index) => (
        //         <div key={index}>
        //           <div className="post-stats">
        //             <div>
        //               <img src={filledHeart} alt="Liked" />
        //               <span className="linked-users">{d.like} Likes</span>
        //             </div>

        //             <div>
        //               <span>0 comments &middot; 0 shares</span>
        //             </div>
        //           </div>

        //           <div className="post-activity">
        //             <div className="post-activity-links">
        //               <img
        //                 src={d.userIds.includes(userId) ? filledHeart : like}
        //                 alt="Like"
        //                 onClick={() => handleLike(d.public_id, post._id, userId)}
        //               />

        //               <span>Like</span>
        //             </div>

        //             <div className="post-activity-links">
        //               <img src={comment} alt="Comment" />
        //               <span>Comment</span>
        //             </div>

        //             <div className="post-activity-links">
        //               <img src={share} alt="Share" />
        //               <span>Share</span>
        //             </div>
        //           </div>
        //         </div>
        //       ))}
        //     </div>
        //   ))
      )}
    </div>
  );
};

export default UserPost;
