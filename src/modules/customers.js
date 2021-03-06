import axios from "axios";
import { Navigate } from "react-router-dom";

// ๐ ๋ฆฌ๋์ค ๋ชจ๋
// ์ด๊ธฐ๊ฐ, ์ก์ ํ์ ์ง์ , ์ก์ ์์ฑ ํจ์, ๋ฆฌ๋์(reducer)
const GET_CUSTOMERS = "GET_CUSTOMERS"; // ์์ฒญ
const GET_CUSTOMERS_ERROR = "GET_CUSTOMERS_ERROR"; // ์์ฒญ ์คํจ
const GET_CUSTOMERS_SUCCESS = "GET_CUSTOMERS_SUCCESS"; // ์์ฒญ ์ฑ๊ณต
const SET_INPUT = "SET_INPUT"; // input๊ฐ ์๋ ฅ
const SET_RESET = "SET_RESET"; // ์ด๊ธฐํ

// ์ด๊ธฐ๊ฐ ์ค์ 
const initialState = {
    customers : {
        loading : false,
        data : null,
        error : null
    },
    addCustomer : {
        c_name : "",
        c_phone : "",
        c_birth : "",
        c_gender : "",
        c_add : "",
        c_adddetail : ""
    }
}

// ์ก์ ์์ฑ ํจ์
export const setInput = (e) => {
    const { name, value } = e.target;
    return {
        type : SET_INPUT,
        name,
        value
    }
}

// ํ์ผ๋ก ์ด๋
export const goToHome = (navigate) => () => {
    navigate('/');
}

// thunkํจ์๋ฅผ ์ฌ์ฉํด์ action๊ฐ์ฒด dispatch ํ๊ธฐ
// >> (thunkํจ์) โญ ํจ์ ๋จผ์  ์คํ ํ dispatch (๋น๋๊ธฐ ์ ์ก ๋๋ฌธ์ ์ฌ์ฉ)
export const getCustomers = () => async dispatch => {
    dispatch({ type : GET_CUSTOMERS }); // ์์ฒญ ์์
    try{
        const response = await axios.get(`http://localhost:3001/customers`);
        const customers = response.data;
        dispatch({ type : GET_CUSTOMERS_SUCCESS, customers });
    }
    catch(e){
        dispatch({ type : GET_CUSTOMERS_ERROR, error : e });
    }
}

// (๋น๋๊ธฐ ์ ์ก)
export const setSubmit = () => async (dispatch, getState) => {
    const formdata = getState().customers.addCustomer;
    try {
        const response = await axios.post(`http://localhost:3001/addCustomer`, formdata);
        dispatch({ type : SET_RESET })
    }
    catch (e) {
        dispatch({ type : SET_RESET })
    }
}

// ๋ฆฌ๋์ ๋ง๋ค๊ธฐ
export default function customers(state = initialState, action) {
    switch(action.type) {
        case GET_CUSTOMERS :
            return {
                ...state,
                customers : {
                    loading : true,
                    data : null,
                    error : null,
                }
            }
        case GET_CUSTOMERS_ERROR :
            return {
                ...state,
                customers : {
                    loading : false,
                    data : null,
                    error : action.error,
                }
            }
        case GET_CUSTOMERS_SUCCESS :
            return {
                ...state,
                customers : {
                    loading : false,
                    data : action.customers,
                    error : null
                }
            }
        case SET_INPUT :
            return {
                ...state,
                addCustomer : {
                    ...state.addCustomer,
                    [action.name] :action.value,
                }
            }
        case SET_RESET :
            return {
                ...state,
                addCustomer : {
                    ...state.addCustomer,
                    c_name : "",
                    c_phone : "",
                    c_gender : "",
                    c_add : "",
                    c_adddetail : ""
                }
            }
        default :
            return state;
    }
}