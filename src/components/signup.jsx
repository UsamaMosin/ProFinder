import React, { Component } from "react";
import "../signup.css";
import axios from "axios";
import signupLogo from "../images/signup-image.jpg";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
const SignUp = () => {
  const history = useHistory();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    repeatpassword: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate(formValues);
    setFormErrors(err);
    if (Object.keys(err).length > 0) {
      console.log("Errorsss");
      return;
    }
    setIsSubmit(true);
    const { username, email, password } = formValues;
    const newUser = {
      username,
      email,
      password,
    };
    //const res = await axios.post("http://localhost:3001/register", newUser);
    const res = await fetch("http://localhost:3001/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const data = await res.json();
    if (data.status === 422 || !data) {
      console.log("Invalid User");
    } else {
      console.log("Sigup Successfully!!!");
      history.push("/login");
    }
  };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit)
      console.log(formValues);
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (!values.username) errors.username = "Username is required!";
    if (!values.email) errors.email = "Email is required!";
    else if (!regex.test(values.email))
      errors.email = "This is not a valid Email Format!";
    if (!values.password) errors.password = "Password is required!";
    else if (values.password.length < 6)
      errors.password = "Password must be more than 6 characters!";
    else if (values.password.length > 10)
      errors.password = "Password cannot exceed more than 10 characters!";
    if (!values.repeatpassword) errors.repeatpassword = "Paasword is required!";
    else if (values.password !== values.repeatpassword)
      errors.repeatpassword = "Password doesn't Match";
    return errors;
  };
  return (
    <div className="main">
      <div className="mainContainer">
        <div className="row">
          <div className="col-10">
            <div className="signup-content">
              <div className="signup-form">
                <h2 className="form-title">Sign up</h2>
                <form
                  onSubmit={handleSubmit}
                  method="POST"
                  className="register-form"
                  id="register-form"
                >
                  <div className="form-group">
                    <label for="name">
                      <i className="zmdi zmdi-account material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="name"
                      placeholder="Your Name"
                      value={formValues.username}
                      onChange={handleChange}
                    />
                  </div>
                  <p>{formErrors.username}</p>
                  <div className="form-group">
                    <label for="email">
                      <i className="zmdi zmdi-email"></i>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Your Email"
                      value={formValues.email}
                      onChange={handleChange}
                    />
                  </div>
                  <p>{formErrors.email}</p>
                  <div className="form-group">
                    <label for="pass">
                      <i className="zmdi zmdi-lock"></i>
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="pass"
                      placeholder="Password"
                      value={formValues.passwoed}
                      onChange={handleChange}
                    />
                  </div>
                  <p>{formErrors.password}</p>
                  <div className="form-group">
                    <label for="re-pass">
                      <i className="zmdi zmdi-lock-outline"></i>
                    </label>
                    <input
                      type="password"
                      name="repeatpassword"
                      id="re_pass"
                      placeholder="Repeat your password"
                      value={formValues.repeatpassword}
                      onChange={handleChange}
                    />
                  </div>
                  <p>{formErrors.repeatpassword}</p>
                  <div className="form-group">
                    <input
                      type="checkbox"
                      name="agree-term"
                      id="agree-term"
                      className="agree-term"
                    />
                    <label for="agree-term" className="label-agree-term">
                      <span>
                        <span></span>
                      </span>
                      I agree all statements in{" "}
                      <a href="#" className="term-service">
                        Terms of service
                      </a>
                    </label>
                  </div>
                  <div className="form-group form-button">
                    <input
                      type="submit"
                      name="signup"
                      id="signup"
                      className="form-submit"
                      value="Register"
                    />
                  </div>
                </form>
              </div>
              <div className="signup-image">
                <figure>
                  <img src={signupLogo} alt="sing up image" />
                </figure>
                <Link to="/login" className="signup-image-link">
                  I am already member
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
