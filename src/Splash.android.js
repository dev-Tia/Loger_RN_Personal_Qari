import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  Image,
  InteractionManager,
  Alert,
} from 'react-native';
import {
  font,
  color,
  deviceWidth,
  deviceHeight,
  whatsize,
} from './Common/CommonRule';
import {Notice_Axios} from '../Function/Axios';
import {getLocation, SetUrl, SetCorona} from '../Function/Async.js';
import {
  check,
  checkMultiple,
  request,
  requestMultiple,
  PERMISSIONS,
  openSettings,
  checkNotifications,
  RESULTS,
  requestNotifications,
} from 'react-native-permissions';

import Geo from '../Function/GEO';

import {useNavigation} from '@react-navigation/native';

function Splash() {
  const navigation = useNavigation();

  const [GeoGet, setGeoGet] = useState();

  useEffect(() => {
    SetUrl();
    Notice_Axios();
    SetCorona();
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            {
              console.log(
                'This feature is not available (on this device / in this context)',
              );
            }
            break;
          case RESULTS.DENIED:
            {
              console.log(
                'The permission has not been requested / is denied but requestable',
              );
              request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(
                (result) => {
                  console.log(RESULTS.DENIED + 'After' + result);
                  if (RESULTS.GRANTED) {
                    getLocation({setGeoGet: setGeoGet});
                    Geo({navigation: navigation});
                  }
                },
              );
            }
            break;
          case RESULTS.GRANTED:
            {
              getLocation({setGeoGet: setGeoGet});
              Geo({navigation: navigation});

              console.log('The permission is granted');
            }
            break;
          case RESULTS.BLOCKED:
            InteractionManager.runAfterInteractions(() => {
              Alert.alert(
                '위치 권한 설정 필요',
                '앱 설정 화면에서 권한을 허용 해 주세요.\n(확인시 에플리케이션 정보 화면으로\n 이동합니다.)',
                [
                  {
                    text: '확인',
                    onPress: () => {
                      openSettings().catch(() =>
                        console.warn('cannot open settings'),
                      );
                    },
                    style: 'cancel',
                  },
                  {text: '취소', onPress: () => {}, style: 'cancel'},
                ],
              );
              console.log(
                'The permission is denied and not requestable anymore',
              );
              Geo({navigation: navigation});
            });
            break;
        }
      })
      .catch((error) => {
        console.log('App.js = ', error);
      });
  }, []);

  return (
    <View style={splash.mom}>
      <Image
        style={splash.title}
        source={require('../assets/img/qr_code_txt2.png')}></Image>
      <Image
        style={splash.sub}
        source={require('../assets/img/qr_code_txt.png')}></Image>

      <TouchableOpacity style={splash.touchbox}>
        <Image
          style={splash.top_img}
          source={require('../assets/img/splash_cat.png')}></Image>
      </TouchableOpacity>
      <Image
        style={splash.name}
        source={require('../assets/img/qari_txt.png')}></Image>
        <Text> ver. 1.0.1 (20)</Text>
      {/*     
      <Image
        style={splash.bottom_img}
        source={require('../assets/img/splash_1.png')}></Image> */}
    </View>
  );
}

const splash = StyleSheet.create({
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
    marginTop: '2%',
    marginBottom: '10%',
    width: deviceWidth * 0.5,
    height: deviceHeight * 0.2,
  },

  bottom_img: {
    resizeMode: 'contain',
    width: deviceWidth,
    height: deviceHeight * 0.1,
    marginTop: '2%',
    marginBottom: '8%',
  },

  sub: {
    resizeMode: 'contain',
    width: deviceWidth,
    height: deviceHeight * 0.03,
    marginBottom: '10%',
  },

  title: {
    resizeMode: 'contain',
    width: deviceWidth,
    height: deviceHeight * 0.03,
    marginBottom: '5%',
  },
  name: {
    resizeMode: 'contain',
    width: deviceWidth,
    height: deviceHeight * 0.05,
    marginBottom: '1%',
  },
});

export default Splash;
