import React, { useState, createContext } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [pc, setPc] = useState(true);
  const w = window.matchMedia("(max-width: 600px)");
  const width = (w) => {
    if (w.matches) {
      setPc(false);
    } else {
      setPc(true);
    }
  };
  w.addListener(width);
  React.useEffect(() => {
    width(w);
  }, []);

  const [Bopen, setBopen] = useState(false);
  const [Copen, setCopen] = useState(false);
  const bookmarkHandler = () => {
    setBopen(!Bopen);
  };
  const categoryHandler = () => {
    setCopen(!Copen);
  };

  // ....

  const [user, setUser] = useState(null);
  const updateUser = (user) => {
    setUser(user);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        pc,
        Bopen,
        Copen,
        bookmarkHandler,
        categoryHandler,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
