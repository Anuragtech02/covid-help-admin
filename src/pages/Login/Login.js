import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import classNames from "classnames";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));
  const classes = useStyles();
  useEffect(() => {
    console.log(username, password);
  });
  return (
    <div className={styles.loginContainer}>
      <div className={styles.registerContainer}>
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
          <Button variant="contained" color="primary">
            Login
          </Button>
        </form>
        <Link to="/">Want to register a Patient ? Click here</Link>
      </div>
    </div>
  );
};

export default Login;
