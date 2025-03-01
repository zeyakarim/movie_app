import { Platform, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styles } from '../theme'
import TrendingMovies from '@/components/trendingMovies';
import { useEffect, useState } from 'react';
import MovieList from '@/components/movieList';
import { router } from 'expo-router';
import Loading from '@/components/loading';
import { fetchTrendingMovies, fetchUpcomingMovies, fetchTopRatedMovies } from '../api/moviedb'

const ios = Platform.OS === 'ios';

const HomeScreen = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, [])

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        if (data && data?.results) setTrendingMovies(data?.results);
        setLoading(false)
    }

    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies();
        if (data && data?.results) setUpcomingMovies(data?.results);
    }

    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        if (data && data?.results) setTopRatedMovies(data?.results);
    }

    return (
        <View className='flex-1 bg-neutral-800'>
            <SafeAreaView className={ios ? '-mb-2': 'mb-3'}>
                {/* <StatusBar style /> */}
                <View className='flex-row justify-between items-center mx-4'>
                    <Bars3CenterLeftIcon size={30} strokeWidth={2} color='white'  />
                    <Text className='text-white text-3xl font-bold'>
                        <Text style={styles.text}>M</Text>ovies
                    </Text>
                    <TouchableOpacity onPress={() => router.push('/search')}>
                        <MagnifyingGlassIcon size={30} color='white' />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {loading ? (
                <Loading />
            ) : (
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 10 }}
                >
                    {/* Trending movie carousel */}
                    {trendingMovies?.length > 0 && <TrendingMovies data={trendingMovies} /> }

                    {/* Upcoming Movie */}
                    {upcomingMovies?.length > 0 && <MovieList data={upcomingMovies} title='Upcoming Movie' hideSeeAll={false} /> }

                    {/* Top Rated Movie */}
                    <MovieList data={topRatedMovies} title='Top Rated Movie' hideSeeAll={false} />
                </ScrollView>
            )}
        </View>
    )
}

export default HomeScreen