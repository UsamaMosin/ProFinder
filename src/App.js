import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/login";
import "./App.css";
import SignUp from "./components/signup";
import HomePage from "./components/homePage";
import AdminPanel from "./components/adminPanel";
import userProfile from "./components/userProfile";
import AddPost from "./components/AddPostForm";
import OtherProfile from "./components/otherProfile";
import MyNetwork from "./components/MyNetwork";
import LandingPage from "./components/landingPage";
import Connections from "./components/Connections";
import Messenger from "./components/messenger";
import adminPanel from "./components/adminPanel";
import dashboard from "./components/dashboard";
import User from "./components/adminUser";
import Report from "./components/adminReport";

class App extends Component {
  render() {
    return (
      <div>
        <AddPost />
        <div className="content">
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/homePage" component={HomePage} />
            <Route path="/myNetwork" component={MyNetwork} />
            <Route path="/userProfile" component={userProfile} />
            <Route path="/otherProfile" component={OtherProfile} />
            <Route path="/connections" component={Connections} />
            <Route path="/messenger" component={Messenger} />
            <Route path="/adminPanel" component={adminPanel} />
            <Route path="/dashboard" component={dashboard} />
            <Route path="/users" component={User}></Route>
            <Route path="/report" component={Report}></Route>
            <Route path="/ " component={LandingPage} />
          </Switch>
        </div>
      </div>
      // <Home />
    );
  }
}

export default App;
