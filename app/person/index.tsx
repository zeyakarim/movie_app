import PersonScreen from '@/screens/PersonScreen'
import { useLocalSearchParams } from 'expo-router';
import React from 'react'

const Person = () => {
    const { person } = useLocalSearchParams();

    return (
        <PersonScreen item={person ? JSON.parse(person as string) : {}} />
    )
}

export default Person