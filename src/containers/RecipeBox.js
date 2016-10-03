import React from 'react';
import Paper from 'material-ui/Paper';
import RecipeTabs from '../components/RecipeTabs';
import starter_recipes from '../utils/recipes.js';
import Snackbar from 'material-ui/Snackbar';

export default class RecipeBox extends React.Component{

  constructor(props){
    super(props);
    var recipes = [];
    var storage = false;

    if (this.storageAvailable('localStorage')){
      storage = true;
      var tempArray = localStorage.getItem('stored_recipes');
      if (tempArray === null || tempArray.length === 0 ){
        recipes = starter_recipes;
      } else {
        recipes = JSON.parse(tempArray);
        console.log("parsed", recipes);
      }
    } else {
      recipes = starter_recipes;
    }

    this.state = {
      recipes: recipes,
      deletedRec: {},
       sbOpen: false,
       sbMessage: "Recipe Deleted",
       sbAutoHideDuration: 4000,
       storage: storage
    };
  }

  componentDidUpdate(){
    if( this.state.storage ){
      localStorage.setItem('stored_recipes', JSON.stringify(this.state.recipes));
    }
  }

  render(){
    return(
      <div className="recipeBox">
        <Paper>
          <RecipeTabs categories={this.props.categories}
                      recipes={this.state.recipes}
                      deleteFunc={this.deleteRecipe.bind(this)}
                      saveFunc={this.saveRecipe.bind(this)}
                      addFunc={this.addRecipe.bind(this)}/>
        </Paper>
        <Snackbar open={this.state.sbOpen}
               message={this.state.sbMessage}
                action="Undo"
      autoHideDuration={this.state.sbAutoHideDuration}
      onActionTouchTap={this.handleActionTouchTap.bind(this)}
        onRequestClose={this.handleRequestClose} />
      </div>
    )
  }

  deleteRecipe(rec){
    var tempArray = this.state.recipes;
    for(var i=0; i<tempArray.length; i++){
      if( tempArray[i] === rec){
        tempArray.splice(i, 1);
      }
    }
    this.setState({
      recipes: tempArray,
      deletedRec: rec,
      sbOpen: true
    });
  }

  addRecipe(rec){
    if (rec.img === "" ){
      for( var i=0; i<this.props.categories.length; i++){
        if (this.props.categories[i].id === rec.group ){
          rec.img = this.props.categories[i].url
        }
      }
    }
    var tempArray = this.state.recipes;
    tempArray.push(rec);
    this.setState({
      recipes: tempArray
    })
  }

  saveRecipe(newRec, oldRec){
    var tempArray = this.state.recipes;
    for( var i=0; i<tempArray.length; i++){
      if( oldRec === tempArray[i]){
        tempArray.splice(i, 1, newRec);
        this.setState({
          recipes: tempArray
        })
      }
    }

  }

  handleActionTouchTap = () => {
    var tempArray = this.state.recipes;
    tempArray.push( this.state.deletedRec );

    this.setState({
    deletedRec: {},
    recipes: tempArray,
      sbOpen: false,
    });
  }

  handleRequestClose = () => {
    this.setState({
      sbOpen: false,
    });
  }

  storageAvailable(type) {
  	try {
	  	var storage = window[type],
		  	x = '__storage_test__';
  		storage.setItem(x, x);
	  	storage.removeItem(x);
		  return true;
  	}
	  catch(e) {
		  return false;
	  }
   }
}


RecipeBox.defaultProps = {
      categories: [
                    { id: 0, url: "", description: "All" },
                    { id: 1, url: "/icons/mains.png", description: "Main Dishes" },
                    { id: 2, url: "/icons/soups.png", description: "Soups"},
                    { id: 3, url: "/icons/salads.png", description: "Salads" },
                    { id: 4, url: "/icons/sides.png", description: "Sides" },
                    { id: 5, url: "/icons/desserts.png", description: "Desserts"}
                  ]
}
