import { useEffect, useState } from "react"
import DisplayRecipe from "./DisplayRecipe"
import SearchField from "./SearchField"


export default function Recipes(){
    const [initialRecipes,setInitialRecipes]=useState([])
    const [recipes,setRecipes]=useState([])
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
        return(<>No Recipes Found</>)
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