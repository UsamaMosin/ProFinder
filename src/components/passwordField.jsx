import React from "react";
import { useState, useEffect } from "react";
import HomePage from "./homePage";
import { useHistory } from "react-router-dom";
const PasswordField = (props) => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const handleChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    console.log(password);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/comparePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: props.user.email,
        password: password,
      }),
    });
    const data = await res.json(res);
    console.log(res);
    if (data) {
      setPasswordError("");
      console.log("Home Page");
      history.push({
        pathname: "/homePage",
        state: { name: props.user.username, id: data._id },
      });
    } else setPasswordError("Wrong Password");
  };
  useEffect(() => {
    console.log(passwordError);
  }, [passwordError]);

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
            placeholder="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <p>{passwordError}</p>
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

export default PasswordField;
