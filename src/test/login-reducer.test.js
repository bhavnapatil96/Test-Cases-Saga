import {loginReducer} from '../reducers/myReducer'
import localStorage from 'mock-local-storage'
describe('Login reducer',()=>{
    const initstate = [];
    it('should handle initial state',()=>{
        expect(loginReducer(initstate,{})).toEqual(initstate);
    });
    it('should handle LOGIN_USER',()=>{
        let action = {
            type:'LOGIN_USER',
            payload:{"email": "test@gmail.com", "password": "123"}
        }

        expect(loginReducer(initstate,action)).toEqual({"loginUser": {"email": "test@gmail.com", "password": "123"}});
    })
});