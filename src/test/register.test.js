import React from 'react'
import {Register} from '../component/register'
import Enzyme ,{shallow,render,mount} from 'enzyme'
import Adapater from 'enzyme-adapter-react-16'
import {MemoryRouter} from 'react-router-dom'
import 'mock-local-storage'
import renderer from 'react-test-renderer';

Enzyme.configure({adapter:new Adapater()});
const props={
    history:{push:jest.fn()}
}
describe('Register Component',()=>{
    let component,inst;
    beforeEach(()=>{
        component=shallow(<Register {...props}/>)
        inst=component.instance()
    })
    it('Login component should render withod error',()=>{
        const expectedhtml='<div class="login"><br/><br/><fieldset><legend>Sign Up Here</legend><form><table align="center"><tr><td><label class="label">Fullname<span style="color:red">*</span></label></td><td><input type="text" name="fullname" id="fullname" required="" class="textbox"/></td></tr><tr><td><label class="label">Email<span style="color:red">*</span></label></td><td><input type="email" name="email" id="email" required="" class="textbox"/></td></tr><tr><td><label class="label">Password<span style="color:red">*</span></label></td><td><input type="password" name="password" id="password" required="" class="textbox"/></td></tr><tr><td><label class="label">Photo<span style="color:red">*</span></label></td><td><input type="file" name="photo" id="photo" required="" class="textbox"/></td></tr><tr><td><label class="label">Gender<span style="color:red">*</span></label></td><td><input type="radio" name="gender" id="male" required="" value="M"/>Male<input type="radio" name="gender" id="female" required="" value="F"/>Female</td></tr><tr><td></td><td><input type="submit" name="submit" id="submit" value="Register" class="login-btn"/></td></tr></table></form></fieldset></div>';
        //console.log("my", component.html());
        expect(component.html()).toEqual(expectedhtml);
    })
    it('renders email input',()=>{
        expect(shallow(<Register/>).find("#email").length).toEqual(1)
    })
    it('renders password input',()=>{
        expect(shallow(<Register/>).find("#password").length).toEqual(1)
    })
    it('renders fullname input',()=>{
        expect(shallow(<Register/>).find("#fullname").length).toEqual(1)
    })
    it('renders photo input',()=>{
        expect(shallow(<Register/>).find("#photo").length).toEqual(1)
    })
    it('should render Register',()=>{
        const registerButton=component.find('.login-btn');
        expect(registerButton).toHaveLength(1)

        registerButton.simulate('click')

        inst.setState({ user: {fullname:"geet",email: "geet@gmail.com", password: "geet12"},error:'Fail',success:'Successfully Registration'});

        expect(inst.state.user.fullname).toEqual('geet');
        expect(inst.state.user.email).toEqual('geet@gmail.com');
        expect(inst.state.user.password).toEqual('geet12');
        expect(inst.state.user.password.length).toEqual(6);
        expect(inst.state.success).toEqual('Successfully Registration')
        expect(inst.state.error).toEqual("Fail");
        //expect(props.history.push).toHaveBeenCalledWith('/signin')
    })


})

