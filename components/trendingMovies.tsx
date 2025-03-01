import React from 'react'
import { Dimensions, Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
// import { useNavigation } from '@react-navigation/native';
import { useNavigation } from 'expo-router';

var { width, height } = Dimensions.get('window');

interface Movie {
    id: number;
    title: string;
    // Add other relevant properties
}

interface TrendingMoviesProps {
    data: Movie[];
}

const TrendingMovies: React.FC<TrendingMoviesProps> = ({ data }) => {
    // const progress = useSharedValue<number>(0);
    // const itemsInView = 2;

    return (
        <View className='mb-8'>
            <Text className='text-white text-xl mx-4 mb-5'>Trending</Text>
            <Carousel 
                data={data}
                renderItem={({item}) => <MovieCard item={item} /> }
                firstItem={1}
                inactiveSlideOpacity={0.60}
                sliderWidth={width}
                itemWidth={width*0.62}
                slideStyle={{ display: 'flex', alignItems: 'center'}}
            />
        </View>

    )
}

export default TrendingMovies;

interface MovieCardProps {
    item: Movie
}

const MovieCard: React.FC<MovieCardProps> = ({item}) => {
    const navigation = useNavigation()

    const handleClick = () => {
        navigation.navigate('Movie', item)
    }
    return (
        <TouchableWithoutFeedback onPress={handleClick}>
            <Image 
                source={require('../assets/images/captainmarvel.jpg')}
                style={{ width: width*0.6, height: height*0.4 }}
                className='rounded-3xl'
            />
            {/* <Text>Hello</Text> */}
        </TouchableWithoutFeedback>
    )
}