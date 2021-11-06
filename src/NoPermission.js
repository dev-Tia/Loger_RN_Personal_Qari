import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  BackHandler,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  font,
  color,
  btn,
  deviceWidth,
  deviceHeight,
} from '../src/Common/CommonRule';
import RNExitApp from 'react-native-exit-app';
const NoPerMission = () => {
  return (
    <>
    
      <View style={noPerMission.mom}>
        <Text style={[noPerMission.top]}>위치 권한 설정 거부</Text>
        <TouchableOpacity style={noPerMission.touchbox}>
          <Image
            style={noPerMission.top_img}
            source={require('../assets/img/splash_qr.png')}></Image>
        </TouchableOpacity>
        <Text style={noPerMission.sub}>
          권한 설정을 위해 {'\n'}앱을 다시 실행해 주세요
        </Text>
        <TouchableOpacity
          style={noPerMission.PhoneSubmit}
          onPress={() => {
            RNExitApp.exitApp();

            //BackHandler.exitApp();
          }}>
          <Text style={noPerMission.PhoneSubmitText}>종료하기</Text>
        </TouchableOpacity>
        <Image
          style={noPerMission.bottom_img}
          source={require('../assets/img/Gwangju.png')}></Image>
      </View>
    </>
  );
};

const noPerMission = StyleSheet.create({
  mom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white,
    flexDirection: 'column',
  },

  touchbox: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  top_img: {
    resizeMode: 'contain',
    width: deviceWidth * 0.4,
    height: deviceHeight * 0.4,
  },

  bottom_img: {
    resizeMode: 'contain',
    marginTop: '9%',
    marginBottom: '20%',
  },
  top: {
    fontWeight: 'bold',
    fontSize: 15,
    color: color.gray,
    marginBottom: '3%',
    textAlign: 'center',
  },

  sub: {
    fontWeight: 'bold',
    fontSize: 22,
    color: color.gray,
    marginBottom: '3%',
    textAlign: 'center',
  },

  title: {
    fontSize: deviceWidth * 0.14,
    textAlign: 'center',
    color: color.gray,
    width: '50%',
    height: '50%',
  },

  PhoneSubmit: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.red,
    borderRadius: 5,
    elevation: 5,
  },

  PhoneSubmitText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: color.white,
    marginBottom: '3%',
    textAlign: 'center',
  },
});

export default NoPerMission;
