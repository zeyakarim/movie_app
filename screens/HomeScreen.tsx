import { Platform, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styles } from '../theme'
import TrendingMovies from '@/components/trendingMovies';
import { useState } from 'react';

const ios = Platform.OS === 'ios';

const HomeScreen = () => {
    const [trendingMovies, setTrendingMovies] = useState([1,2,3,4]);

    return (
        <View className='flex-1 bg-neutral-800'>
            <SafeAreaView className={ios ? '-mb-2': 'mb-3'}>
                {/* <StatusBar style /> */}
                <View className='flex-row justify-between items-center mx-4'>
                    <Bars3CenterLeftIcon size={30} strokeWidth={2} color='white'  />
                    <Text className='text-white text-3xl font-bold'>
                        <Text style={styles.text}>M</Text>ovies
                    </Text>
                    <TouchableOpacity>
                        <MagnifyingGlassIcon size={30} color='white' />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 10 }}
            >
                {/* Trending movie carousel */}
                <TrendingMovies data={trendingMovies} />
            </ScrollView>
        </View>
    )
}

export default HomeScreen