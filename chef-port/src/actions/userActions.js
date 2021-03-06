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

//fetching individual recipes
export const FETCH_INDIVIDUAL_RECIPE_START = 'FETCH_INDIVIDUAL_RECIPE_START';
export const FETCH_INDIVIDUAL_RECIPE_SUCCESS = 'FETCH_INDIVIDUAL_RECIPE_SUCCESS';
export const FETCH_INDIVIDUAL_RECIPE_FAILURE = 'FETCH_INDIVIDUAL_RECIPE_FAILURE';

//fetching a chef's recipes
export const FETCH_CHEF_RECIPES_START = 'FETCH_CHEF_RECIPES_START';
export const FETCH_CHEF_RECIPES_SUCCESS = 'FETCH_ CHEF_RECIPES_SUCCESS';
export const FETCH_CHEF_RECIPES_FAILURE = 'FETCH_CHEF_RECIPES_FAILURE';

//creating new chef's recipe
export const CREATE_RECIPE_START = 'CREATE_RECIPE_START';
export const CREATE_RECIPE_SUCCESS = 'CREATE_RECIPE_SUCCESS';
export const CREATE_RECIPE_FAILURE = 'CREATE_RECIPE_FAILURE';

//deleting a chef's recipe
export const DELETE_RECIPE_START = 'DELETE_RECIPE_START';
export const DELETE_RECIPE_SUCCESS = 'DELETE_RECIPE_SUCCESS';
export const DELETE_RECIPE_FAILURE = 'DELETE_RECIPE_FAILURE';

//editing a chef's recipe
export const EDIT_RECIPE_START = 'EDIT_RECIPE_START';
export const EDIT_RECIPE_SUCCESS = 'EDIT_RECIPE_SUCCESS';
export const EDIT_RECIPE_FAILURE = 'EDIT_RECIPE_FAILURE';

//fetching one recipe from chef (for editing)
export const GET_ONE_START = 'GET_ONE_START';
export const GET_ONE_SUCCESS = 'GET_ONE_SUCCESS';
export const GET_ONE_FAILURE = 'GET_ONE_FAILURE';

//updates the users contact information
export const UPDATE_USER_START = 'UPDATE_USER_START';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

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
            // localStorage.setItem('token', res.data.token)
            dispatch({type: SIGNUP_SUCCESS, payload: res})
            history.push('/login')
        })
        .catch(err => {
            dispatch({type: SIGNUP_FAILURE })
        })
}

export const getAllRecipes = () => dispatch => {
    dispatch({type: FETCH_ALL_START})
    axiosWithAuth()
        .get('/user/recipes')
        .then(res => {
            // console.log('res from get all recipes', res.data)
            dispatch({type: FETCH_ALL_SUCCESS, payload: res.data})
        })
        .catch(err => {
            // console.log('err from get all recipes', err)
            dispatch({type: FETCH_ALL_FAILURE, payload: err.res})
        })
}

// export const getByType = () => dispatch => {
//     dispatch({type: FETCH_TYPE_START})
//     axiosWithAuth()
//         .get('/user/recipes')
//         .then(res => {
//             const mealtype = res.data.filter
//         })
//         .catch()
// }

export const getOneRecipe = (id, history) => dispatch => {
    dispatch({type: FETCH_INDIVIDUAL_RECIPE_START})
    axiosWithAuth()
        .get(`/user/recipes/${id}`)
        .then(res => {
            // console.log('res from one recipe', res)
            dispatch({type: FETCH_INDIVIDUAL_RECIPE_SUCCESS, payload: res.data})
            // history.push(`/recipe/${id}`)
        })
        .catch(err => {
            // console.log('err from one recipe', err)
            dispatch({type: FETCH_INDIVIDUAL_RECIPE_FAILURE, payload: err.res})
        })
}

export const getChefRecipes = (chef) => dispatch => {
    dispatch({type: FETCH_CHEF_RECIPES_START})
    axiosWithAuth()
        .get(`/chef/recipes`)
        .then(res => {
            // console.log('res from chefs recipes', res)
            dispatch({type: FETCH_CHEF_RECIPES_SUCCESS, payload: res.data})
        })
        .catch(err => {
            // console.log('err from chefs recipes', err)
            dispatch({type: FETCH_CHEF_RECIPES_FAILURE, payload: err.res})
        })
}

export const createRecipe = (chef, history) => dispatch => {
    dispatch({type: CREATE_RECIPE_START})
    axiosWithAuth()
        .post('/chef/recipes', chef)
        .then(res => {
            // console.log('res from create recipe', res)
            dispatch({type: CREATE_RECIPE_SUCCESS, payload: res.data})
            history.push('/dashboard')
        })
        .catch(err => {
            // console.log('err from create recipe', err)
            dispatch({type: CREATE_RECIPE_FAILURE})
        })
}

export const deleteRecipe = (id, history) => dispatch => {
    dispatch({type: DELETE_RECIPE_START})
    axiosWithAuth()
        .delete(`/chef/recipes/${id}`)
        .then(res => {
            // console.log('delet res', res)
            dispatch({type: DELETE_RECIPE_SUCCESS, payload: res.data})
            history.push('/dashboard')
        })
        .catch(err => {
            // console.log('delete err', err)
            dispatch({type: DELETE_RECIPE_FAILURE, payload: err.res})
        })
}

export const editRecipe = (formValues, id, history) => dispatch => {
    dispatch({type: EDIT_RECIPE_START})
    axiosWithAuth()
        .put(`/chef/recipes/${id}`, formValues)
        .then(res => {
            // console.log('res from edit action', res)
            dispatch({type: EDIT_RECIPE_SUCCESS, payload: res})
            history.push('/dashboard')
        })
        .catch(err => {
            // console.log('err from edit action', err)
            dispatch({type: EDIT_RECIPE_FAILURE})
        })
}

export const updateUser = (formValues, user) => dispatch => {
    dispatch({type: UPDATE_USER_START})
    axiosWithAuth()
        .put('/chef/update', formValues)
        .then(res => {
            console.log('res from update action', res)
            dispatch({type: UPDATE_USER_SUCCESS, payload: res.data})
        })
        .catch(err => {
            console.log('err from update action', err)
            dispatch({type: UPDATE_USER_FAILURE, payload: err.res})
        })
}