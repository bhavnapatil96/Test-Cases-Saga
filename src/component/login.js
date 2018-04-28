import React,{Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {push} from 'react-router-redux'
import {bindActionCreators} from 'redux'
import '../App.css'
export class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            user:{},
            error:'',
            success:''
        }
    }
    componentWillReceiveProps(next){
        debugger
        if(next.loginReducer && next.loginReducer.loginUser){
            //this.props.gotoEventlist();
            this.setState({
                success:'Successfully Login'
            })

            this.props.history.push('/eventlist')

        }
        else {
            this.setState({
                error:'Invalid email or password'
            })
            alert('Invalid email or password')
        }
    }
    handleChange=(e)=>{
        const {value,name}=e.target
        const {user}=this.state
        user[name]=value
        this.setState({
            user
        })
    }
    login=(e)=>{
        e.preventDefault();
        this.props.loginUser(this.state.user);
    }

    render(){
        return(
            <div className="login">
                <br/><br/>
                <form onSubmit={this.login}>
                    <table align="center">
                        <tr>
                            <td><label className="label">Email<span style={{"color":"red"}}>*</span></label></td>
                            <td><input  type="email" name="email" id="email" required="true" onChange={this.handleChange} className="textbox"/></td>
                        </tr>
                        <tr>
                            <td><label className="label">Password<span style={{"color":"red"}}>*</span></label></td>
                            <td><input type="password" name="password" id="password" required="true" onChange={this.handleChange} className="textbox"/></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="submit" name="submit" id="submit" value="Login" className="login-btn"/></td>
                        </tr>
                    </table>
                </form>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        loginReducer:state.loginReducer
    }
}
function mapDispatchToProps(dispatch) {
    debugger
    return {
        loginUser:(data)=>{
            dispatch({type:"LOGINUSER",payload:data})
        },
        gotoEventlist:()=> push('/eventlist')
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login))