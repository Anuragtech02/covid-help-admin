import React from "react";
import styles from "./App.module.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { AuthProvider } from "./utils/Auth";

const App = () => {
  return (
    <AuthProvider>
      <div className={styles.container}>
        <Router>
          <Switch>
            <Route path="/" exact component={Register} />
            <Route path="/login" exact component={Login} />
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
