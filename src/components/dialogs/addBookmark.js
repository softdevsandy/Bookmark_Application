import React, { useContext } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddForm from "./addForm";
import { UserContext } from "../../contexts/userContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiPaper-root": {
      backgroundColor: "#2d3436",
      width: "310px",
    },
    "& .MuiDialog-paperScrollPaper": {
      paddingBottom: "15px",
    },
    "& .MuiInputBase-input": {
      color: "white",
    },

    "& .MuiFormControl-root": {
      width: "100%",
    },
    "& .MuiIconButton-root, .MuiDialogTitle-root": {
      color: theme.palette.warning.main,
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function AddBookmarkDialog() {
  const classes = useStyles();
  const { Bopen, bookmarkHandler } = useContext(UserContext);
  const [openDrop, setOpenDrop] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);
  const [error, setError] = React.useState("");

  const [imgUrl, setimgUrl] = React.useState("");
  const [input, setInput] = React.useState("");
  const [title, setTitle] = React.useState("");

  const [data, setData] = React.useState([]);
  const handleSearch = () => {
    setTitle("");
    setimgUrl("");
    setOpenForm(false);
    setOpenDrop(true);
    if (input !== "") {
      var inp = input;
      var http = input.search("https://");
      // eslint-disable-next-line eqeqeq
      if (http == "-1") {
        inp = "https://" + input;
      }
      var regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
      if (regexp.test(inp)) {
        setError("");
        var url = new URL(inp);
        var domain = url.origin;

        let imageUrl = `${domain}/favicon.ico`;

        function imageExists(url) {
          var img = new Image();
          img.onload = function () {
            setimgUrl(imageUrl);
          };
          img.onerror = function () {
            setimgUrl(`http://www.google.com/s2/favicons?domain=${domain}`);
          };
          img.src = url;
        }
        imageExists(imageUrl);
        (async () => {
          const fetchResult = await fetch(
            `https://cors-anywhere.herokuapp.com/${inp}`
          );
          const data = await fetchResult.text();
          try {
            var asd = data.split("<title")[1].split(">")[1].split("</title")[0];
            var regex = /\d+/g;
            var string = asd;
            var num = string.match(regex);
            if (num > 1) {
              var res = String.fromCharCode(num);
              var a = asd.split("&#")[0];
              var b = asd.split(";")[1];
              asd = a + res + b;
            }
            setTitle(asd);
            setOpenDrop(false);
          } catch (error) {
            setTitle("can't find");
            setOpenDrop(false);
          }
        })();
      } else {
        setOpenDrop(false);
        setError("Url is invalid!");
      }
    } else {
      setOpenDrop(false);
      setError("Plzz enter valid Url!");
    }
  };

  React.useEffect(() => {
    if (title) {
      setData({ title: title, input: input, imgUrl: imgUrl });
      setOpenForm(true);
    }
  }, [title, imgUrl, input]);

  return (
    <div>
      <Dialog
        open={Bopen}
        keepMounted
        onClose={bookmarkHandler}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        className={classes.root}
      >
        <DialogTitle id="alert-dialog-slide-title">Add Bookmark</DialogTitle>

        <DialogContent>
          <FormControl>
            <Input
              id="bookmark-field"
              type="text"
              placeholder="Enter the Domain Name"
              value={input}
              onChange={(e) => setInput(e.target.value)}
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
            {error && <span style={{ color: "red" }}>{error}</span>}
          </FormControl>

          <Backdrop className={classes.backdrop} open={openDrop}>
            <CircularProgress color="inherit" />
          </Backdrop>
          {openForm && <AddForm data={data} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
