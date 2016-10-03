import React from 'react';
import Chip from 'material-ui/Chip';
const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

export default class IngredientChips extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      ingredientData: props.data
    };
  }

  handleRequestDelete(item){
    var tempArray = this.state.ingredientData;
    tempArray.splice(item, 1);
    this.setState({
      ingredientData: tempArray
    });
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
      </div>
    )
  }
}
