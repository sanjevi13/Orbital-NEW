import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import SearchResults from "./components/searchResults/SearchResults";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext , useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";
import Messenger from "./pages/messenger/Messenger";

function App() {
  axios.defaults.withCredentials = true;
  const { user } = useContext(AuthContext); 
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Login/>}
        </Route>
        
        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>

        <Route path="/messenger">
          {!user ? <Redirect to="/" /> : <Messenger/>}
        </Route>
        
        <Route path="/profile/:username">
          {user ? <Profile /> : <Login />}
        </Route>

        <Route path="/search/:query">
          {user ? <SearchResults/>: <Login />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;