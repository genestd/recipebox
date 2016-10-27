import React from 'react'
import { Tabs, Tab } from 'material-ui/Tabs';
import  SwipeableViews from 'react-swipeable-views';
import RecipeGroup from '../containers/RecipeGroup';
import AddRecipeModal from './AddRecipeModal';

export default class RecipeTabs extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      slideIndex: 0
    }
  };

  handleChange = (value) => {
   this.setState({
     slideIndex: value,
   });
 };


  render() {
  return (
    <div className="recipeTabs">
      <Tabs onChange={this.handleChange} value={this.state.slideIndex} >
        {this.props.categories.map( function(result, index){
          return <Tab key={result.id} label={result.description} value={index} />
        })}
      </Tabs>
      <SwipeableViews
        index={this.state.slideIndex}
        onChangeIndex={this.handleChange} >
        {this.props.categories.map( function(result, index){
          return (
            <div key={index}>
              <div className="aligned">
                <h2>
                  {result.description}
                </h2>
                <div className="icon">
                  <AddRecipeModal categories={this.props.categories}
                                  category={result.id===0 ? 1 : result.id }
                                  addFunc={this.props.addFunc}/>
                </div>

              </div>
              <RecipeGroup recipes={this.props.recipes}
                           groupNum={index}
                           showAll={result.id===0 ? true : false}
                           deleteFunc={this.props.deleteFunc}
                           saveFunc={this.props.saveFunc}
                           />
            </div>
                 )
        }.bind(this))}
      </SwipeableViews>

    </div>
   );
  }
}

RecipeTabs.propTypes = {
    categories: React.PropTypes.array.isRequired,
    recipes: React.PropTypes.array.isRequired,
    deleteFunc: React.PropTypes.func.isRequired,
    saveFunc: React.PropTypes.func.isRequired,
    addFunc: React.PropTypes.func.isRequired
}
