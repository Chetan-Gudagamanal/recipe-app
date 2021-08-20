
import './App.css';
import { Switch, Route, Link } from "react-router-dom";
import NavBar from './components/NavBar';
import Recipes from "./components/Recipes";
import AddRecipe from './components/AddRecipe';
import SelectedRecipe from './components/SelectedRecipe';
import Home from './components/Home';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar/>
        <hr style={{width:"100%"}} />
        
        <p id="page-title">Veg Cuisine's Kitchen</p>
      </header>
      <section className="App-body">
        <Switch>
          <Route path="/recipe/:id">
            <SelectedRecipe/>
          </Route>
          <Route path="/recipes">
            <Recipes/>
          </Route>
          <Route path="/add_recipe">
            <AddRecipe />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </section>
      {/* footer section */}
      <footer className="App-footer">
        <p>Disclamer</p>
        <p>All Recipes available in this website are uploded from users around the world. We do not hold hold any responsibility over extent of accuracy of the content. </p>
      </footer>
    </div>
  );
}

export default App;
