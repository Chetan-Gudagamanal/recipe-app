
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RecipeContent from './RecipeContent';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
    // width:400,
    background:'#ebde71'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500]
  },
}));

export default function DisplayRecipe({recipe}) {
  const classes = useStyles();
  const history=useHistory()

  return (
    <div className="recipeCard">
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {recipe.name[0]}
          </Avatar>
        }
        title={recipe.name}
        subheader={recipe.createdAt.split("T")[0]}
      />
      <hr/>
      <RecipeContent imageUrl={recipe.url} description={recipe.description} />
      {/* <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {recipe.description}
        </Typography>
      </CardContent> */}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={()=>{alert("This feature will be enbled very soon")}}>
          <FavoriteIcon /><span style={{fontSize:"0.5em"}}>Add to Favorites</span>
        </IconButton>
        
        <IconButton
          onClick={()=>{history.push(`/recipe/${recipe._id}`)}}
          aria-label="show more"
          variant="contained" color="primary"
        >
          <Button variant="contained" color="primary" style={{fontSize:"0.5em"}}>View more Details</Button>
        </IconButton>
      </CardActions>
    </Card>
    <br/>
    </div>
  );
}