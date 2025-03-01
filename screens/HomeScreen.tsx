import { Platform, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styles } from '../theme'
import TrendingMovies from '@/components/trendingMovies';
import { useState } from 'react';
import MovieList from '@/components/movieList';
import { router } from 'expo-router';
import Loading from '@/components/loading';

const ios = Platform.OS === 'ios';

const HomeScreen = () => {
    const [trendingMovies, setTrendingMovies] = useState([1,2,3,4]);
    const [upcomingMovies, setUpcomingMovies] = useState([1,2,3,4]);
    const [topRatedMovies, setTopRatedMovies] = useState([1,2,3,4]);
    const [loading, setLoading] = useState(false)

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
                    <TrendingMovies data={trendingMovies} />

                    {/* Upcoming Movie */}
                    <MovieList data={upcomingMovies} title='Upcoming Movie' hideSeeAll={false} />

                    {/* Top Rated Movie */}
                    <MovieList data={topRatedMovies} title='Top Rated Movie' hideSeeAll={false} />
                </ScrollView>
            )}
        </View>
    )
}

export default HomeScreen