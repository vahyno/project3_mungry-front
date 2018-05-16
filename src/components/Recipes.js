import React, { Component } from 'react';
import RecipesModel from '../models/RecipesModel';
import { Link } from 'react-router-dom';


class Recipes extends Component {
  state = {
    results: null,
  }

  componentDidMount() {
    RecipesModel.searchAll()
      .then(data =>  {
        // console.log(data)
        this.setState({
          results: data.data
        });
      });
  }

  incrementVote = (recipe_id) => {
    // console.log('recipe_id',recipe_id);
    let recipeToUpdate = this.state.results.filter(result => result._id === recipe_id);
    let updatedVotes = recipeToUpdate[0].votes + 1;
    let recipe = {...recipeToUpdate[0], votes: updatedVotes};

    // console.log('recipeToUpdate',recipeToUpdate);
    // console.log('updatedVotes',updatedVotes);
    // console.log("Recipe with updated vote" , recipe)

    RecipesModel.voteUpdate(recipe_id, recipe)
    .then(updatedRecipe => {
      // console.log('Updated Recipe: ',updatedRecipe.data);
      let updatedRecipes = this.state.results.filter(recipe => recipe._id !== recipe_id);
      let returnedRecipe = updatedRecipe.data;
      // console.log('updatedRecipes', updatedRecipes);
      // console.log('updatedRecipe.votes', updatedRecipe.votes);
      let newRecipes = updatedRecipes.concat(returnedRecipe);
      this.setState({ results: newRecipes })
    });
  }

  decrementVote = (recipe_id) => {
    let recipeToUpdate = this.state.results.filter(result => result._id === recipe_id);
    let updatedVotes = recipeToUpdate[0].votes - 1;
    let recipe = {...recipeToUpdate[0], votes: updatedVotes};

    RecipesModel.voteUpdate(recipe_id, recipe)
    .then(updatedRecipe => {
      let updatedRecipes = this.state.results.filter(recipe => recipe._id !== recipe_id);
      let returnedRecipe = updatedRecipe.data;
      let newRecipes = updatedRecipes.concat(returnedRecipe);
      this.setState({ results: newRecipes })
    });

  }



  render(){

    // console.log('State = ', this.state.results)

    let results = this.state.results !== null
      ? this.state.results
        .sort((a,b) => {
          return b.votes - a.votes;
        })
        .map(recipe => {
          // console.log("Single Recipe: ", recipe)
          return (
          <div className="col s12 m7" key={recipe._id}>
           <h4 className="header">{recipe.title}</h4>

           <div className="card horizontal">
              <div className="card-image">
               <img alt={recipe.image_url} src={recipe.image_url} />
              </div>
             <div className="card-stacked">
               <div className="card-content">

               <h5>Description</h5>
               <p className="description">{recipe.description}</p>
                 <hr />

               <div className="vote-style">
                 <h6>  Vote  </h6 >

                 <div className="vote">
                   <button onClick={()=>this.incrementVote(recipe._id)} className="btn-floating btn-small waves-effect waves-light green"><i className="material-icons">+</i></button>
                   <h6>{recipe.votes}</h6>
                   <button onClick={()=>this.decrementVote(recipe._id)} className="btn-floating btn-small waves-effect waves-light red"><i className="material-icons">-</i></button>
                 </div>
                 </div>
               </div>
               <div className="card-action">
                 <Link to ={`/recipes/${recipe._id}`} className="how-to-make">How to make</Link>
               </div>
             </div>
            </div>
          </div> )

        })
        : null;

    return (
      <div>
        {results}
      </div>
    )
  }



}

export default Recipes;
