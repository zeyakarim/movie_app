import React from 'react'
import { Dimensions, Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
// import { useSharedValue } from "react-native-reanimated";
// import Carousel from "react-native-reanimated-carousel";


var { width, height } = Dimensions.get('window')

const TrendingMovies = ({ data }) => {
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
            {/* <Carousel
				autoPlayInterval={2000}
				data={data}
				height={258}
				loop={true}
				pagingEnabled={true}
				snapEnabled={true}
				width={width}
				style={{
					width: width*0.62,
				}}
				mode="parallax"
				modeConfig={{
					parallaxScrollingScale: 0.9,
					parallaxScrollingOffset: 50,
				}}
				onProgressChange={progress}
                renderItem={({item}) => <MovieCard item={item} /> }
				// renderItem={renderItem({ rounded: true })}
                
                
			/> */}
            {/* <Carousel
                autoPlayInterval={2000}
                data={data}
                height={258}
                loop={true}
                pagingEnabled={true}
                snapEnabled={true}
                width={width / itemsInView}
                style={{
                    width: width,
                    display: 'flex',
                    alignItems: 'center'
                }}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 50,
                }}
                onProgressChange={progress}
                renderItem={({ item }) => <MovieCard item={item} />}
            /> */}

        </View>

    )
}

export default TrendingMovies;


const MovieCard = ({item}) => {
    return (
        <TouchableWithoutFeedback>
            <Image 
                source={require('../assets/images/captainmarvel.jpg')}
                style={{ width: width*0.6, height: height*0.4 }}
                className='rounded-3xl'
            />
            {/* <Text>Hello</Text> */}
        </TouchableWithoutFeedback>
    )
}