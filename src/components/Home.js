import React, { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import MainBar from "./AppBar";
import ActionButtons from "./ActionButtons";
import Cards from "./Cards";
import AddBookmarkDialog from "./dialogs/addBookmark";
import AddCategoryDialog from "./dialogs/addCategory";

export default function Home() {
  const { Bopen, Copen } = useContext(UserContext);

  return (
    <>
      <MainBar />
      <ActionButtons />
      <Cards />
      {Bopen && <AddBookmarkDialog />}
      {Copen && <AddCategoryDialog />}
    </>
  );
}
