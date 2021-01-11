import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "./Card";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../contexts/userContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "3px 5px",
  },
}));

export default function AutoGrid() {
  const classes = useStyles();
  const { bookmarks, categoryList } = useContext(UserContext);
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    let i, j;
    let list1 = [];
    // let list2 = [];

    if (bookmarks) {
      for (i = 0; i < categoryList.length; i++) {
        for (j = 0; j < bookmarks.length; j++) {
          if (categoryList[i] === bookmarks[j].category) {
            list1.push(bookmarks[j]);
          }
        }
        // console.log(list1);
        if (list1.length !== 0) {
          const newData = {
            id: uuidv4(),
            category: categoryList[i],
            bookmarks: list1,
          };
          // list2.push(newData);
          setCategories((categories) => [...categories, newData]);
          list1 = [];
          // list2 = [];
        }
      }
    }
  }, [bookmarks]);

  // console.log(categories);

  return (
    <div className={classes.root}>
      <Grid container>
        {categories &&
          categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={category.category}>
              <Box category={category} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
