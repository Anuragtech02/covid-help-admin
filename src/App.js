import React from "react";
import styles from "./App.module.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { AuthProvider } from "./utils/Auth";
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <div className={styles.container}>
        <Router>
          <Switch>
            <PrivateRoute path="/" exact component={Register} />
            <Route path="/login" exact component={Login} />
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;