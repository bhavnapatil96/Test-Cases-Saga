import React,{Component} from 'react'
import '../App.css'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {push} from 'react-router-redux'
export class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            user:[],
            error:'',
            success:'',
        }
    }
    componentWillReceiveProps(next){
        debugger
        if(next.registerReducer && next.registerReducer.registerUser){
            //this.props.gotoLogin();
            this.setState({
                success:'Successfully Registration'
            })
            this.props.history.push('/signin')
        }
        else {
            this.setState({
                error:'Fail'
            })
            alert('Enable to Register...')
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
    handleFile=(e)=>{
        const {value,name}=e.target
        const {user}=this.state
        user[name]=e.target.files[0]
        this.setState({
            user
        })
    }
    save=(e)=>{
        e.preventDefault();
        const {user}=this.state
        let formdata=new FormData()
        formdata.append('fullname',user.fullname)
        formdata.append('email',user.email)
        formdata.append('password',user.password)
        formdata.append('gender',user.gender)
        formdata.append('photo',user.photo)

        this.props.registerUser(formdata);
    }
    render(){
        return(
            <div className="login">
                <br/><br/>
                <fieldset>
                    <legend>Sign Up Here</legend>
                    <form onSubmit={this.save}>
                        <table align="center">
                        <tr>
                            <td><label className="label">Fullname<span style={{"color":"red"}}>*</span></label></td>
                            <td><input  type="text" name="fullname" id="fullname" required="true" onChange={this.handleChange} className="textbox"/></td>
                        </tr>
                        <tr>
                            <td><label className="label">Email<span style={{"color":"red"}}>*</span></label></td>
                            <td><input  type="email" name="email" id="email" required="true" onChange={this.handleChange} className="textbox"/></td>
                        </tr>
                        <tr>
                            <td><label className="label">Password<span style={{"color":"red"}}>*</span></label></td>
                            <td><input type="password" name="password" id="password" required="true" onChange={this.handleChange} className="textbox"/></td>
                        </tr>
                        <tr>
                            <td><label className="label">Photo<span style={{"color":"red"}}>*</span></label></td>
                            <td><input type="file" name="photo" id="photo" required="true" onChange={this.handleFile} className="textbox"/></td>
                        </tr>
                        <tr>
                            <td><label className="label">Gender<span style={{"color":"red"}}>*</span></label></td>
                            <td>
                                <input type="radio" name="gender" id="male" required="true" value="M" onChange={this.handleChange} />Male
                                <input type="radio" name="gender" id="female" required="true" value="F" onChange={this.handleChange} />Female
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="submit" name="submit" id="submit" value="Register" className="login-btn"/></td>
                        </tr>
                    </table>
                    </form>
                </fieldset>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return{
        registerReducer:state.registerReducer
    }
}
function mapDispatchToProps(dispatch) {
    debugger
    return {

        registerUser:(data)=>{
            dispatch({type:"REGISTERUSER",payload:data})
        },
        gotoLogin:()=>push('/signin')
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Register))
