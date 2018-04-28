import React from 'react'
import {Login} from '../component/login'
import Enzyme ,{shallow,render,mount} from 'enzyme'
import Adapater from 'enzyme-adapter-react-16'
import {MemoryRouter} from 'react-router-dom'
import 'mock-local-storage'
import renderer from 'react-test-renderer';

Enzyme.configure({adapter:new Adapater()});
// const props={
//     history:{
//         push:jest.fn()
//     }
// }
describe('Login Component',()=>{
    let component,inst;
    const props={
        history:{
            push:jest.fn(),
            login:jest.fn(),
            handleChange:jest.fn(),
            componentWillReceiveProps:jest.fn()
        }
    }

    props.history.login()
    let e={
        target:{
            name:"email",
            value:"geet@gmail.com"
        }
    }
    props.history.handleChange(e)
    let nextprops={
        loginReducer:{
            loginUser:'admin@gmail.com'
        }
    }
    // let nextprops={
    //     loginReducer:{
    //         loginUser:'Fail'
    //     }
    // }
    props.history.componentWillReceiveProps(nextprops);
    beforeEach(()=>{
        component=shallow(<Login {...props}/>);
        inst=component.instance()
    })
    it('Login component should render withot error',()=>{
        const expectedhtml='<div class="login"><br/><br/><form><table align="center"><tr><td><label class="label">Email<span style="color:red">*</span></label></td><td><input type="email" name="email" id="email" required="" class="textbox"/></td></tr><tr><td><label class="label">Password<span style="color:red">*</span></label></td><td><input type="password" name="password" id="password" required="" class="textbox"/></td></tr><tr><td></td><td><input type="submit" name="submit" id="submit" value="Login" class="login-btn"/></td></tr></table></form></div>';
        expect(component.html()).toEqual(expectedhtml);
    })
    it('renders email input',()=>{
        expect(shallow(<Login/>).find("#email").length).toEqual(1)
    })
    it('renders password input',()=>{
        expect(shallow(<Login/>).find("#password").length).toEqual(1)
    })
    it('should render Login',()=>{
        const loginButton=component.find('.login-btn');
        expect(loginButton).toHaveLength(1)

        loginButton.simulate('click')

        inst.setState({ user: {email: "geet@gmail.com", password: "geet"},error:'Invalid email or password',success:'Successfully Login'});

        expect(inst.state.user.email).toEqual('geet@gmail.com');
        expect(inst.state.user.password).toEqual('geet');
        expect(inst.state.user.password.length).toEqual(4);
        expect(inst.state.success).toEqual('Successfully Login')
        expect(inst.state.error).toEqual("Invalid email or password");
        //expect(props.history.push).toHaveBeenCalledWith('/eventlist');
    })
    it('should call login function',()=>{
        expect(props.history.login).toHaveBeenCalled();
    })
    it('should call handlechange',()=>{
        expect(props.history.handleChange).toHaveBeenCalled()
    })
    it('should call componentWillReceiveProps',()=>{
        expect(props.history.componentWillReceiveProps).toHaveBeenCalled()
        //expect(props.history.push).toHaveBeenCalledWith('/eventlist');
    })
})

