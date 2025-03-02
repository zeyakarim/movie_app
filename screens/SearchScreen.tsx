import Loading from '@/components/loading';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { debounce } from 'lodash';
import { fallbackMoviePoster, image185, searchMovies } from '@/api/moviedb';

var { width, height } = Dimensions.get('window');

interface SearchResults {
    poster_path: string;
    title: string;
    // Add other expected properties
}

const SearchScreen = () => {
    const [results, setResults] = useState<SearchResults[]>([]);
    const [loading, setLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleSearch = (value: string) => {
        if (value && value?.length>2) {
            setLoading(true);
            searchMovies({
                query: value, 
                include_adult: 'false',
                language: 'en-US',
                page: '1'
            }).then((data) => {
                setLoading(false)
                if (data && data?.results) setResults(data?.results)
            })
        } else {
            setLoading(false);
            setResults([]);
        }
    }

    // 400 milliseconds
    // because empty array it call once
    const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])

    return (
        <SafeAreaView className='bg-neutral-800 flex-1'>
            <View 
                className={`mx-4 mb-3 flex-row justify-between items-center border ${
                    isFocused ? "border-blue-500" : "border-neutral-500"
                } rounded-full`}
            >
                <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder='Search Movie'
                    placeholderTextColor={'lightgray'}
                    className='pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider border-none outline-none'
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
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
                        <View className='flex-row justify-between flex-wrap gap-4 mt-2'>
                            {results?.map((item, index) => {
                                return (
                                    <TouchableWithoutFeedback
                                        key={index}
                                        onPress={() => router.push({
                                            pathname: '/movie',
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

export default SearchScreen;