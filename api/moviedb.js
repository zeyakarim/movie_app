import axios from "axios";
const apiKey = process.env.EXPO_PUBLIC_API_KEY;
const apiBaseUrl = process.env.EXPO_PUBLIC_BASE_API_URL;
const apiImageBaseUrl = process.env.EXPO_PUBLIC_BASE_IMAGE_API_URL;

// endPoints
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;

export const image500 = path => path ? `${apiImageBaseUrl}/w500/${path}`: null;
export const image342 = path => path ? `${apiImageBaseUrl}/w342/${path}`: null;
export const image185 = path => path ? `${apiImageBaseUrl}/w185/${path}`: null;

// dynamic endpoints
const movieDetailsEndpoint = id => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = id => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = id => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;

export const fallbackMoviePoster = `https://www.prokerala.com/movies/assets/img/no-poster-available.jpg`;
export const fallbackPersonImage = `https://cdn-icons-png.flaticon.com/512/1177/1177568.png`

const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    }
    try {
        const response = await axios.request(options);
        return response?.data;
    } catch (error) {
        console.log('Error in fetching data : ',error);
        return {}
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint);
}

export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint);
}

export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint);
}

export const fetchMovieDetails = (id) => {
    return apiCall(movieDetailsEndpoint(id))
}

export const fetchMovieCredits = (id) => {
    return apiCall(movieCreditsEndpoint(id))
}

export const fetchSimilarMovies = (id) => {
    return apiCall(similarMoviesEndpoint(id))
}