import React from 'react'
import { IMG_CDN_URL } from '../utils/constants';

const MovieCard = ({ posterPath }) => {
  if(!posterPath) return null;
  
  return (
    <div>
      <div className='w-32 md:w-52 pr-3'>
        <img src={IMG_CDN_URL + posterPath} alt="Movie Card" />
      </div>
    </div>
  )
}

export default MovieCard;