import {takeLatest,takeEvery,put,call} from 'redux-saga/effects'

const axios=require('axios')
export function* loginuser(action) {
    debugger
    try {
        let loginuser = yield axios.post('http://localhost:5000/api/users/loginp',action.payload);
        localStorage.setItem('email',loginuser.data.email)
        localStorage.setItem('token',loginuser.headers["x-auth"])
        localStorage.setItem('userId',loginuser.data._id)
        yield put({type: "LOGIN_USER", payload: loginuser.data.email})
    }catch (e){
        alert('Invalid Email or Password')
    }
}
function* registeruser(action) {
    debugger
    try {
        let user = yield axios.post('http://localhost:5000/api/users/add',action.payload);
        yield put({type: "REGISTER_USER", payload:(user.data.email)?'Success':'Fail'})
    }catch (e){
        alert(e)
    }
}
function* getEventList() {
    debugger
    try {
        const api={
            method:"get",
            url:"http://localhost:5000/api/events/list",
            headers:{
                "x-auth":localStorage.getItem('token')
            }
        }
        let event = yield axios(api);
        yield put({type: "EVENT_LIST", payload:event.data})
    }catch (e){
        alert(e)
    }
}
function* deleteEvent (action) {
    debugger
    try{
        const api={
            method:"delete",
            url:"http://localhost:5000/api/events/delete",
            data:action.payload,
            headers:{
                "x-auth":localStorage.getItem('token')
            }
        }
        let event=yield axios(api)
        yield put({type:"EVENT_DELETE",payload:event})
    }catch (e){
        alert(e)
    }
}
function* addEvent (action) {
    debugger
    try{
        const api={
            method:"post",
            url:"http://localhost:5000/api/events/add",
            data:action.payload,
            headers:{
                "x-auth":localStorage.getItem('token')
            }
        }
        let event=yield axios(api)
        yield put({type:"ADD_EVENT",payload:event})
    }catch (e){
        alert(e)
    }
}function* editEvent (action) {
    debugger
    try{
        const api={
            method:"post",
            url:"http://localhost:5000/api/events/update",
            data:action.payload,
            headers:{
                "x-auth":localStorage.getItem('token')
            }
        }
        let event=yield axios(api)
        yield put({type:"EDIT_EVENT",payload:event})
    }catch (e){
        alert(e)
    }
}

function* mysaga () {
    yield takeEvery("LOGINUSER",loginuser)
    yield takeEvery("REGISTERUSER",registeruser)
    yield takeEvery("EVENTLIST",getEventList)
    yield takeEvery("DELETEEVENT",deleteEvent)
    yield takeEvery("ADDEVENT",addEvent)
    yield takeEvery("EDITEVENT",editEvent)
}
export default mysaga;