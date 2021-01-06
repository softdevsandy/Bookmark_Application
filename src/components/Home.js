import React, { useContext } from "react";
import ActionButtons from "./ActionButtons";
import MainBar from "./MainBar";
import { UserContext } from "../contexts/userContext";

function Home() {
  const { pc } = useContext(UserContext);

  return (
    <div>
      <MainBar />
      {pc && <ActionButtons />}
      {/* Cards */}
    </div>
  );
}
export default Home;
