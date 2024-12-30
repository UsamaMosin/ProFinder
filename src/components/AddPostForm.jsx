import React, { useState, useEffect } from "react";
export default function AddPost() {
  const [userId, setUserId] = useState(null);
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const waitingFuntion = async () => {
      const storedUserId = sessionStorage.getItem("userId");
      await setUserId(storedUserId);
      console.log(storedUserId);
    };
    waitingFuntion();
  }, [sessionStorage.getItem("userId")]);
  const cancelPost = () => {
    // Reset caption and selected file
    setCaption("");
    setSelectedFile(null);

    let contC = document.getElementsByClassName("container-add-post-form")[0];
    contC.style.display = "none";
    let textarea = document.getElementsByTagName("textarea")[0];
    let file_document = document.getElementsByTagName("input")[0];
    textarea.value = "";
    file_document.value = "";

    let form = document.getElementsByClassName("add-post-form")[0];

    form.style.display = "none";
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  console.log(userId);
  let result = "";
  const handlePost = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("file", selectedFile);
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
    try {
      const resp = await fetch("http://localhost:3001/checkPost", {
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
      if (resultBool) {
        response = await fetch(`http://localhost:3001/post/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: userId,
            caption,
            public_id: result.public_id,
          }),
        });
      } else {
        response = await fetch("http://localhost:3001/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: userId,
            caption,
            public_id: result.public_id,
          }),
        });
      }
      const data = await response.json();
      if (data) {
        cancelPost();
      } else {
        // Handle error case
        console.error("Failed to create a post");
      }
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  };

  return (
    <div
      className="container-add-post-form"
      style={{
        width: "100%",
        height: "100vh",
        display: "none",
        // background: "black",
        opacity: 0.3,
        zIndex: 99,
      }}
    >
      <div className="row add-post-form">
        <div className="text-center text-white col-12">
          <div className="card-header">Create A New Post</div>
          <div className="card-body">
            <textarea
              type="text"
              placeholder="What's on your mind?"
              className="col-12 post-text"
              name="post-description"
              value={caption}
              onChange={handleCaptionChange}
            ></textarea>
            <div className="w-100"></div>
            <input
              type="file"
              name="file"
              className="col-12 pl-0 pt-1"
              onChange={handleFileChange}
            />
          </div>
          <div className="card-footer">
            <div className="btn btn-danger ml-3" onClick={cancelPost}>
              Cancel
            </div>
            <div
              className="btn btn-primary ml-3 mr-2"
              style={{ width: "90px" }}
              onClick={handlePost}
              disabled={loading}
            >
              {loading ? "Posting..." : "Post"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
