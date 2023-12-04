import axios from "axios";
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from "../constants/reduxConstants"

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST});

        const config = {
            headers: {
              "Content-type":"application/json",
            }
          };
          
          const { data } = await axios.post('http://localhost:5000/api/users/login', {
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

export const register = (name, email, password, tags, pic, birthday, phone) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const config = {
      header: {
        "Content-type":"application/json",
      },
    };

    const regData = await axios.post("http://localhost:5000/api/users/", {
      name: name,
      email: email,
      password: password,
      tags: tags,
      pic: pic,
      birthday: birthday,
      phone: phone,
    }, config);

    localStorage.setItem("saveData", JSON.stringify(regData.data));
    dispatch({ type: REGISTER_SUCCESS, payload: regData.data });

  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message, });
  }
}

export const logout = () => async(dispatch) => {
  localStorage.removeItem("saveData");
  dispatch({ type: LOGOUT });
}