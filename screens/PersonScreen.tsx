import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image342, image500 } from '@/api/moviedb';
import Loading from '@/components/loading';
import MovieList from '@/components/movieList';
import { styles, theme } from '@/theme';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const verticalMargin = ios ? '': 'my-3';

const PersonScreen = ({ item }) => {
    const [isFavourate, setIsFavourate] = useState(false);
    const [personMovies, setPersonMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [personDetails, setPersonDetails] = useState({})

    useEffect(() => {
        setLoading(true);
        console.log('person',item)
        getPersonDetails(item?.id);
        getPersonMovies(item?.id);
    }, [item])

    const getPersonDetails = async (id) => {
        const data = await fetchPersonDetails(id);
        setPersonDetails(data);
        setLoading(false)
    }

    const getPersonMovies = async (id) => {
        const data = await fetchPersonMovies(id);
        if (data && data?.cast) setPersonMovies(data?.cast);
    }

    return (
        <ScrollView
            className='flex-1 bg-neutral-900'
            contentContainerStyle={{ paddingBottom: 20}}
        >
            {/* Back button */}
            <SafeAreaView className={'z-20 w-full flex-row justify-between items-center px-4'+verticalMargin}>
                <TouchableOpacity className='rounded-xl p-1' style={styles.background} onPress={() => router.back()}>
                    <ChevronLeftIcon size={28} strokeWidth={2.5} color='white' />
                </TouchableOpacity>
                <TouchableOpacity className='rounded-xl p-1' onPress={() => setIsFavourate(!isFavourate)}>
                    <HeartIcon size={35} strokeWidth={2.5} color={isFavourate ? 'red' : 'white'} />
                </TouchableOpacity>
            </SafeAreaView>

            {/* Person Details */}
            {loading ? (
                <Loading />
            ) : (
                <View>
                    <View className='flex-row justify-center'>
                        <View 
                            className='items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500'
                            style={{
                                shadowColor: 'gray',
                                shadowRadius: 40,
                                shadowOffset:{width:0, height: 5},
                                shadowOpacity: 1
                            }}
                        >
                            <Image 
                                // source={require('../assets/images/johnwick.jpeg')}
                                source={{ uri: image342(personDetails?.profile_path) || fallbackPersonImage}}
                                style={{height: height*0.43,width: width*0.74}}
                            />
                        </View>
                    </View>

                    <View className='mt-6'>
                        <Text className='text-3xl text-white font-bold text-center'>
                            {personDetails?.name}
                        </Text>
                        <Text className='text-base text-neutral-500 text-center'>
                            {personDetails?.place_of_birth}
                        </Text>
                    </View>

                    <View className='mx-3 mt-6 p-4 flex-row justify-between items-center bg-neutral-700 rounded-full'>
                        <View className='border-r-2 border-r-neutral-500 px-2 items-center'>
                            <Text className='text-white font-semibold'>Gender</Text>
                            <Text className='text-neutral-300 text-sm'>{personDetails?.gender === 1 ? 'Female' : 'Male'}</Text>
                        </View>
                        <View className='border-r-2 border-r-neutral-500 px-2 items-center'>
                            <Text className='text-white font-semibold'>Birthday</Text>
                            <Text className='text-neutral-300 text-sm'>{personDetails?.birthday}</Text>
                        </View>
                        <View className='border-r-2 border-r-neutral-500 px-2 items-center'>
                            <Text className='text-white font-semibold'>Known for</Text>
                            <Text className='text-neutral-300 text-sm'>{personDetails?.known_for_department}</Text>
                        </View>
                        <View className='px-2 items-center'>
                            <Text className='text-white font-semibold'>Popularity</Text>
                            <Text className='text-neutral-300 text-sm'>{personDetails?.popularity?.toFixed(2)} %</Text>
                        </View>
                    </View>

                    <View className='my-6 mx-4 space-y-2'>
                        <Text className='text-white text-lg'>Biography</Text>
                        <Text className='text-neutral-400 tracking-wide'>
                            {personDetails?.biography || 'N/A'}
                        </Text>
                    </View>

                    {/* movies */}
                    <MovieList data={personMovies} title='Movies' hideSeeAll={true} />
                </View>
            )}
        </ScrollView>
    )
}

export default PersonScreen