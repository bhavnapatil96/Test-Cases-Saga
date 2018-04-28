import React from 'react'
import Enzyme,{shallow,mount,render,configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {MemoryRouter} from 'react-router-dom'
import renderer from 'react-test-renderer'
import 'mock-local-storage'

import {Home} from '../component/home'
Enzyme.configure({adapter:new Adapter()})
const props={
    history:{push:jest.fn()}
}
describe("Home Component",()=>{
    let component,inst;
    beforeEach(()=>{
        component=shallow(<Home {...props}/>);
        inst=component.instance()
    })
    it('home component will render without error',()=>{
        //console.log("Html", component.html());
        let expectedHTML='<div><img id="imghome" src="https://az616578.vo.msecnd.net/files/2016/12/02/6361625181301020551161989821_keep-calm-and-study-for-exams-30.png" width="1600px" height="600px" align="center"/></div>'
        expect(component.html()).toEqual(expectedHTML);
    })
    it('It have Img Element',()=>{
        expect(shallow(<Home/>).find('#imghome').length).toEqual(1)
    })
})