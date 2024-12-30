import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
const KeyField = (props) => {
  console.log(props);
  //console.log(props.user);
  const history = useHistory();
  const [key, setKey] = useState("");
  const [keyError, setKeyError] = useState("");
  const handleChange = (e) => {
    const { value } = e.target;
    setKey(value);
    console.log(key);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (key == props.keys) {
      setKeyError("");
      console.log("Admin Panel");
      history.push({
        pathname: "/adminPanel",
        state: { name: props.user.username },
      });
    } else setKeyError("Wrong Key");
  };
  useEffect(() => {
    console.log(keyError);
  }, [keyError]);
  return (
    <div>
      <form
        method="POST"
        class="register-form"
        id="login-form"
        onSubmit={handleSubmit}
      >
        <div class="form-group">
          <label for="your_pas">
            <i class="zmdi zmdi-lock"></i>
          </label>
          <input
            type="password"
            name="your_pass"
            id="your_pass"
            placeholder="Key"
            value={key}
            onChange={handleChange}
          />
        </div>
        <p>{keyError}</p>
        <div class="form-group form-button">
          <input
            type="submit"
            name="signin"
            id="signin"
            class="form-submit"
            value="Log in"
          />
        </div>
      </form>
    </div>
  );
};

export default KeyField;
