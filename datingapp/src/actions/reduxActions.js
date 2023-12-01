import axios from "axios";
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from "../constants/reduxConstants"

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST});

        const config = {
            headers: {
              "Content-type":"application/json",
            }
          };
          
          const { data } = await axios.post('/api/users/login', {
            email: email, 
            password: password,
          }, config);
    
          // local storage for our email and password
          //console.log(data);
          localStorage.setItem('saveData', JSON.stringify(data));

          dispatch({ type: LOGIN_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message, });
    }
}