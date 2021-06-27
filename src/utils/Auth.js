import React, { createContext, useState, useEffect } from "react";
import firebase from "./Firebase";
// import styles from "./Auth.module.css";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [pending, setPending] = useState(true);
  let sessionUserDetails = sessionStorage.getItem("userDetails");

  useEffect(() => {
    const db = firebase.firestore();
    const fetchUser = async (email) => {
      const userRef = db.collection("admins").where("email", "==", email);
      const snapshot = await userRef.get();
      const userData = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setUserDetails(userData[0]);
      console.log(userData[0]);

      setPending(false);
    };
    const checkUser = async () => {
      await firebase.auth().onAuthStateChanged((user) => {
        setCurrentUser(user);
        if (user) fetchUser(user.email);
        else setPending(false);
      });
    };
    checkUser();
  }, [currentUser]);

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
        pending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
