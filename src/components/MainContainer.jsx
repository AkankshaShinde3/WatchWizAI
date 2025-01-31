import React from 'react'
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground.jsx';
import { useSelector } from 'react-redux';

const MainContainer = () => {

  const movies = useSelector(store => store.movies?.nowPlayingMovies); //? is known as optiional chaining if it is not there and nowPlatying movies is empty then it will throw error
  
  // if(movies == null) return; //this is done to handlle the case as when this components is rendering it is rturning the value of movies even before the API call is completed.

  if(!movies) return;

  const mainMovie = movies[0];

  const { original_title, overview, id } = mainMovie;

  
  
  return (
    <div className='pt-[35%] bg-black md:pt-0'>
      <VideoTitle title = { original_title } overview = { overview }/>
      <VideoBackground movieId = { id }/>
    </div>
  )
}

export default MainContainer;
