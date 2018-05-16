import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Recipes from './components/Recipes';
import NewRecipe from './components/NewRecipe';
import SingleRecipe from './components/SingleRecipe';
import UpdateRecipe from './components/UpdateRecipe';




import './App.css';

class App extends Component {
  render() {
    return (

      <div className="App ">
        <nav>

        <div className="dropdown">
          <button className="dropbtn"><div className="hamburger"><i className="fas fa-bars"></i></div></button>
          <div id="myDropdown" className="dropdown-content">
              <li><Link to ="/" >Home</Link></li>
              <li><Link to ="/recipes/new" >Create Recipe</Link></li>
          </div>
      </div>
            <div className="nav-wrapper deep-purple lighten-2">
              <p className="brand-logo">Hungry Mungry's Recipe Book</p>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to ="/" >Home</Link></li>
                <li><Link to ="/recipes/new" >Create Recipe</Link></li>
              </ul>
            </div>
        </nav>





        <Switch>
          <Route path="/" exact component={Recipes} />
          <Route path="/recipes/new" exact component={NewRecipe} />
          <Route path="/recipes/:recipe_id/update" exact component={UpdateRecipe} />
          <Route path="/recipes/:recipe_id" exact component={SingleRecipe} />
        </Switch>

        <footer>
          <div className="footer-copyright">
              <div className="container">
              © 2018 Made by Emma & Michal
              </div>
          </div>
        </footer>

      </div>
    );
  }
}

export default App;
