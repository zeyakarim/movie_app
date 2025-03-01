import { theme } from '@/theme';
import React from 'react'
import { Dimensions, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';

var { width, height } = Dimensions.get('window');

const Loading = () => {
    return (
        <View style={{height, width}} className='absolute flex-row justify-center items-center'>
            <Progress.CircleSnail
                size={160}
                // indeterminate={true}
                thickness={12}
                color={theme.background}
            />
        </View>
    )
}

export default Loading;