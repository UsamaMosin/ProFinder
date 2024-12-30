import React from "react";
import "../landingPage.css";
import { Link } from "react-router-dom";
import about from "../img/home.png";
const LandingPage = () => {
  return (
    <div>
      <nav className="lpnavbar lpbackground v-height-rsp">
        <div className="lplogo">
          <h1 style={{ fontSize: "40px" }}>
            PRO<span>FINDER</span>
          </h1>
        </div>

        <ul className="lpnavlist v-visibility-rsp">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#About">About</a>
          </li>
          <li>
            <a href="#Services">Services</a>
          </li>
          <li>
            <a href="#Contact">Contact</a>
          </li>
          <li>
            <a href="#dt">Development Team</a>
          </li>
        </ul>
        <div className="lprightnavbar v-visibility-rsp">
          <input type="text" name="search" id="lpsearch" />
        </div>
        <div className="lpburger">
          <div className="lplines"></div>
          <div className="lplines"></div>
          <div className="lplines"></div>
        </div>
      </nav>

      <main id="home">
        <section>
          <h1>
            WELCOME TO PRO<span>FINDER</span>
          </h1>
          <p>"A Social Network Website"</p>
          <Link to="/signup" className="lpbtnone">
            signup here
          </Link>
          <Link to="/login" className="lpbtntwo">
            signin here
          </Link>
        </section>
      </main>

      <section id="About" className="twosection">
        <div>
          <p className="tag">The end of search is here</p>
          <h6 className="subtag">
            Lorem Ipsum is simply dummy text of the printing and typesetting in
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.It is a long established
            fact that a reader will be distracted by the readable content of a
            page when looking at its layout. The point of using Lorem Ipsum is
            that it has a more-or-less normal distribution of letters, as
            opposed to using 'Content here, content here', making it look like
            readable English.
          </h6>
        </div>
        <div>
          <img src={about} />
        </div>
      </section>

      <section className="threesection">
        <div className="para">
          <p className="tag">Transforming Education In India</p>
          <h6 className="subtag">
            Lorem Ipsum is simply dummy text of the printing and typesetting in
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </h6>
        </div>
        <div>
          <img src={about} />
        </div>
      </section>

      <hr />

      <div id="Services" className="lpcontainer">
        <h1 className="lpheading">our services</h1>
        <div className="lpbox-container">
          <div className="lpbox">
            <img src="img/icon-1.png" alt="" />
            <h3>HTML 5</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
              commodi?
            </p>
            <a href="#" className="lpbtn">
              read more
            </a>
          </div>

          <div className="lpbox">
            <img src="img/icon-2.png" alt="" />
            <h3>CSS 3</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
              commodi?
            </p>
            <a href="#" className="lpbtn">
              read more
            </a>
          </div>

          <div className="lpbox">
            <img src="img/icon-3.png" alt="" />
            <h3>JavaScript</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
              commodi?
            </p>
            <a href="#" className="lpbtn">
              read more
            </a>
          </div>

          <div className="lpbox">
            <img src="img/icon-4.png" alt="" />
            <h3>SASS</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
              commodi?
            </p>
            <a href="#" className="lpbtn">
              read more
            </a>
          </div>

          <div className="lpbox">
            <img src="img/icon-5.png" alt="" />
            <h3>JQuery</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
              commodi?
            </p>
            <a href="#" className="lpbtn">
              read more
            </a>
          </div>

          <div className="lpbox">
            <img src="img/icon-6.png" alt="" />
            <h3>React.js</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
              commodi?
            </p>
            <a href="#" className="lpbtn">
              read more
            </a>
          </div>
        </div>
      </div>

      <div id="dt" className="lpteam-container">
        <div className="lpteam-members">
          <div className="lpmember">
            <img src="img/user-1.png" alt="Member 1" />
            <h3>John Doe</h3>
            <p>Front-end Developer</p>
          </div>
          <div className="lpmember">
            <img src="img/user-2.png" alt="Member 2" />
            <h3>Jane Smith</h3>
            <p>Back-end Developer</p>
          </div>
          <div className="lpmember">
            <img src="img/user-3.png" alt="Member 3" />
            <h3>Mike Johnson</h3>
            <p>Full-stack Developer</p>
          </div>
          <div className="lpmember">
            <img src="img/user-4.png" alt="Member 4" />
            <h3>Sarah Wilson</h3>
            <p>UI/UX Designer</p>
          </div>
          <div className="lpmember">
            <img src="img/user-5.png" alt="Member 5" />
            <h3>Chris Brown</h3>
            <p>Project Manager</p>
          </div>
        </div>
        <div className="lpnavigation">
          <span id="lpprev-arrow">&lt;</span>
          <span id="lpnext-arrow">&gt;</span>
        </div>
      </div>

      <div id="Contact" className="Contact">
        <form className="from">
          <input
            type="text"
            name="text"
            id="lptext"
            placeholder="Enter Your Name"
          />
          <br />
          <input type="text" id="lpphone" placeholder="Enter Your Phone" />
          <br />
          <input type="email" id="lpemail" placeholder="Enter Your Email" />
          <br />
          <textarea
            id="lpcomment"
            placeholder="Elaborate Your Concern"
          ></textarea>
          <br />
          <input type="submit" id="lpsubmit" name="submit" />
        </form>
      </div>

      <div className="lpfooter">
        <h5>Copyright ID 2028 - www.profinder.com - All rights reserved</h5>
      </div>

      <script src="js/rsp.js"></script>
    </div>
  );
};

export default LandingPage;
