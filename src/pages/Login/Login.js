import React, { useState, useEffect, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import styles from "./Login.module.scss";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import { AuthContext } from "../../utils/Auth";
import Firebase from "../../utils/Firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
const Login = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { userDetails } = useContext(AuthContext);
  async function onSubmit(e) {
    e.preventDefault();
    await Firebase.auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => {
        //setBtnDisabled(false);
        history.push("/");
      })
      .catch((err) => {
        alert(err);
        //setBtnDisabled(false);
      });
  }
  const classes = useStyles();

  return (
    <div className={styles.loginContainer}>
      <form
        className={classNames(classes.root, styles.loginForm)}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="username"
          label="Username"
          required
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          required
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <Button
        type="submit"
        onClick={onSubmit}
        variant="contained"
        color="primary"
      >
        Login
      </Button>
      <Link to="/">Want to register a Patient ? Click here</Link>
    </div>
  );
};

export default withRouter(Login);

// Email : admin@covidhelp.in
// Password : admin123
