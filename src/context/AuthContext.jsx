import {createContext, useEffect, useState, useContext} from "react";

import {supabase} from '../supabaseClient';

import React from 'react'
const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState(undefined);
    //i'm just gonna create functions which i will be using inside of components;

    const signUpNewUser = async ({email, password}) =>{ //this is for signUp of a new user
        const {data, error} = await supabase.auth.signUp(
            {email : email,
                password : password,
            }
        );
        if(error){
            console.error("There was a problembo while signing up ",error)
            return {success : false, error }
        } else {
            return {success : true, data}; //if my 
        }
    }

    const signOut = async () =>{
        const {error} = await supabase.auth.signOut();
        if(error){
            console.error("sign out problem", error);
        }
    }

    const signInUser = async ({email, password}) =>{ //this is for signUp of a new user
        const {data, error} = await supabase.auth.signInWithPassword(
            {email : email,
                password : password,
            }
        );
        if(error){
            console.error("There was a problembo while signing in ",error)
            return {success : false, error }
        } else {
            return {success : true, data}; //if my 
        }
    }

    useEffect(() =>{
        supabase.auth.getSession().then(({data : {session}}) =>{
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);


  return (
    <AuthContext.Provider value={{session, signUpNewUser, signOut, signInUser}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider

export const UserAuth = () =>{
    return useContext(AuthContext); //THIS IS JUST a custom hook for convinience
}