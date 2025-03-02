import { fallbackPersonImage, image185 } from '@/api/moviedb';
import { router } from 'expo-router';
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Cast = ({ cast }) => {

    return (
        <View className='my-6 '>
            <Text className='text-white text-lg mx-4 mb-5'>Top Cast</Text>
            <ScrollView 
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 15,marginLeft:5}}
            >
                {cast && cast?.map((person, index) => {
                    return (
                        <TouchableOpacity 
                            key={index}
                            className='mr-4 items-center'
                            onPress={() => router.push({
                                pathname: '/person',
                                params: { person: JSON.stringify(person) }
                            })}
                        >
                            <View className='overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500'>
                                <Image 
                                    className='rounded-2xl'
                                    // source={require('../assets/images/johnwick.jpeg')}
                                    source={{uri: image185(person?.profile_path) || fallbackPersonImage}}
                                    style={{height:96, width:80}}
                                />
                            </View>
                            <Text className='text-white text-xs mt-1'>
                                {person?.character?.length>10 ? person?.character?.slice(0,10)+'...': person?.character}
                            </Text>
                            <Text className='text-neutral-400 text-xs mt-1'>
                                {person?.original_name?.length>10 ? person?.original_name?.slice(0,10)+'...': person?.original_name}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default Cast;