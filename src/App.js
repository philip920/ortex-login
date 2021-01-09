import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Login } from './components/Login/Login'

// redirect to /login
export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login"/>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}