import axios from "axios";
const apiKey = process.env.EXPO_PUBLIC_API_KEY;
const apiBaseUrl = process.env.EXPO_PUBLIC_BASE_API_URL;
const apiImageBaseUrl = process.env.EXPO_PUBLIC_BASE_IMAGE_API_URL;

// endPoints
const trendingMoviesEndpoint = `${apiBaseUrl}/india/trending-tamil`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/india/upcoming`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/india/top-rated-indian-movies`;

export const image500 = path => path ? `${apiImageBaseUrl}/w500/${path}`: null;
export const image342 = path => path ? `${apiImageBaseUrl}/w342/${path}`: null;
export const image185 = path => path ? `${apiImageBaseUrl}/w185/${path}`: null;

// dynamic endpoints
const movieDetailsEndpoint = id => `${apiBaseUrl}/${id}`;
const movieCreditsEndpoint = id => `${apiBaseUrl}/${id}/cast`;
const mostPopularMoviesEndpoint = `${apiBaseUrl}/most-popular-movies`;
const searchMoviesEndpoint = `${apiBaseUrl}/search`;

// person details
const personDetailsEndpoint = id => `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
const personMoviesEndpoint = id => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

export const fallbackMoviePoster = `https://www.prokerala.com/movies/assets/img/no-poster-available.jpg`;
export const fallbackPersonImage = `https://cdn-icons-png.flaticon.com/512/1177/1177568.png`;

const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {},
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'imdb236.p.rapidapi.com'
        }
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

export const fetchMostPopularMovies = () => {
    return apiCall(mostPopularMoviesEndpoint)
}

export const fetchPersonDetails = (id) => {
    return apiCall(personDetailsEndpoint(id))
}

export const fetchPersonMovies = (id) => {
    return apiCall(personMoviesEndpoint(id))
}

export const searchMovies = (params) => {
    return apiCall(searchMoviesEndpoint, params)
}