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

  const [bookmarks, setData] = React.useState(null);
  const [categoryList, setCategoryList] = React.useState([
    "python",
    "javascript",
    "C++",
  ]);

  const updateCategories = (value) => {
    console.log(value);
    setCategoryList([value, ...categoryList]);
  };

  const getData = async () => {
    await fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  };

  React.useEffect(() => {
    getData();
  }, []);

  const [Bopen, setBopen] = useState(false);
  const [Copen, setCopen] = useState(false);
  const bookmarkHandler = () => {
    setBopen(!Bopen);
  };
  const categoryHandler = () => {
    setCopen(!Copen);
  };

  // ...

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
