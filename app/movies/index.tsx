import MoviesScreen from '@/screens/MoviesScreen';
import { useLocalSearchParams } from 'expo-router'
import React from 'react'

const Movies = () => {
    const { title } = useLocalSearchParams();

    return (
        <MoviesScreen title={title} />
    )
}

export default Movies;