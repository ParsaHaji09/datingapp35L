import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";

// reducers for REACT REDUX
const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
});


const middleware = [thunk];
const initialState = {}
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;