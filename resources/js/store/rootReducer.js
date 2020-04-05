import { combineReducers } from "redux";
import user from './user/userReducer'
import product from './product/productReducer'

export default combineReducers({
    user,
    product,
});