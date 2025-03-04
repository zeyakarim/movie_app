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
import { fallbackMoviePoster, fetchMostPopularMovies, fetchMovieCredits, fetchMovieDetails, image500 } from '@/api/moviedb';

var { width, height } = Dimensions.get('window')
const ios = Platform.OS === 'ios';
const topMargin = ios ? '': 'mt-3';

interface MovieProps {
    item: { id: number };
    // Add other expected properties
}

interface Genre {
    name: string;
}
interface Movie {
    id: number;
    primaryTitle: string;
    poster_path: string;
    status: string;
    release_date: string;
    runtime: number;
    genres: Genre[];
    overview: string;
    primaryImage: string;
    releaseDate: string;
    runtimeMinutes: number;
    description: string;
    // Add other relevant properties
}

const MovieDetailsScreen: React.FC<MovieProps> = ({ item }) => {
    const [isFavourate, setIsFavourate] = useState(false);
    const [cast, setCast] = useState([])
    const [mostPopularMovies, setMostPopularMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        setLoading(true);
        getMovieDetails(item?.id);
        getMovieCredits(item?.id);
        getPopularMovies(item?.id)
    }, [item])

    const getMovieDetails = async (id: number) => {
        const data = await fetchMovieDetails(id)
        if (data) setMovie(data)
        setLoading(false)
    }

    const getMovieCredits = async (id: number) => {
        const data = await fetchMovieCredits(id)
        if (data) setCast(data)
    }

    const getPopularMovies = async (id: number) => {
        const data = await fetchMostPopularMovies()
        if (data) setMostPopularMovies(data)
    }

    const description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nam voluptatibus nobis dolore harum. Odio, possimus est saepe recusandae iste nulla amet, quis earum commodi vel nesciunt quisquam laborum voluptate?'

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
                            // source={require('../assets/images/quantumania.jpeg')}
                            source={{uri: movie?.primaryImage || fallbackMoviePoster}}
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
                    {movie?.primaryTitle}
                </Text>

                {movie?.id ? (
                    <Text className='text-neutral-400 font-semibold text-base text-center'>
                        {new Date().toISOString().split("T")[0] > movie?.releaseDate ? "Released" : "Not Released"} • {movie?.releaseDate?.split('-')[0]} • {movie?.runtimeMinutes} min
                    </Text>
                ) : null}

                {/* genres */}
                <View className='flex-row justify-center mx-4 space-x-2'>
                    {movie?.genres?.map((genre, index) => {
                        let showDot = index + 1 !== movie?.genres?.length
                        return (
                            <Text key={index} className='text-neutral-400 font-semibold text-base text-center'>
                                {genre} {showDot ? '•': null}
                            </Text>
                        )
                    })}
                </View>

                <Text className='text-neutral-400 mx-4 tracking-wide'>
                    
                    {movie?.description || description}
                </Text>
            </View>

            {/* cast */}
            {cast?.length > 0 && <Cast cast={cast} /> }

            {/* similar movies */}
            {mostPopularMovies?.length > 0 && <MovieList data={mostPopularMovies} title='Most Popular Movie' hideSeeAll={true} /> }
        </ScrollView>
    )
}

export default MovieDetailsScreen;