import React, { Component } from "react";
import signinLogo from "../images/signin-image.jpg";
import { Link } from "react-router-dom";
import NameField from "./NameField";
import "../signup.css";
const Login = () => {
  return (
    <div className="main">
      <section class="sign-in">
        <div class="container">
          <div class="signin-content">
            <div class="signin-image">
              <figure>
                <img src={signinLogo} alt="sing up image" />
              </figure>
              <Link to="/signup" class="signup-image-link">
                Create an account
              </Link>
            </div>

            <div class="signin-form">
              <h2 class="form-title">Login</h2>
              <NameField />
              <div class="social-login">
                <span class="social-label">Or login with</span>
                <ul class="socials">
                  <li>
                    <a href="#">
                      <i class="display-flex-center zmdi zmdi-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="display-flex-center zmdi zmdi-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="display-flex-center zmdi zmdi-google"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
