import React from 'react';
import {Link} from 'react-router-dom';

//components
import NavBar from './NavBar';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const HomePage = () => {

    axiosWithAuth()
        .get('/user/recipes')
        .then(res => {
            console.log('res from home page', res)
        })
        .catch(err => {
            console.log('err in homepage', err)
        })

    return(
        <div>
            <NavBar />
            <h1>Hello There</h1>
            <Link to = '/login' ><button>Log In</button></Link>
            <Link to = '/signup'><button>Sign Up</button></Link>
        </div>
    )
}

export default HomePage;