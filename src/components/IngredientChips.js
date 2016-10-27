import React from 'react';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  noPad: {padding: "0",
          width: "auto",
          height: "auto" },
  md24: { paddingRight: "6px"},
  aligned: {
    display: "flex",
    alignItems: "center"},
  addContent: {
    color: "rgba(0, 0, 0, 0.870588)",
    fontSize:"14px",
    fontWeight: "400",
    lineHeight: "32px",
    paddingLeft: "12px",
    paddingRight: "12px",
    whiteSpace: "nowrap",
    height: "32px",
    width: "WebkitFitContent"
  },
  bottom: {bottom: "0"}
};

export default class IngredientChips extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      ingredientData: props.data,
      newIngredient: "",
      error: undefined
    };
  }

  handleRequestDelete(item){
    var tempArray = this.state.ingredientData;
    tempArray.splice(item, 1);
    this.setState({
      ingredientData: tempArray
    });
  }

  handleInput(event){
    let nextState = this.state;
    nextState.newIngredient = event.target.value;
    this.setState(nextState);
  }

  addChip(){
    if (this.props.canDelete === true){
      return(
      /*  <Chip key="new" style={styles.chip}>
          <div style={styles.aligned} className="test">Add Ingredient
            <IconButton onTouchTap={this.addIngredient} style={styles.noPad} iconStyle={styles.md24}>
              <FontIcon className='material-icons'>add_circle_outline</FontIcon>
            </IconButton>
          </div>
        </Chip>
        */
        <div className="add">
          <TextField style={styles.addContent}
                     value={this.state.newIngredient}
                  onChange={(event)=>this.handleInput(event)}
                  hintText="Add Ingredient"
                 hintStyle={styles.bottom}
                       ref={(txt)=>this.newIng=txt}
                 errorText={this.state.error}/>
               <IconButton onTouchTap={(e)=>this.addIngredient(e)} style={styles.noPad} iconStyle={styles.md24}>
              <FontIcon className='material-icons'>add_circle_outline</FontIcon>
            </IconButton>
        </div>
      )
    }
  }

  addIngredient(e){
    let newState = this.state;
    if(this.newIng.props.value === ""){
      newState.error = " ";
    } else {
      newState.ingredientData.push(this.state.newIngredient);
      newState.newIngredient = "";
      newState.error = undefined;
    }
    this.setState(newState);
  }

  render(){
    return(
      <div style={styles.wrapper}>
        {this.state.ingredientData.map( function(result, i){
          if (this.props.canDelete === true){
            return(
              <Chip key={i} onRequestDelete={()=>this.handleRequestDelete(i)} style={styles.chip}>
                {result}
              </Chip>
            )
          } else {
            return(
              <Chip key={i} style={styles.chip}>
                {result}
              </Chip>
            )
          }
        }.bind(this))}
        {this.addChip()}
      </div>
    )
  }
}
