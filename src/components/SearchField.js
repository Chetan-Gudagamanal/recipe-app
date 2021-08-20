import TextField from "@material-ui/core/TextField";
import { useState } from "react";

export default function SearchField({initialRecipes, setRecipes}){
    const [outputMsg,setOutputMsg]=useState("")
    return(
        <div className="searchField text-center">
      <label htmlFor="searchField"></label>
      <TextField
        id="standard-search"
        style={{ backgroundColor: "RGB(240, 240, 240,0.4)", width: "16rem" }}
        label="Search Recipe"
        type="search"
        onChange={(event) => {
          if (event.target.value === "") {
            setRecipes(initialRecipes);
            // console.log(initialArr);
            setOutputMsg("");
          } else {
            let filteredArr = initialRecipes.filter((rcp) => {
              return rcp.name
                .toLowerCase()
                .includes(event.target.value.toLowerCase());
            });
            setRecipes(filteredArr);
            if (filteredArr.length === 0) {
              setOutputMsg("No recipes found with this name");
            } else {
              setOutputMsg("");
            }
          }
        }}
      />
      <p id="searchMsg">{outputMsg}</p>
    </div>
    )
}