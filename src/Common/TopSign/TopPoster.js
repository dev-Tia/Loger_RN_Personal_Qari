import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  ScrollView
} from 'react-native';

import { iosWidth, deviceWidth, deviceHeight, whatsize } from '../CommonRule';

function TopPoster() {
    return <>
        <View style={topPoster.mom}>
            <Image style={topPoster.poster1}
              source={require('../../../assets/img/poster2.png')}>
            </Image>
        </View>

    </>
};

const topPoster = StyleSheet.create({
    mom:{    
        flex:0.1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        shadowColor: '#000',
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowOpacity: 0.37,
        shadowRadius:2.49,
        elevation: 12,
    },
    poster1:{
        flex:1,
        resizeMode: 'cover',   
        width: deviceWidth,
        
    }
});

export default TopPoster;