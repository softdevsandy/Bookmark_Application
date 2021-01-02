import React, { useContext } from "react";
import firebase from "firebase";
import { auth } from "../firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { UserContext } from "../contexts/userContext";

import { makeStyles } from "@material-ui/core";

var uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: async (authResult) => {
      const userInfo = authResult.additionalUserInfo;
      if (userInfo.isNewUser && userInfo.providerId === "password") {
        try {
          await authResult.user.sendEmailVerification();
          console.log("Check your email");
        } catch (e) {
          console.log(e);
        }
      }
      return false;
    },
  },
};

const useStyles = makeStyles((theme) => ({
  signUp: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background:
      'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url("https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260")',
    backgroundSize: "cover",
    fontSize: "25px",
  },
  welcomeText: {
    maxWidth: "500px",
  },
}));

function Signup() {
  const { updateUser } = useContext(UserContext);
  const classes = useStyles();

  React.useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      // console.log(db);
      // console.log(authUser);
      if (authUser) {
        updateUser(authUser);
      }
    });
  });

  return (
    <div className={classes.signUp}>
      <div className={classes.welcomeText}>
        Keep your Important Links in one place and Open anywhere.
      </div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

export default Signup;
