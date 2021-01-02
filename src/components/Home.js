import React, { useContext } from "react";
import firebase from "firebase";
import { UserContext } from "../contexts/userContext";

function Home() {
  const { user, updateUser } = useContext(UserContext);

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log("Successfully signout");
        updateUser(null);
      })
      .catch(function () {
        console.log("Error signout");
      });
  };

  return (
    <div>
      Hello {user && user.displayName} <br />
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default Home;
