import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import RecipeContent from "./RecipeContent";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { backend_url } from "../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    background: "#ebde71",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function SelectedRecipe() {
  const { id } = useParams();
  const [currentRecipe, setCurrentRecipe] = useState({});
  const getSelectedRecipe = async () => {
    let rawData = await fetch(`${backend_url}/recipe/${id}`, {
      method: "GET",
    });
    let jsonData = await rawData.json();
    setCurrentRecipe(jsonData);
  };
  useEffect(() => {
    getSelectedRecipe();
  }, []);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(true);

  const history = useHistory();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (!currentRecipe._id) {
    return <p>Selected Recipe details Not Found</p>;
  }
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: "auto" }}
        onClick={() => {
          history.push("/recipes");
        }}
      >{`<--Back To All Recipes`}</Button>
      <br />
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {currentRecipe.name[0]}
            </Avatar>
          }
          // action={
          //     <IconButton aria-label="settings">
          //       <MoreVertIcon />
          //     </IconButton>
          // }
          title={currentRecipe.name}
          subheader={currentRecipe.createdAt.split("T")[0]}
        />
        <hr />
        <RecipeContent
          imageUrl={currentRecipe.url}
          description={currentRecipe.description}
        />

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {currentRecipe.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={() => {
              alert("This feature will be enbled very soon");
            }}
          >
            <FavoriteIcon />
            <span style={{ fontSize: "0.5em" }}>Add to Favorites</span>
          </IconButton>
          {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
            {!expanded ? (
              <span style={{ fontSize: "0.5em" }}>Show procedure</span>
            ) : (
              ""
            )}
          </IconButton>
        </CardActions>
        <hr />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>{currentRecipe.details}</Typography>
            {/* <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
            and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
            pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography> */}
          </CardContent>
        </Collapse>
      </Card>
      <br />
    </>
  );
}
