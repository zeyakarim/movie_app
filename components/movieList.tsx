import { fallbackMoviePoster, image185 } from '@/api/moviedb';
import { styles } from '@/theme'
import { router } from 'expo-router';
import React from 'react'
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

var { width, height } = Dimensions.get('window');
interface Movie {
    id: number;
    title: string;
    poster_path: string;
    // Add other relevant properties
}

interface MovieListsProps {
    data: Movie[];
    title: string;
    hideSeeAll: boolean;
}

const MovieList: React.FC<MovieListsProps> = ({ data, title, hideSeeAll }) => {

    const handleMovies = () => {
        router.push({
            pathname: '/movies',
            params: { title: title }
        })
    }

    return (
        <View className='mb-8 space-y-4'>
            <View className='mx-4 flex-row justify-between items-center'>
                <Text className='text-white text-xl'>{title}</Text>
                {!hideSeeAll && (
                    <TouchableOpacity onPress={handleMovies}>
                        <Text style={styles.text} className='text-lg'>See All</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* movie row */}
            <ScrollView 
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {
                    data?.map((item, index) => {
                        return (
                            <TouchableWithoutFeedback 
                                key={index}
                                onPress={() => router.push({
                                    pathname: `/movies/${item?.id}`,
                                    params: { item: JSON.stringify(item) }
                                })}
                            >
                               <View className='space-y-1 mr-4'>
                                    <Image 
                                        // source={require('../assets/images/quantumania.jpeg')}
                                        source={{ uri: image185(item?.poster_path) || fallbackMoviePoster}}
                                        className='rounded-3xl'
                                        style={{ width: width*0.33, height: height*0.22}}
                                    />
                                    <Text className='text-neutral-300 ml-1'>
                                        {item?.title?.length > 14? item?.title?.slice(0, 14)+'...': item?.title}
                                    </Text>
                               </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

export default MovieList