import axios from 'axios';

class RecipesModel {
  static searchAll = () => {
    const request = axios.get(`http://localhost:8080/api/recipes/`);
    return request;
  }

  static createNew = (data) => {
    // console.log("axios createdata",data);
    const request = axios.post(`http://localhost:8080/api/recipes/`, data);
    return request;
  }

  static findRecipe = (recipe_id) => {
    const request = axios.get(`http://localhost:8080/api/recipes/${recipe_id}`);
    return request;
  }

  static newComment = (recipe_id, content) => {
    // console.log('Axios recipe_id', recipe_id, 'Axios content', content)
    const request = axios.post(`http://localhost:8080/api/recipes/${recipe_id}/comments`, {content: content});
    return request;
  }

  static commentDestroy = (recipe_id, comment_id) => {
    const request = axios.delete(`http://localhost:8080/api/recipes/${recipe_id}/comments/${comment_id}`);
    return request;
  }

  static voteUpdate = (recipe_id, recipe) => {
    // console.log('Axios recipe_id: ', recipe_id,'Axios recipe: ' ,recipe)
    const request = axios.put(`http://localhost:8080/api/recipes/${recipe_id}`, recipe);
    return request;
  }

  static recipeDestroy = (recipe_id) => {
    console.log('Axios recipe_id: ', recipe_id)
    const request = axios.delete(`http://localhost:8080/api/recipes/${recipe_id}`);
    return request;
  }

  static recipeUpdate = (recipe_id, recipe) => {
    console.log('Axios recipe_id: ', recipe_id,'Axios recipe: ',recipe)
    const request = axios.put(`http://localhost:8080/api/recipes/${recipe_id}`, recipe);
    return request;
  }
}

export default RecipesModel;
