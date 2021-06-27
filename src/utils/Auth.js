import React, { createContext, useState, useEffect } from "react";
import firebase from "./Firebase";
// import styles from "./Auth.module.css";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState({});

  let sessionUserDetails = sessionStorage.getItem("userDetails");

  useEffect(() => {
    const db = firebase.firestore();

    const fetchUser = async (email) => {
      const userRef = db.collection("users").where("email", "==", email);
      const snapshot = await userRef.get();
      const userData = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setUserDetails(userData[0]);
      sessionStorage.setItem("userDetails", JSON.stringify(userData[0]));
    };
    const checkUser = async () => {
      await firebase.auth().onAuthStateChanged((user) => {
        setCurrentUser(user);
        if (!sessionStorage.getItem("userDetails")) {
          if (user) fetchUser(user.email);
        }
      });
    };
    checkUser();
  }, [currentUser, sessionUserDetails]);

  // if (pending) {
  //   return (
  //     <div className={styles.container}>
  //       <CircularProgress className={styles.circularProgress} />
  //     </div>
  //   );
  // }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
