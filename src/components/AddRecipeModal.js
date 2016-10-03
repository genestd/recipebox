import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import RecipeForm from './RecipeForm';

const toolTip = (<div>Add a recipe</div>);
const styles = {
  md24: {fontSize:"1.5em",
         textAlign: "right" }
}
/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class AddRecipeModal extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleAdd = () => {
    var ingredientArray=[];
    if (this.newRecipeData.state.ingredients != "" ){
      ingredientArray = this.newRecipeData.state.ingredients.split(/[\r?\n]+/g);
    }

    var newRec = {
        name: this.newRecipeData.state.name,
        description: this.newRecipeData.state.description,
        group: this.newRecipeData.state.group,
        img: this.newRecipeData.state.url,
        ingredients: ingredientArray,
        procedure: this.newRecipeData.state.directions
      }

    this.props.addFunc(newRec);
    this.setState({open: false});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Add"
        primary={true}
        onTouchTap={this.handleAdd}
      />,
    ];

    return (
      <div>
        <IconButton onTouchTap={this.handleOpen}
                    tooltip={toolTip}>
          <FontIcon className='material-icons'
                    style={styles.md24} >add_circle_outline</FontIcon>
        </IconButton>
        <Dialog title="Add a Recipe"
          actions={actions}
          modal={true}
          open={this.state.open}
          autoScrollBodyContent={true}
        >
          <RecipeForm ref={(ref) => this.newRecipeData = ref}
                      categories={this.props.categories}
                      category={this.props.category}/>
        </Dialog>
      </div>
    );
  }
}
