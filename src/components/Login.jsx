import React from 'react'
import { useState, useRef } from 'react';
import Header from './Header';
import logoBg from '../assets/logoBg.png';
import { checkValidData } from '../utils/validate.jsx';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase.jsx';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice.jsx';
import { userIcon } from '../utils/constants.jsx';

const Login = () => {

    const [IsSignInForm, setIsSignInForm] = useState(true);
    const [ErrorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {
        //validate the form
        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);
        if (message) return; //if message is there this means user have enterd incorrect vlaidation so return

        //signIn/Signup logic
        if (!IsSignInForm) {
            //sign up logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value) //api from firebase
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value,
                        photoURL: userIcon
                    })
                    .then(() => {
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(
                            addUser({
                                uid: uid,
                                email: email,
                                displayName: displayName,
                                photoURL: photoURL
                            })
                        ); //puts data in store
                    })
                    .catch((error) => {
                        setErrorMessage(error.message);
                    });
                })
                .catch((error) => {
                    // const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorMessage);
                });
        }
        else {
            //sign in logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value) //api from firebase
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorMessage);
                });

        }
    }

    const toggleSignInForm = () => {
        setIsSignInForm(!IsSignInForm);
    }

    return (
        <>
            <Header />
            <div className='absolute'>
                <img className='h-screen object-cover md:h-auto'
                    src={logoBg}
                    alt='watchwizAI' />
            </div>

            <form onSubmit={(e) => e.preventDefault()} 
            className='w-full md:w-3/12 absolute p-12 bg-black m-24 mx-auto left-0 right-0 text-white bg-opacity-90 rounded-lg'>
                <h1 className='font-bold text-3xl py-4 '>{IsSignInForm ? "Sign In" : "Sign Up"}</h1>

                {!IsSignInForm && (
                    <input
                        ref={name}
                        type='text'
                        placeholder='Username'
                        className="p-4 my-4 w-full rounded-lg bg-gray-800"
                    />
                )}
                <input
                    ref={email}
                    type="text"
                    placeholder='Enter Email Id'
                    className='p-4 my-4 w-full bg-gray-800 rounded-lg'
                />
                <input
                    ref={password}
                    type="password"
                    placeholder='Enter Passsword'
                    className='p-4 my-4 w-full bg-gray-800 rounded-lg'
                />
                <p className='text-red-500'>{ErrorMessage} </p>
                <button
                    className='p-6 my-6 bg-yellow-900 w-full rounded-lg curosor-pointer'
                    onClick={handleButtonClick}>{IsSignInForm ? "Sign In" : "Sign Up"}
                </button>
                <p
                    className='py-4 cursor-pointer'
                    onClick={toggleSignInForm}>{IsSignInForm ? "Not a member ? Sign Up Now" : "Already registered ? Sign In Now"}
                </p>
            </form>
        </>
    )
};

export default Login;