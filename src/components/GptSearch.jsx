import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'
import logoBg from '../assets/logoBg.png';

const GptSearch = () => {
  return (
    <div>
      <div className='fixed -z-10'>
        <img className='h-screen object-cover md:w-screen'
          src={logoBg}
          alt='watchwizAI'
        />
      </div>
      <div className=''>
        <GptSearchBar />
        <GptMovieSuggestion />
      </div>
    </div>
  )
}

export default GptSearch
