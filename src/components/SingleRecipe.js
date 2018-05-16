import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RecipesModel from '../models/RecipesModel';


class SingleRecipe extends Component {
  state = {
    post: null,
    query: '',
  }
  componentDidMount() {
    let recipeId = this.props.match.params.recipe_id;
    RecipesModel.findRecipe(recipeId)
    .then(data => {
      // console.log('SingleRecipe by ID: ',data);
      this.setState({
        post: data.data
      });
    });
  }

  handleCommentForm = (event) => {
    let query = event.target.value;
    this.setState({
      query,
    });
    console.log(query);
  }

  onFormSubmit = (event) =>{
    let recipeId = this.props.match.params.recipe_id
    event.preventDefault();
    let content = this.state.query;
    RecipesModel.newComment(recipeId, content)
    .then(newComment=>{
      this.setState({
        post : {
          ...this.state.post,
          comments: this.state.post.comments.concat(newComment.data),
          // comments: [...this.state.post.comments, newComment.data]
        },
        query: '',
      });
    });
    console.log(this.state)
  }

  deleteComment = (comment_id) => {
    let recipeId = this.props.match.params.recipe_id;
    console.log("recipeId ",recipeId);
    console.log("comment_id ", comment_id );
    RecipesModel.commentDestroy(recipeId, comment_id)
    .then(commentUpdate=>{
      console.log(commentUpdate);
      let updatedComments = this.state.post.comments.filter(comment=>{
        return comment._id !== comment_id;
      });
      console.log(updatedComments);
      this.setState({
        post: {
          ...this.state.post, //spread do not change state except (comments)
          comments: updatedComments //comments
        }
      })
    })
  }

  handleDelete = (recipe_id) => {
    console.log("recipeId ",recipe_id);
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      if (window.confirm('Seriosly? Do you want to delete this recipe? Last warning!' )) {
        RecipesModel.recipeDestroy(recipe_id)
        .then(recipeErased=>{
          console.log(recipeErased);
          this.props.history.push('/');
        })
      }
    }
  }


  render(){
    let post = this.state.post !== null ? this.state.post : <h2>Loading...</h2>
    console.log(this.state.post)

    let eachComment = this.state.post === null ? <h2>Loading...</h2> : this.state.post.comments.map(comment =>{
      return (
        <div className="comment" key={comment._id}>
          <div className="card">
           <div className="card-body">{ comment.content }<button onClick={()=>this.deleteComment(comment._id)} className="btn-floating btn-small waves-effect waves-light red right">x</button>
          </div>
        </div>
      </div>)
    })

    return (
      <div>
        <h4 id=""> { post.title } </h4>
        <img src={ post.image_url } alt={post.title} className="singleRecipeImg"/>
        <div>
        {/*  <button className="waves-effect waves-light indigo lighten-2 btn right update-delete-btn">Update Recipe</button> */}
          <Link to ={{pathname: `/recipes/${post._id}/update`, state: {oldFormData: this.state.post}}} className="waves-effect waves-light indigo lighten-2 btn right update-btn">Update Recipe</Link>
          <button onClick={() => this.handleDelete(post._id)} className="waves-effect waves-light indigo lighten-2 btn right delete-btn">Delete Recipe</button>
        </div>
        <div className="single-post">
          <div className="ingredients-section">
            <h5>Ingredients:</h5>
            <div className="ingredients">
              <p>{post.ingredients}</p>
            </div>
          </div>
          <h5>Directions:</h5>
          <p className="instructions">{post.directions}</p>
        </div>

        <div className="row">
          <form className="col s12" onSubmit={ this.onFormSubmit }>
            <div className="row">
              <div className="input-field col s6">
                <input onInput={this.handleCommentForm}
                  value={this.state.query}
                  placeholder="Write your comment!"
                  id="comment"
                  type="text"
                  className="validate" required/>
              </div>
            </div>
              <button className="waves-effect waves-light indigo lighten-2 btn" type="submit" name="action">New Comment</button>
          </form>
        </div>
        { eachComment }
      </div>
    )
  }

}

export default SingleRecipe;
