import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardHeader, CardActions, CardText} from 'material-ui/Card';
import IngredientChips from '../components/IngredientChips';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
const styles = {
  aligned: {
    width: "100%",
    display: "flex",
    alignItems: "center"
  },
  imageLeft: {
    flex: "0 0 auto",
    marginRight: "1em",
    marginLeft: "auto",
    padding: "0px"
  },
  imageRight: {
    flex: "1",
    marginLeft: "auto",
    marginRight: "1em",
  },
  disallowHdrEdit:{
    color: "black",
    margin: "0px",
    cursor: "pointer",
    fontSize: "18px"
  },
  allowHdrEdit:{
    fontSize: "18px",
    fontStyle: "italic"
  },
  allowCardEdit:{
    fontSize: "16px",
    fontStyle: "italic"
  },
  disallowCardEdit:{
    fontSize: "16px",
    color: "black",
    margin: "0px",
    cursor: "auto"
  },
  btnSpace: {
    color: "white",
    marginRight: "10px"
  },
  closedCardState: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  openCardState: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ccc"
  }
};

export default class RecipeCard extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      expanded: false,
      allowEdit: false,
      hdrEditStyle: styles.disallowHdrEdit,
      cardEditStyle: styles.disallowCardEdit,
      name: this.props.recipe.name,
      description: this.props.recipe.description,
      directions: this.props.recipe.procedure,
      crdHeaderState: styles.closedCardState
    };
  }

  handleEdit(rec, e){
    if (this.state.expanded===true){
      e.preventDefault();
      e.stopPropagation();
    }
    this.setState({
      allowEdit: true,
      hdrEditStyle: styles.allowHdrEdit,
      cardEditStyle: styles.allowCardEdit
    })
  }

  handleDelete(rec, e){
   if (this.state.expanded===true){
      e.preventDefault();
      e.stopPropagation();
    }
    this.props.onDelete(rec);
  }

  cancelSave(){
    this.setState({
      allowEdit: false,
      hdrEditStyle: styles.disallowHdrEdit,
      cardEditStyle: styles.disallowCardEdit
    });
  }

  saveRecipe(){
    var newRec = {
        name: this.state.name,
        description: this.state.description,
        group: this.props.recipe.group,
        img: this.props.recipe.img,
        ingredients: this.myIngredients.state.ingredientData,
        procedure: this.state.directions
      }
    this.props.onSave(newRec, this.props.recipe);
    this.setState({
      allowEdit: false,
      hdrEditStyle: styles.disallowHdrEdit,
      cardEditStyle: styles.disallowCardEdit
    });
  }


  showSaveBtn(){
    if (this.state.allowEdit === true){
      return (<div>
                <RaisedButton style={styles.btnSpace}
                              onTouchTap={()=>this.saveRecipe()}
                              primary={true}>Save</RaisedButton>
                <RaisedButton style={styles.btnSpace}
                              onTouchTap={()=>this.cancelSave()}
                              secondary={true}>Cancel</RaisedButton>
              </div>
      )
    }
  }

  handleExpandChange = (expanded) => {
    var hdrState = (expanded === true ? styles.openCardState : styles.closedCardState);
    if (expanded === false && this.state.allowEdit===true){
      this.setState({expanded: expanded,
                     allowEdit: false,
                     hdrEditStyle: styles.disallowHdrEdit,
                     cardEditStyle: styles.disallowCardEdit
                    });
    } else {
      this.setState({expanded: expanded,
                     crdHeaderState: hdrState
                    });
    }
  }

  handleTouchTap(e){
    if (this.state.allowEdit === true ){
      e.preventDefault();
      e.stopPropagation();
    }
  }

  handleChangeName = (event) => {
    this.setState({ name: event.target.value})
  }

  handleChangeDescription = (event) => {
    this.setState({ description: event.target.value})
  }

  handleChangeDirections = (event) => {
    this.setState({ directions: event.target.value})
  }

  render(){
    return(
      <Card expanded={this.state.expanded}
            onExpandChange={this.handleExpandChange}>
        <CardHeader
          style={this.state.crdHeaderState}
          actAsExpander={true}
          title={<TextField value={this.state.name}
                            disabled={!this.state.allowEdit}
                            underlineShow={this.state.allowEdit}
                            name="name"
                            inputStyle={this.state.hdrEditStyle}
                            onTouchTap={(e)=>{this.handleTouchTap(e)}}
                            onChange={this.handleChangeName}/>}
          showExpandableButton={true}
          avatar={this.props.recipe.img}
          className='cardHdr'
         >
          <CardActions style={styles.imageLeft}>
            <FlatButton label="Edit" onTouchTap={(e)=>{this.handleEdit(this.props.recipe, e)}} />
            <FlatButton label="Delete" onTouchTap={(e)=>{this.handleDelete(this.props.recipe,e)}}
            />
          </CardActions>
       </CardHeader>
       <CardText expandable={true}>
         <TextField  value={this.state.description}
                     disabled={!this.state.allowEdit}
                     underlineShow={this.state.allowEdit}
                     name="name"
                     fullWidth={true}
                     multiLine={true}
                     textareaStyle={this.state.cardEditStyle}
                     onChange={this.handleChangeDescription}/>
         <Subheader>Ingredients</Subheader>
            <IngredientChips data={this.props.recipe.ingredients}
                             canDelete={this.state.allowEdit}
                             ref={(ref) => this.myIngredients = ref}  />
         <Subheader>Preparation:</Subheader>
         {<TextField value={this.state.directions}
                     disabled={!this.state.allowEdit}
                     underlineShow={this.state.allowEdit}
                     name="name"
                     fullWidth={true}
                     multiLine={true}
                     textareaStyle={this.state.cardEditStyle}
                     onChange={this.handleChangeDirections}/>}
          {this.showSaveBtn()}
       </CardText>
      </Card>
    )
  }
}

RecipeCard.propTypes={
  recipe: React.PropTypes.object.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onSave: React.PropTypes.func.isRequired
}
