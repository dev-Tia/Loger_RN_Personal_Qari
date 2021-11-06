import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
  ScrollView,
  InteractionManager,
  BackHandler,
  Platform,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {color, btn, deviceWidth, deviceHeight, whatsize} from '../src/Common/CommonRule';
import Float_Button from './Float_Button';
import {getLocation} from '../Function/Async';
import { defined } from 'react-native-reanimated';
import { ColorAndroid } from 'react-native/Libraries/StyleSheet/PlatformColorValueTypesAndroid';

function Terms() {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      getLocation({setGeoGet: setData});
    }).then(() => {
      setLoading(true);
    });
  }, [isLoading]);
  useEffect(() => {
    if (data !== undefined) {
      console.log('Terms data Check = ', data);
    } else {
    }
  }, [data]);
  return (
    <> 

      <View style={terms.mom}>
        <View style={terms.top}>
          <Image
            style={terms.logo}
            source={require('../assets/img/qr_icon.png')}></Image>
          <Text style={terms.logo_txt}>개인정보 보호 약관</Text>
        </View>

        <View style={terms.middle}>
          <ScrollView>
            <Text style={terms.txt}>
              이 앱의 개인정보는 외부로 절대 노출되지 않으며,
              Loger도 알 수 없습니다. 개인인증 한 휴대폰 번호는 인증 후, 바로
              삭제 됩니다. Loger는 어떠한 개인정보도 수집, 이용, 판매, 사용하지
              않습니다.
            </Text>
          </ScrollView>
        </View>
        <View style={terms.bottom_box}>
          <TouchableOpacity
            style={terms.terms_btn}
            onPress={() => {
              BackHandler.exitApp();
            }}>
            <Text style={[terms.btn_txt, {color: 'black'}]}>뒤로가기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[terms.terms_btn, {backgroundColor:color.red}]}
            onPress={() => {
              navigation.navigate('Check');
            }}>
            <Text style={terms.btn_txt}>동의하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const terms = StyleSheet.create({
  mom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white,
    flexDirection: 'column',
  },

  top: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: deviceWidth * 0.75,
    height: deviceWidth * 0.15,
    marginTop: deviceWidth * 0.1,
  },

  logo: {
    height: deviceWidth * 0.07,
    width: deviceWidth * 0.07,
    resizeMode: 'contain',
    marginRight:'10%',
  },

  logo_txt: {
    flex: 8,   
    color: color.black,
    fontSize: whatsize.medium,
    fontWeight: 'bold'
  },

  middle: {
    flex: 3,
    marginTop: deviceWidth * 0.06,
    width: deviceWidth * 0.7,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  txt: {
    textAlign: 'left',
    color: color.black,
    fontSize: whatsize.mini * 0.8,
  },

  bottom_box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    width: deviceWidth  *0.7,
    height: deviceHeight * 0.07,
    marginTop: deviceHeight * 0.05,
    marginBottom: deviceHeight * 0.05,
  },

  terms_btn: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset:{
      width:0,
      height:6,
    },
    shadowOpacity: 0.37,
    shadowRadius:7.49,
    elevation: 12,
    borderRadius: btn.radius,
    borderColor: btn.b_color,
    backgroundColor: btn.btn_w,
    width: deviceWidth * 0.29
  },

  btn_txt: {
    textAlign: 'center',
    fontSize: whatsize.small,
    color: color.white,
  },
    
});

export default Terms;
