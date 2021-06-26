import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.scss";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

const Register = () => {
  const [state, setState] = useState({
    name: "",
    additionalContact: "",
    age: "",
    email: "",
    contact: "",
    address: "",
    gender: "",
  });
  function onChangeInput(e) {
    console.log("onChangeInput", e.target.value);
    const { id, value } = e.target;
    setState((prev) => ({
      ...prev,
      [id]: value,
    }));
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));
  const classes = useStyles();
  return (
    <div className={styles.registerContainer}>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="name"
          onChange={onChangeInput}
          label="Name"
          required
          variant="outlined"
        />
        <TextField
          required
          id="age"
          label="Age"
          onChange={onChangeInput}
          type="number"
          variant="outlined"
        />
        <TextField
          id="email"
          onChange={onChangeInput}
          label="Email"
          type="Email"
          variant="outlined"
          placeholder="(Optional)"
        />

        <TextField
          required
          id="contact"
          onChange={onChangeInput}
          type="tel"
          label="Contact"
          variant="outlined"
        />
        <TextField
          id="alternateContact"
          type="tel"
          onChange={onChangeInput}
          label="Alternate Contact"
          variant="outlined"
          placeholder="(Optional)"
        />
        <TextField
          required
          id="address"
          label="Address"
          onChange={onChangeInput}
          variant="outlined"
        />
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup aria-label="gender" name="gender1">
          <FormControlLabel
            value="male"
            id="male"
            onChange={onChangeInput}
            control={<Radio />}
            label="Male"
          />
          <FormControlLabel
            value="female"
            id="female"
            onChange={onChangeInput}
            control={<Radio />}
            label="Female"
          />
          <FormControlLabel
            value="other"
            id="other"
            onChange={onChangeInput}
            control={<Radio />}
            label="Other"
          />
        </RadioGroup>
        <Button variant="contained" color="primary">
          Register
        </Button>
      </form>
      <Link to="/login">Are you a doctor/nurse ? Click here</Link>
    </div>
  );
};

export default Register;
