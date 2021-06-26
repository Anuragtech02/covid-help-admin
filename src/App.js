import React from "react";
import styles from "./App.module.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

const App = () => {
  return (
    <div className={styles.container}>
      <Router>
        <Switch>
          <Route path="/" exact component={Register} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
