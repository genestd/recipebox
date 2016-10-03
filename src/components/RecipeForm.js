import React from 'react';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
const styles = {
  fl: {
    flex: "0 0 auto"
  },
  fr: {
    float: "right"
  }
};

export default class RecipeForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      name: "",
      group: this.props.category,
      description: "",
      ingredients: "",
      url: "",
      directions: ""
    };
  }

  handleGroupChange = (event, index, value) =>{
    this.setState({
      group:index
    });
  }

  handleNameChange = (event) =>{
    this.setState({
      name: event.target.value
    });
  }

  handleDescChange = (event) =>{
    this.setState({
      description: event.target.value
    })
  }

  handleIngredientChange = (event) =>{
    this.setState({
      ingredients: event.target.value
    })
  }

  handleUrlChange = (event) =>{
    this.setState({
      url: event.target.value
    })
  }

  handleDirectionChange = (event) =>{
    this.setState({
      directions: event.target.value
    })

  }


  render(){
    return (
      <div className="recipeForm">
        <div className="row1">
        <TextField name="name"
               hintText="Recipe Name"
              errorText="*Required"
                  style={styles.fl}
                  onChange={this.handleNameChange}/>
        <DropDownMenu value={this.state.group} onChange={this.handleGroupChange} style={styles.fl} >
          {this.props.categories.map( function(result, myIndex){
            var dsbld = (myIndex===0 ? true : false );
            return (
              <MenuItem value={result.id}
                  primaryText={result.description}
                          key={myIndex}
                        label=""
                     disabled={dsbld}/>
              )
          })}
        </DropDownMenu>
      </div>
      <br/>
      <br/>
      <div className="row1">
      <TextField name="description"
                 value={this.state.description}
                 hintText="Recipe Description"
                 multiLine={true}
                 style={styles.fl}
                 onChange={this.handleDescChange}
                 />
      <TextField name="ingredients"
                 value={this.state.ingredients}
                 hintText="Type each ingredient on a separate line"
                 multiLine={true}
                 style={styles.fl}
                 onChange={this.handleIngredientChange}/>
      </div>
      <br/>
      <br/>
      <TextField name="Image URL"
                 value={this.state.url}
                 hintText="Link to Image"
                 onChange={this.handleUrlChange}/>
      <br/>
      <br/>
      <TextField name="directions"
                 value={this.state.directions}
                 hintText="Cooking Instructions"
                 multiLine={true}
                 onChange={this.handleDirectionChange} />

      </div>
    )
  }
}

RecipeForm.propTypes = {
  categories: React.PropTypes.array.isRequired,
  category: React.PropTypes.number.isRequired
}
