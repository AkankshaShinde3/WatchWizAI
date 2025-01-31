import { API_OPTIONS } from '../utils/constants';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTrailerVideo } from '../utils/moviesSlice';

const useMovieTrailer = (movieId) => {

    //fetch movie trailer and update the store with trailer video
    const dispatch = useDispatch();

    //MEMOIZATION
    const trailerVideo = useSelector((store) => store.movies.getMoviesVideo);

    const getMoviesVideo = async () => {

        const data = await fetch("https://api.themoviedb.org/3/movie/"+ movieId +"/videos?language=en-US",
            API_OPTIONS);

        const json = await data.json();

        const filterData = json.results.filter((video) => video.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];

        dispatch(addTrailerVideo(trailer));
    }

    useEffect(() => {
        !trailerVideo && getMoviesVideo();
    }, []);
}

export default useMovieTrailer;