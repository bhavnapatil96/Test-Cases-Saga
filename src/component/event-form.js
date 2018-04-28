import {Modal, Button} from 'react-bootstrap'
import React ,{Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

export class Event_Form extends Component{
    constructor(props){
        super(props)
        this.state={
            event:[],
            editId:''
        }
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.Edit && nextProps.Edit._id) {
            this.setState({event: nextProps.Edit, editId: nextProps.Edit._id},()=>{
                console.log("Event",this.state.event)
            })
        }
    }
    clear=()=>{
        this.setState({
            event:[]
        },()=>{console.log('clear',this.state.event)})
    }
    save=(e)=>{
        e.preventDefault();

        const {event} = this.state;

        if (this.state.editId) {

            console.log('edit Id', this.state.editId)
            let formdata = new FormData();
            formdata.append('name', event.name);
            formdata.append('date', event.date);
            formdata.append('organizer', event.organizer);
            formdata.append('location', event.location);
            formdata.append('id', this.state.editId);
            this.props.editEvent(formdata)
            this.clear()
            this.props.onClose();

        }
        else {
            let formdata = new FormData();
            formdata.append('name', event.name);
            formdata.append('date', event.date);
            formdata.append('organizer', event.organizer);
            formdata.append('location', event.location);
            this.props.addEvent(formdata)
            this.clear()
            this.props.onClose();
        }

    }
    handleChange=(e)=>{
        const {value, name} = e.target
        const {event} = this.state;
        event[name] = value
        this.setState({ event}, () => {
            console.log('state ', this.state.event)
        })
    }
    render(){
        let {event} = this.state;

        return(
            <Modal show={this.props.isActive} onHide={this.props.onClose}>
                <Modal.Header>
                    <h3>Event Management</h3>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.save} action="" method="post" encType="multipart/form-data">
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label" for="txtname">Event Name</label>
                            <div className="col-sm-10">
                                <input className="form-control" type="text"
                                       value={event && event.name}
                                       placeholder="Event Name" onChange={this.handleChange} name="name"
                                       required="true"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label" for="txtname">Date</label>
                            <div className="col-sm-10">

                                {
                                    event && event._id ? <input className="form-control" type="date"
                                                                value={event && event.date.split("T")[0]}
                                                                onChange={this.handleChange} name="date"
                                                                required="true"/> :
                                        <input className="form-control" type="date"
                                               value={event && event.date}
                                               onChange={this.handleChange} name="date" required="true"/>
                                }

                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label" for="txtname">Organizer</label>
                            <div className="col-sm-10">
                                <input className="form-control" type="text"
                                       value={event && event.organizer}
                                       placeholder="Organizer" onChange={this.handleChange} name="organizer"
                                       required="true"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label" for="txtname">Location</label>
                            <div className="col-sm-10">
                                <input className="form-control" type="text"
                                       value={event && event.location}
                                       placeholder="Location" onChange={this.handleChange} name="location"
                                       required="true"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label" for="txtname"></label>
                            <div className="col-sm-10">
                                <input type="submit" className="btn btn-success" value="Save"/>
                            </div>
                        </div>

                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.props.onClose}>Close</Button>
                </Modal.Footer>

            </Modal>
        )
    }
}
function mapStateToProps(state) {

    return {
       // newevent: state.eventReducer.eventList
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addEvent:(obj)=>{
            dispatch({type:"ADDEVENT",payload:obj})
        },
        editEvent:(obj)=>{
            dispatch({type:"EDITEVENT",payload:obj})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Event_Form);


