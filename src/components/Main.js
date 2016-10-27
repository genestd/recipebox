import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Appbar from 'material-ui/Appbar';
import '../styles/main.scss';

const styles = {
  center: { textAlign: "center" }
};

export default class Main extends React.Component{

  constructor(props){
    super(props);
  }

  getChildContext(){
    return { muiTheme: getMuiTheme(baseTheme)};
  }

  render(){
    return(
      <div className="main">
        <Appbar title="Virtual Recipe Box" showMenuIconButton={false} style={styles.center}/>
        {this.props.children}
      </div>
    )
  }
}

Main.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
}
