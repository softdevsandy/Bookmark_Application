import React, { useContext } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";
import AddForm from "./addForm";
import { UserContext } from "../../contexts/userContext";
// import SimpleBackdrop from "./Backdrop";

export default function AddBookmarkDialog() {
  const { Bopen, bookmarkHandler } = useContext(UserContext);
  const [openDrop, setOpenDrop] = React.useState(false);
  const handleSearch = () => {
    setOpenDrop(!openDrop);
  };

  return (
    <div>
      <Dialog
        open={Bopen}
        keepMounted
        onClose={bookmarkHandler}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" style={{ color: "#436BD9" }}>
          Add Bookmark
        </DialogTitle>

        <DialogContent>
          <FormControl>
            <Input
              id="bookmark-field"
              type="text"
              placeholder="Enter the Domain Name"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="bookmark"
                    edge="end"
                    onClick={handleSearch}
                  >
                    <SearchIcon className="actionIcon" />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          {/* <SimpleBackdrop openDrop={openDrop} /> */}
          <AddForm />
          {/* .... */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
