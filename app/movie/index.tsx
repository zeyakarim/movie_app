import MovieScreen from '@/screens/MovieScreen'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'

const Movie = () => {
    const { item } = useLocalSearchParams();

    return (
        <MovieScreen item={item ? JSON.parse(item as string) : {}} />
    )
}

export default Movie