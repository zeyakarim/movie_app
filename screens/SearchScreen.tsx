import Loading from '@/components/loading';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';

var { width, height } = Dimensions.get('window');

const SearchScreen = () => {
    const [results, setResults] = useState([1,2,3,4,5]);
    const [loading, setLoading] = useState(false);
    const movie_name = 'Anti-Man and the Wasp: Quantumania';

    return (
        <SafeAreaView className='bg-neutral-800 flex-1'>
            <View className='mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full'>
                <TextInput 
                    placeholder='Search Movie'
                    placeholderTextColor={'lightgray'}
                    className='pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider'
                />
                <TouchableOpacity 
                    onPress={() => router.push('/')}
                    className='rounded-full p-3 ml-1 bg-neutral-500'
                >
                    <XMarkIcon size={25} color='white' />
                </TouchableOpacity>
            </View>

            {/* results */}
            {loading ? (
                <Loading />
            ) : (
                results?.length > 0 ? (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 15}}
                        className='space-y-3'
                    >
                        <Text className='text-white font-semibold ml-1'>Results ({results?.length})</Text>
                        <View className='flex-row justify-between flex-wrap'>
                            {results?.map((item, index) => {
                                return (
                                    <TouchableWithoutFeedback
                                        key={index}
                                        onPress={() => router.push('/movie')}
                                    >
                                        <View className='space-y-2'>
                                            <Image 
                                                className='rounded-3xl'
                                                source={require('../assets/images/captainmarvel.jpg')}
                                                style={{width: width*0.44, height: height*0.3}}
                                            />
                                            <Text className='text-neutral-300 ml-1'>
                                                {movie_name?.length>22 ? movie_name?.slice(0,22)+'...' : movie_name}
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

export default SearchScreen;