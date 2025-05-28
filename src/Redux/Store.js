import {createStore, applyMiddleware} from "redux";
import reducer from "./Reducer";
import {thunk as thunkMiddleware} from "redux-thunk";


let store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;