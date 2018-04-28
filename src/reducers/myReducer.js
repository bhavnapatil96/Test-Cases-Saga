import _ from 'lodash'
export const loginReducer=(state=[],action)=>{
    switch (action.type){
        case "LOGIN_USER":
            return {...state,loginUser:_.cloneDeep(action.payload)}
        default:
            return state
    }
    return state
}
export const registerReducer=(state=[],action)=>{
    switch (action.type){
        case "REGISTER_USER":
            return {...state,registerUser:_.cloneDeep(action.payload)}
        default:
            return state
    }
    return state
}
export const eventReducer=(state=[],action)=>{
    switch (action.type){
        case "EVENT_LIST":
            return {...state,eventList:_.cloneDeep(action.payload)}
        case "ADD_EVENT":
            debugger
            return {...state,eventList:[...state.eventList,action.payload.data]}
        case "EVENT_DELETE":
            let data=state.eventList.filter((d)=>d._id!==action.payload.data._id);
            return {...state,eventList:_.cloneDeep(data)}
        case "EDIT_EVENT":
            let index=state.eventList.findIndex((d)=>d._id===action.data._id);
            state.eventList.splice(index,1)
            state.eventList.splice(index,0,action.payload.data)
            return {...state,eventList:state.eventList}
        default:
            return state
    }
    return state
}