import { styles } from '@/theme'
import { router } from 'expo-router';
import React from 'react'
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

var { width, height } = Dimensions.get('window');

const MovieList = ({ data, title, hideSeeAll }) => {
    const movie_name = 'Anti-Man and the Wasp: Quantumania';

    return (
        <View className='mb-8 space-y-4'>
            <View className='mx-4 flex-row justify-between items-center'>
                <Text className='text-white text-xl'>{title}</Text>
                {!hideSeeAll && (
                    <TouchableOpacity>
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
                                onPress={() => router.push('/movie', item)}
                            >
                               <View className='space-y-1 mr-4'>
                                    <Image 
                                        source={require('../assets/images/quantumania.jpeg')}
                                        className='rounded-3xl'
                                        style={{ width: width*0.33, height: height*0.22}}
                                    />
                                    <Text className='text-neutral-300 ml-1'>
                                        {movie_name?.length > 14? movie_name?.slice(0, 14)+'...': movie_name}
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