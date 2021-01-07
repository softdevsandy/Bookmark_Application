import React, { useState, createContext } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const colors = [
    {
      themeName: "Gray & Soft blue",
      appColor: "#2d3436",
      cardColor: "#436BD9",
      backGround: "#3C3E3F",
    },
    {
      themeName: "Gray & Vivid blue",
      appColor: "#485b63",
      cardColor: "#09adee",
      backGround: "#68848f",
    },
  ];

  const [Theme, setTheme] = React.useState(colors[0]);

  const changeTheme = (theme) => {
    setTheme(theme);
  };

  const [Bopen, setBopen] = useState(false);
  const [Copen, setCopen] = useState(false);
  const bookmarkHandler = () => {
    setBopen(!Bopen);
  };
  const categoryHandler = () => {
    setCopen(!Copen);
  };

  // ....
  const bookmarks = [
    {
      title: "Google ",
      url: "https://google.com",
      img: "https://www.google.com/favicon.ico",
    },
    {
      title: "Material-ui",
      url: "https://material-ui.com",
      img: "https://material-ui.com/static/icons/180x180.png",
    },
    {
      title: "SoftDevSandy",
      url: "https://softdevsandy.me",
      img: "https://softdevsandy.me/favicon.ico",
    },
  ];

  const [user, setUser] = useState(null);
  const updateUser = (user) => {
    setUser(user);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        bookmarks,
        updateUser,
        Bopen,
        Copen,
        bookmarkHandler,
        categoryHandler,
        colors,
        Theme,
        changeTheme,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
