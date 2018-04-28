import React,{Component} from 'react'
import '../App.css'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {push} from 'react-router-redux'
import moment from 'moment'
import _ from 'lodash'
import Event_Form from './event-form'
export class EventList extends Component{
    constructor(props){
        super(props)
        this.state={
            eventList:[],
            orderBy:{},
            key:true,
            totalRecords:3,
            curr:1,
            isActive:false,
            edit:[]
        }
    }

    componentWillMount(){
        this.props.getEventList();
    }
    componentWillReceiveProps(next){
          this.setState({
                eventList:next.event_list.eventList
            })
    }
    search=(e)=>{
        debugger
        let {eventList}=this.state

        let search=eventList.filter((s)=>s.name.toLowerCase().toString().includes(e.target.value.toLowerCase())
                                ||s.date.includes(e.target.value)
                                ||s.organizer.toLowerCase().toString().includes(e.target.value.toLowerCase())
                                ||s.location.toLowerCase().toString().includes(e.target.value.toLowerCase()))
        if(e.target.value===''){
            this.setState({
                eventList:this.props.event_list
            })
        }
        else {
            this.setState({
                eventList: search,
            })
        }
    }
    sort=(e)=>{
        debugger
        let {eventList,key}=this.state
            let sortData;
        (e.target.id==='date')?
            sortData=_.orderBy(eventList,(o)=>moment(o[e.target.id])._d,(key)?'asc':'desc')
            :
            sortData=_.orderBy(eventList,e.target.id,(key)?'asc':'desc')

        this.setState({
            eventList:sortData,
            key:!this.state.key
        })
    }
    mypage=(no)=>{
        this.setState({
            curr:no
        })
    }
    handleEntry=(e)=>{
        this.setState({
            totalRecords:e.target.value,
            curr:1
        })
    }
    deleteEvent=(id)=>{
        let obj={
            id:id
        }
        this.props.delete_event(obj)
    }
    toggle=()=>{
        this.setState({
            isActive:true
        })
    }
    onClose=()=>{
        this.setState({
            isActive:false
        })
    }
    render(){
        const {eventList}=this.state
        debugger
        let length=eventList.length
        let totalPages=Math.ceil(length/this.state.totalRecords)
        let last=this.state.curr*this.state.totalRecords
        let first=last-this.state.totalRecords
        let totalrec=eventList.slice(first,last)
        return(
            <div className="login">
                <div>
                    <select onChange={this.handleEntry} style={{"margin-left":"80px","height":"30px","width":"200px","border-radius":"5px"}}>
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="15">15</option>
                    </select>&nbsp;&nbsp;&nbsp;Records per page
                    <label style={{"margin-left":"80px"}} className="label">Search</label><input type="text" onChange={this.search} name="search" placeholder="Search here" className="textbox"/>
                    <input className="login-btn" type="button" value="Add Event" onClick={this.toggle} style={{"float":"right","margin-right":"520px"}} />
                </div>
                <br/><br/>

                <table className="event-table" border='1px'>
                    <thead>
                        <th id="name" onClick={this.sort}>Event Name</th>
                        <th id="date" onClick={this.sort}>Date</th>
                        <th id="location" onClick={this.sort}>Location</th>
                        <th id="organizer" onClick={this.sort}>Organizer</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </thead>
                    <tbody>
                    {
                        totalrec.map((event,index)=>{
                            let dt=new Date(event.date)
                            return <tr>
                                <td>{event.name}</td>
                                <td>{dt.toLocaleDateString()}</td>
                                <td>{event.location}</td>
                                <td>{event.organizer}</td>
                                <td><button onClick={()=>{this.deleteEvent(event._id)}}>Delete</button></td>
                                <td><button onClick={()=>{
                                    this.setState({
                                        edit:event
                                    },()=>{this.toggle()})
                                }}>Edit</button></td>

                            </tr>
                        })
                    }
                    </tbody>
                </table>
                <br/><br/>
                <div className="pagination">
                    {(this.state.curr===1)?
                        <div  className="pagination-item">{'<<'}</div>
                        :<div  className="pagination-item" onClick={()=>{this.mypage(1)}}>{'<<'}</div>
                    }
                    {(this.state.curr===1)?
                        <div className="pagination-item">{'<'}</div>
                        :<div className="pagination-item" onClick={()=>{this.mypage(this.state.curr-1)}}>{'<'}</div>

                    }
                    <div className="pagination-item-active">{this.state.curr}</div>
                    {(this.state.curr===totalPages)?
                        <div className="pagination-item">{'>'}</div>
                        :<div className="pagination-item" onClick={()=>{this.mypage(this.state.curr+1)}}>{'>'}</div>
                    }
                    <div className="pagination-item" onClick={()=>{this.mypage(totalPages)}}>{'>>'}</div>


                </div>
                <Event_Form isActive={this.state.isActive} onClose={this.onClose} Edit={this.state.edit}/>
            </div>
        )
    }
}
function mapStateToProps(state) {
    debugger
    return{
        event_list:state.eventReducer
    }
}
function mapDispatchToProps(dispatch) {
    debugger
    return {
        getEventList:()=>{
            dispatch({type:"EVENTLIST"})
        },
        delete_event:(id)=> {
            dispatch({type: "DELETEEVENT", payload: id})
        }
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(EventList))
