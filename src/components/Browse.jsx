import React, { useEffect } from 'react'
import Header from './Header.jsx';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies.jsx';
import usePopularMovies from '../hooks/usePopularMovies.jsx';
import useUpcomingMovies from '../hooks/useUpcomingMovies.jsx';
import useTrendingMovies from '../hooks/useTrendingMovies.jsx';
import useTopRatedMovies from '../hooks/useTopRatedMovies.jsx';
import MainContainer from './MainContainer.jsx';
import SecondaryContainer from './SecondaryContainer.jsx';
import GptSearch from './GptSearch.jsx';
import { useSelector } from 'react-redux';

const Browse = () => {

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  useNowPlayingMovies(); //fetches the now playing movies and updates the store
  usePopularMovies();
  useUpcomingMovies();
  useTrendingMovies();
  useTopRatedMovies();

  return (
    <div>
      <Header/>
      {showGptSearch ? (<GptSearch/>) : (
      <>
        <MainContainer/>
        <SecondaryContainer />
      </>
      )}
      
          
    </div>
  )
}

export default Browse;
