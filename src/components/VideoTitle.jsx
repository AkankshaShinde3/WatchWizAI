import React from 'react'

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-16 absolute bg-gradient-to-r from-black" >
      <h1 className="text-2xl md:text-6xl font-bold text-white">{ title }</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/2 text-white">{ overview }</p>
      <div>
        <button className='bg-white px-2 md:px-12 py-1 md:py-5 text-black m-2 rounded-lg hover:bg-opacity-70'>Play Now</button>
        <button className='hidden md:inline-block bg-gray-700 px-12 p-5 text-white m-5 rounded-lg hover:bg-opacity-70'>More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle;
