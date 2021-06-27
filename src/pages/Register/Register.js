import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.scss";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Firebase from "../../utils/Firebase";
import QRCode from "qrcode.react";

const Register = () => {
  const [QRCodeValue, setQRCodeValue] = useState("");
  const [isQRCodeRequested, setIsQRCodeRequested] = useState(false);
  const [state, setState] = useState({
    name: "",
    age: "",
    email: "",
    contact: "",
    address: "",
    gender: "",
    reasonForAdmission: "",
  });
  async function onRegister(e) {
    e.preventDefault();
    const db = Firebase.firestore();
    const collectionRef = db.collection("patients");
    const uid = await collectionRef.doc().id;
    setIsQRCodeRequested(true);
    setQRCodeValue(state.email + "-" + uid);
  }
  function onChangeInput(e) {
    if (e.target.type === "radio") {
      setState((prev) => ({ ...prev, gender: e.target.value }));
    } else {
      const { id, value } = e.target;
      setState((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
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
      <div className="formContainer">
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
            required
            onChange={onChangeInput}
            label="Email"
            type="Email"
            variant="outlined"
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
          <div className={styles.genderContainer}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup aria-label="gender" name="gender1">
              <FormControlLabel
                value="male"
                id="gender"
                onChange={onChangeInput}
                control={<Radio />}
                label="Male"
              />
              <FormControlLabel
                value="female"
                id="gender"
                onChange={onChangeInput}
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="other"
                id="gender"
                onChange={onChangeInput}
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </div>
          <TextField
            id="reason"
            onChange={onChangeInput}
            label="Reason For Admission"
            required
            variant="outlined"
          />
        </form>
        <Button onClick={onRegister} variant="contained" color="primary">
          Register
        </Button>
        <br />
        <Link to="/login">Are you a doctor/nurse ? Click here</Link>{" "}
      </div>

      <div className={styles.QRCodeContainer}>
        <div className="QRCode">
          {isQRCodeRequested ? (
            <QRCode value={QRCodeValue} />
          ) : (
            <h3>Your Qr Code will be displayed here</h3>
          )}
        </div>

        <Button
          onClick={() => Firebase.auth().signOut()}
          variant="contained"
          color="primary"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Register;
