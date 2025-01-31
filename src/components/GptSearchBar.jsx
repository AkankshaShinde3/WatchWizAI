import React from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
// import openai from '../utils/openai';
import geminiai from '../utils/geminiai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {

  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef();

  //search the movie in TMDB API
  const searchMovieTMDB = async (movie) => {

    const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+ movie +"&include_adult=false&language=en-US&page=1", API_OPTIONS);
    const json = await data.json();

    return json.results;
  }

  //openai code
  // const handleGptSearchClick = async () => {

  //   const gptQuery = "Act as a Movie Recommendation System and suggest some movies for the query" + searchText.current.value + "only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Krrish, 3Idiots, Koi Mil Gaya, Phir Hera Pheri, Tare Zameen Par";
  //   const getResults = await openai.chat.completions.create({
  //     messages: [{ role: 'user', gptQuery }],
  //     model: 'gpt-3.5-turbo',
  //   });

  // }



  
  
  //geminiai code
  const handleGptSearchClick = async () => {
    const gptQuery =
      "Act as a Movie Recommendation System and suggest some movies for the query " +
      searchText.current.value +
      " only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Krrish, 3Idiots, Koi Mil Gaya, Phir Hera Pheri, Tare Zameen Par";

    const model = geminiai.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(gptQuery);
    const response = result.response;
    const text = response.text();

    const geminiMovies = text.split(",").map((movie) => movie.trim());

    const promiseArray = geminiMovies.map((movie) => searchMovieTMDB(movie));  //[promise, promise, promise, promise, promise]
    const tmdbResults = await Promise.all(promiseArray);

    dispatch(addGptMovieResult({movieNames: geminiMovies, movieResults: tmdbResults}));
  };




  return (
    <div className='pt-[49%] md:pt-[10%] flex justify-center'>
      <form className='bg-black grid grid-cols-12 w-full md:w-1/2 rounded-lg' onSubmit={(e) => e.preventDefault()}>
        <input ref={searchText} type="text" className='p-2 m-2 bg-white rounded- col-span-9' placeholder={lang[langKey].gptSearchPlaceholder} />
        <button className='py-2 px-2 bg-orange-700 hover:bg-orange-600 m-3 text-white col-span-3 transition duration-200' onClick={handleGptSearchClick}>{lang[langKey].search}</button>
      </form>
    </div>
  )
}

export default GptSearchBar
