import {registerReducer} from '../reducers/myReducer'
import localStorage from 'mock-local-storage'
describe('Register reducer',()=>{
    const initstate = [];
    it('should handle initial state',()=>{
        expect(registerReducer(initstate,{})).toEqual(initstate);
    });
    it('should handle REGISTER_USER',()=>{
        let action = {
            type:'REGISTER_USER',
            payload:{"fullname":"test","email": "test@gmail.com", "password": "123","gender":"M",}
        }
        expect(registerReducer(initstate,action)).toEqual({"registerUser": {"email": "test@gmail.com", "fullname": "test", "gender": "M", "password": "123"}});
    })
});