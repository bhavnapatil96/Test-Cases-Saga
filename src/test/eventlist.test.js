import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import 'mock-local-storage'
import Enzyme,{shallow,mount,render,configure} from 'enzyme'
import {MemoryRouter} from 'react-router-dom'
import {EventList} from "../component/eventlist";

import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store'
import {ConnectedRouter,routerMiddleware} from 'react-router-redux';
import  createHistory from 'history/createBrowserHistory';
import 'jsdom-global/register';

const initialState = {};
const mockStore = configureStore();
//const history=createHistory();
Enzyme.configure({adapter:new Adapter()});
let store;
describe('Eventlist Component',()=>{
    let component,inst,eventlist;
    const props={
        history:{push:jest.fn()},
        getEventList:jest.fn(),
        deleteEvent:jest.fn(),
    }
    props.getEventList();
    let id=1;
    props.deleteEvent(id);
    beforeEach(()=>{
        store = mockStore(initialState)
        component=mount(<Provider store={store}><EventList {...props}/></Provider>);
        //component=shallow(<EventList {...props}/>);
        //console.log('Html-====',component.html())
        eventlist=component.find('EventList')
        inst=component.instance()
    })
    it('EventList component Should Render without Error',()=>{
        let expectedHtml='<div class="login"><div><select style="margin-left: 80px; height: 30px; width: 200px; border-radius: 5px;"><option value="3">3</option><option value="5">5</option><option value="15">15</option></select>&nbsp;&nbsp;&nbsp;Records per page<label style="margin-left: 80px;" class="label">Search</label><input type="text" name="search" placeholder="Search here" class="textbox"><input class="login-btn" type="button" style="float: right; margin-right: 520px;" value="Add Event"></div><br><br><table class="event-table" border="1px"><thead><th id="name">Event Name</th><th id="date">Date</th><th id="location">Location</th><th id="organizer">Organizer</th><th>Delete</th><th>Edit</th></thead><tbody></tbody></table><br><br><div class="pagination"><div class="pagination-item">&lt;&lt;</div><div class="pagination-item">&lt;</div><div class="pagination-item-active">1</div><div class="pagination-item">&gt;</div><div class="pagination-item">&gt;&gt;</div></div></div>'
        expect(component.html()).toEqual(expectedHtml)
    })
    it('should call delete event method',()=>{
        expect(props.deleteEvent).toHaveBeenCalled();
    })

})