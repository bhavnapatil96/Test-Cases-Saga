import {combineReducers} from 'redux'
import {loginReducer,registerReducer,eventReducer} from './myReducer'
const allReducer=combineReducers({
    loginReducer,
    registerReducer,
    eventReducer
})
export default allReducer