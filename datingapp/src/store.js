import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";

// reducers for REACT REDUX
const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
});

const userStorageInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("saveData")) : null;

const middleware = [thunk];
const initialState = {
    userLogin: { userInfo: userStorageInfo },
}
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;