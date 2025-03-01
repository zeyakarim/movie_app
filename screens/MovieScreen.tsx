import { styles, theme } from '@/theme';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '@/components/cast';
import MovieList from '@/components/movieList';
import Loading from '@/components/loading';

var { width, height } = Dimensions.get('window')
const ios = Platform.OS === 'ios';
const topMargin = ios ? '': 'mt-3';

const MovieScreen = () => {
    const [isFavourate, setIsFavourate] = useState(false);
    const [cast, setCast] = useState([1,2,3,4,5])
    const [similarMovies, setSimilarMovies] = useState([1,2,3,4])
    const { params: item } = useLocalSearchParams();
    const [loading, setLoading] = useState(false)

    const movie_name = 'Anti-Man and the Wasp: Quantumania';

    useEffect(() => {
        // call the movie details api
    }, [])

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className='flex-1 bg-neutral-900'
        >
            <View className='w-full'>
                <SafeAreaView className={'absolute z-20 w-full flex-row justify-between items-center px-4'+topMargin}>
                    <TouchableOpacity className='rounded-xl p-1' style={styles.background} onPress={() => router.back()}>
                        <ChevronLeftIcon size={28} strokeWidth={2.5} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity className='rounded-xl p-1' onPress={() => setIsFavourate(!isFavourate)}>
                        <HeartIcon size={35} strokeWidth={2.5} color={isFavourate ? theme.background : 'white'} />
                    </TouchableOpacity>
                </SafeAreaView>

                {loading ? (
                    <Loading />
                ) : (
                    <View>
                        <Image 
                            source={require('../assets/images/quantumania.jpeg')}
                            style={{width, height: height*0.55}}
                        />
                        <LinearGradient 
                            colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                            style={{width, height: height*0.40}}
                            start={{x:0.5, y:0}}
                            end={{x:0.5, y: 1}}
                            className='absolute bottom-0'
                        />  
                    </View>
                )}
            </View>

            {/* Movie Details View */}
            <View style={{marginTop:- (height*0.09)}} className='space-y-3'>
                {/* movie title */}
                <Text className='text-white text-center text-3xl font-bold tracking-wider'>
                    {movie_name}
                </Text>

                {/* status, release, runtime */}
                <Text className='text-neutral-400 font-semibold text-base text-center'>
                    Released • 2020 • 170 min
                </Text>

                {/* genres */}
                <View className='flex-row justify-center mx-4 space-x-2'>
                    <Text className='text-neutral-400 font-semibold text-base text-center'>
                        Action •
                    </Text>
                    <Text className='text-neutral-400 font-semibold text-base text-center'>
                        Thrill •
                    </Text>
                    <Text className='text-neutral-400 font-semibold text-base text-center'>
                        Comedy
                    </Text>
                </View>

                <Text className='text-neutral-400 mx-4 tracking-wide'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima culpa ullam inventore modi ab, obcaecati exercitationem asperiores corrupti? Quos pariatur dolor quasi placeat iusto sequi, totam consequatur animi ipsum dolore.
                </Text>
            </View>

            {/* cast */}
            <Cast cast={cast} />

            {/* similar movies */}
            <MovieList data={similarMovies} title='Similar Movie' hideSeeAll={true} />
        </ScrollView>
    )
}

export default MovieScreen;