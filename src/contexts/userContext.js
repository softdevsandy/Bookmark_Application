import React, { useState, createContext } from "react";
import { db } from "../firebase";

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

  const [bookmarks, setData] = React.useState([]);
  const [categoryList, setCategoryList] = React.useState(["My Bookmarks"]);

  const updateCategories = (value) => {
    setCategoryList([value, ...categoryList]);
  };

  const updateBookmarks = (data) => {
    setData([data, ...bookmarks]);
  };

  const [stateSnack, setstateSnack] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    msg: "",
  });
  const [Bopen, setBopen] = useState(false);
  const [Copen, setCopen] = useState(false);
  const bookmarkHandler = () => {
    setBopen(!Bopen);
  };
  const categoryHandler = () => {
    setCopen(!Copen);
  };
  const handleClose = () => {
    setstateSnack({ ...stateSnack, open: false });
  };

  const handlerOpen = (msg) => {
    setstateSnack({ open: true, vertical: "top", horizontal: "center", msg });
  };
  // ...

  React.useEffect(() => {
    db.collection("data").onSnapshot((bookmark) => {
      // const items = [];
      // bookmark.forEach((doc) => {
      //   items.push(doc.data());
      // });
      console.log(bookmark.docs);
    });
  }, []);

  const [user, setUser] = useState(null);
  const updateUser = (user) => {
    setUser(user);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        bookmarks,
        categoryList,
        updateCategories,
        updateBookmarks,
        updateUser,
        Bopen,
        Copen,
        stateSnack,
        handleClose,
        handlerOpen,
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
