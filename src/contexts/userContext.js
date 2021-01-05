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

  const [user, setUser] = useState(null);
  const updateUser = (user) => {
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, pc }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
