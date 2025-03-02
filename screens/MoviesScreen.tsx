import Loading from '@/components/loading';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { fallbackMoviePoster, fetchTopRatedMovies, fetchUpcomingMovies, image185, searchMovies } from '@/api/moviedb';
import { styles } from '@/theme';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const verticalMargin = ios ? '': 'my-3';

interface Movies {
    id: number;
    poster_path: string;
    title: string;
    // Add other expected properties
}

interface MoviesScreenProps {
    title: string;
}

const MoviesScreen: React.FC<MoviesScreenProps> = ({ title }) => {
    const [movies, setMovies] = useState<Movies[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        getMovies();
    }, [])

    const getMovies = async () => {
        const getFunction = title === 'Upcoming Movie' ? fetchUpcomingMovies : fetchTopRatedMovies;
        const data = await getFunction();
        setLoading(false);
        if (data && data?.results) setMovies(data?.results)
    }

    return (
        <SafeAreaView className='bg-neutral-800 flex-1'>
            <SafeAreaView className={'z-20 w-full flex-row justify-between items-center py-2 px-4'+verticalMargin}>
                <TouchableOpacity className='rounded-xl p-1 ml-2' style={styles.background} onPress={() => router.back()}>
                    <ChevronLeftIcon size={28} strokeWidth={2.5} color='white' />
                </TouchableOpacity>
                <Text className='text-white text-xl pr-2'>{title}</Text>
            </SafeAreaView>

            {/* movies */}
            {loading ? (
                <Loading />
            ) : (
                movies?.length > 0 ? (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 15}}
                        className='space-y-3 mt-3'
                    >
                        <Text className='text-white font-semibold ml-1'>Results ({movies?.length})</Text>
                        <View className='flex-row justify-between flex-wrap gap-4 mt-2'>
                            {movies?.map((item, index) => {
                                return (
                                    <TouchableWithoutFeedback
                                        key={index}
                                        onPress={() => router.push({
                                            pathname: `/movies/${item?.id}`,
                                            params: { item: JSON.stringify(item) }
                                        })}
                                    >
                                        <View className='space-y-2'>
                                            <Image 
                                                className='rounded-3xl'
                                                // source={require('../assets/images/captainmarvel.jpg')}
                                                source={{uri: image185(item?.poster_path) || fallbackMoviePoster}}
                                                style={{width: width*0.44, height: height*0.3}}
                                            />
                                            <Text className='text-neutral-300 ml-1'>
                                                {item?.title?.length>22 ? item?.title?.slice(0,22)+'...' : item?.title}
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            })}
                        </View>
                    </ScrollView>
                ) : (
                    <View className='flex-row justify-center'>
                        <Image
                            source={require('../assets/images/movieTime.jpg')}
                            className='h-96 w-96'
                            style={{height:384, width: 384}}
                        />
                    </View>
                ) 
            )}
        </SafeAreaView>
    )
}

export default MoviesScreen;