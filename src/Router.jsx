import {createBrowserRouter, Navigate} from 'react-router-dom';
import App from './App';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Landing from './components/Landing';

export const router = createBrowserRouter([
    {path: "/", element: <Landing/>},
    {path: "/signup", element: <Signup/>},
    {path: "/signin", element: <Signin/>},
    {path: "/dashboard", element: <PrivateRoute><Dashboard/></PrivateRoute> },
]);
