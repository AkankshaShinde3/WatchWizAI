import React from 'react'
import logo from '../assets/logo.png';
import newBg from '../assets/newBg.jpg';
import { auth } from '../utils/firebase.jsx';
import { useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { toggleGptSearchView } from '../utils/gptSlice.jsx';
import { SUPPORTED_LANGUAGES } from '../utils/constants.jsx';
import { changeLanguage } from '../utils/configSlice.jsx';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const dispatch = useDispatch();

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  }

  const handleGPTSearchClick = () => {
    dispatch(toggleGptSearchView());
  }

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/");
    })
      .catch((error) => {
        navigate("/error");
      });
  }

  useEffect(() => { //using useEffect as just wanted to render this api once means just wanted to send the user data once to the store
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL })); //puts data in store         
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubcribe(); //this will be called when unsubscribe unmounts
  }, []);

  return (
    <div className="absolute w-screen bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between items-center px-9 py-3">
      <img
        className="h-20 rounded w-27"
        src={logo}
        alt="logo"
      />

      {user && (
        <div className="flex items-center space-x-4">
          {showGptSearch && 
          <select className="p-2 text-sm border rounded-md bg-slate-300" onClick={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>}
          <button
            onClick={handleGPTSearchClick}
            className="px-2 py-1 rounded-lg text-white bg-orange-700 hover:bg-orange-600 transition">
            {showGptSearch ? "Home Page" : "AI Explore"}
          </button>
          <img
            className="rounded-full hidden md:block w-7 h-7"
            src={user?.photoURL}
            alt="user"
          />
          <button
            onClick={handleSignOut}
            className="px-2 py-1 text-sm rounded-lg text-white bg-gray-800 hover:bg-gray-700" >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;