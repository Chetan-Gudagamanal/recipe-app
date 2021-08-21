import { useEffect, useState } from "react"
import DisplayRecipe from "./DisplayRecipe"
import SearchField from "./SearchField"
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function Recipes(){
    const [initialRecipes,setInitialRecipes]=useState([])
    const [recipes,setRecipes]=useState([])

    const classes = useStyles();

    const getRecipes=async()=>{
        
        const rawData=await fetch("https://recipe-app-backend-api.herokuapp.com/recipes",{
            method:"GET"
        })
        const jsonData=await rawData.json()
        setRecipes(jsonData)
        setInitialRecipes(jsonData)
    }

    useEffect(()=>{
        getRecipes()
    },[])

    if(!recipes.length){
        return (
            <div className={classes.root}>
            <CircularProgress />
            </div>
        );
    }
    return(
        <>
        <br/>
        <SearchField initialRecipes={initialRecipes} setRecipes={setRecipes} />
        <br/>
        <div className="recipeList">
        {recipes.map(recipe=>{
            return(
                <div key={recipe._id.toString()}>
                    <DisplayRecipe recipe={recipe}/>
                </div>
            )
        })}
        </div>
        </>
    )
}