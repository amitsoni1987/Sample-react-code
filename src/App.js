import "./App.css";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Search, Grid, Label } from "semantic-ui-react";
import SearchRepo from "./components/Search";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Repository from "./components/Repository";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={SearchRepo} />
        <Route path="/repository" exact component={Repository} />
      </Switch>
    </Router>
  );
}

export default App;
