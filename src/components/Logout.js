import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom'

class Logout extends React.Component {
  //3 faze:mounting, updating, unmounting
  /*1)mounting:1.constructor,2.getderivatedstatefromprops,3.render,4.componentdidmount
    2)updating:1.getderivatedstatefromprops,2.shouldComponentUpdate(),3.render(),4.getSnapshotBeforeUpdate(),5.componentDidUpdate()
    3)unmounting:1.componentWillUnmount()
  */
  //metode
  //constructor
  constructor(props){
    super(props);
    this.state={
      kliknuto:false
    }
  }
  renderRedirect=()=>{
    if(this.state.kliknuto)
      return <Redirect to='/login' />;
  }
  btnHandler=(event)=>{
    event.preventDefault();
    document.cookie="username=";
    document.cookie="token=";
    this.setState({kliknuto:true});
  }
  render(){
    return(
      <div>
      {this.renderRedirect()}
      <button type="button" onClick={this.btnHandler} style={btnStyle}>Log out</button>
      </div>
    );
  }
  //
}
const btnStyle={
  backgroundColor: '#cccccc',
  border: 'none',
  padding: '12px 32px',
  textDecoration: 'none',
  margin: '4px 2px',
  cursor: 'pointer'
}
export default Logout;