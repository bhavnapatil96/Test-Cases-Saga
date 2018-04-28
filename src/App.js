import React, { Component } from 'react';
import './App.css';
import {NavLink,Switch,Route,Redirect,withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Login from './component/login'
import Home from './component/home'
import Register from './component/register'
import EventList from './component/eventlist'
import Logout from './component/logout'
import React_Table from './component/react-table'

const Private=({...props})=>{
    debugger
    return localStorage.getItem('email')?<div><Route {...props}/></div>:<Redirect to="/signin"/>
}
const Public=({...props})=>{
    return !localStorage.getItem('email')|| localStorage.getItem('email')?<div><Route {...props}/></div>:<Home/>
}
export class App extends Component {
  render() {
    return (
        <div>
              <div className="App-header">
                  <div className="logo">
                      <img src={require('./logo.svg')} height="100px" width='100px'/>
                      <b className="heading">Welcome to world of React Redux Saga and testcases....</b>
                  </div>
                  <div>
                      {
                          localStorage.getItem('email')?
                          <NavLink className="link" to="/signout">Sign Out</NavLink>
                          :<NavLink className="link" to="/signin">Sign In</NavLink>
                      }
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <NavLink className="link" to="/signup">Sign Up</NavLink>
                      <NavLink className="link" to="/reacttable">React Table</NavLink>

                  </div>
              </div>
              <div>
                  <Switch>
                      <Public exact  path="/" component={Home}/>
                      <Public exact path="/reacttable" component={React_Table}/>
                      <Public exact path="/signin" component={Login}/>
                      <Public exact path="/signup" component={Register}/>
                      <Private exact path="/eventlist" component={EventList}/>
                      <Private exact path="/signout" component={Logout}/>
                  </Switch>
              </div>
        </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        state
    };
}
export default withRouter(connect(mapStateToProps,null)(App));
