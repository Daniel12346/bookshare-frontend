import React from "react";
import { Router, Link } from "@reach/router";

import Users from "./Users";
import Login from "./Login";
import RouterPage from "./RouterPage";
import Me from "./Me";
import Nav from "./Nav";

const App = () => {
  return (
    <div className="App">
      <Nav>
        <Link to="users">users</Link>
        <Link to="me">me</Link>
      </Nav>
      <Router>
        <RouterPage component={<Login />} path="login" />
        <RouterPage component={<Users />} path="users" />
        <RouterPage component={<Me />} path="me" />
      </Router>
    </div>
  );
};

export default App;
