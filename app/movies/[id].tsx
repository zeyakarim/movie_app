
import { useLocalSearchParams } from 'expo-router';
import MovieDetailsScreen from '@/screens/MovieDetailsScreen'
import React from 'react'

const Movie = () => {
    const { item } = useLocalSearchParams();

    return (
        <MovieDetailsScreen item={item ? JSON.parse(item as string) : {}} />
    )
}

export default Movie;