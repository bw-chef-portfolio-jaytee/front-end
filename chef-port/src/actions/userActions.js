import {axiosWithAuth} from '../utils/axiosWithAuth';

//login exports
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

//signup exports
export const SIGNUP_START = 'SIGNUP_START';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

//fetching all recipes for home page
export const FETCH_ALL_START = 'FETCH_ALL_START';
export const FETCH_ALL_SUCCESS = 'FETCH_ALL_SUCCESS';
export const FETCH_ALL_FAILURE = 'FETCH_ALL_FAILURE';

export const login = (userInfo, history) => dispatch => {
    dispatch({type: LOGIN_START})
    axiosWithAuth()
        .post('/user/login', userInfo)
        .then(res => {
            // console.log('res from login action', res)
            localStorage.setItem('token', res.data.token)
            dispatch({type: LOGIN_SUCCESS, payload: res.data})
            history.push('/dashboard')
        })
        .catch((err) => dispatch({type: LOGIN_FAILURE}))
}

export const signup = (userInfo, history) => dispatch => {
    dispatch({type: SIGNUP_START});
    axiosWithAuth()
        .post('/user/register', userInfo)
        .then(res => {
            // console.log('res from signup action', res)
            localStorage.setItem('token', res.data.token)
            dispatch({type: SIGNUP_SUCCESS, payload: res.data})
            history.push('/dashboard')
        })
        .catch((err) => dispatch({type: SIGNUP_FAILURE}))
}

export const getAllRecipes = () => dispatch => {
    dispatch({type: FETCH_ALL_START})
    axiosWithAuth()
        .get('/user/recipes')
        .then(res => {
            console.log('res from get all recipes', res)
            dispatch({type: FETCH_ALL_SUCCESS, payload: res.data})
        })
        .catch(err => {
            console.log('err from get all recipes', err)
            dispatch({type: FETCH_ALL_FAILURE, payload: err.res})
        })
}