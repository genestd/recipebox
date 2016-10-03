import React from 'react';
import RecipeCard from '../components/RecipeCard';

export default class RecipeGroup extends React.Component{

  constructor(props){
    super(props);

  }

  render(){
    return(
       <div className="recipeGroup">
         {this.props.recipes.map( function( result, index ){
           if (result.group === this.props.groupNum || this.props.showAll === true){
             return ( <RecipeCard key={result.name + index}
                                  recipe={result}
                                  onDelete={this.props.deleteFunc}
                                  onSave={this.props.saveFunc}/>)
           }
         }.bind(this))}
       </div>
    )
  }
}

RecipeGroup.propTypes = {
  recipes: React.PropTypes.array.isRequired,
  groupNum: React.PropTypes.number.isRequired,
  showAll: React.PropTypes.bool.isRequired,
  deleteFunc: React.PropTypes.func.isRequired,
}
