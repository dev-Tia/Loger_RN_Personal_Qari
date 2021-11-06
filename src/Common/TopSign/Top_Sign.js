import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Linking,
} from 'react-native';
import {
  font,
  color,
  btn,
  deviceWidth,
  deviceHeight,
  whatsize,
} from '../CommonRule';
import {GetCorona} from '../../../Function/Async';

const Top_Sign = (React.memo = () => {
  const [data, setData] = useState();
  const [subData, setSubData] = useState();

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  useEffect(() => {
    let mounted = true;
    var x = '';
    async function getdata() {
      x = await GetCorona();
      setData(JSON.parse(x)[0]);
      setSubData(JSON.parse(x)[1]);
    }
    getdata();
    return () => (mounted = false);
  }, []);

  return (
    <>
      <View style={top_sign.mom}>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://www.gwangju.go.kr/c19/')}>
          <View style={top_sign.title_Box}>
            <Image
              style={top_sign.title_img}
              source={require('../../../assets/img/touch.png')}></Image>
            <Text
              style={top_sign.title_txt}
              adjustsFontSizeToFit
              numberOfLines={0}>
              상황판
            </Text>
          </View>
          <View style={top_sign.sub_Box}>
            <Image
              style={top_sign.sub_img}
              source={require('../../../assets/img/ciren.png')}></Image>
            <View style={top_sign.sub_txt_box}>
              <Text
                style={top_sign.sub_time}
                adjustsFontSizeToFit
                numberOfLines={0}>
                {year}년 {month} 월 {date} 일
              </Text>
              <Text
                style={top_sign.sub_all}
                adjustsFontSizeToFit
                numberOfLines={0}>
                전국 현황:{' '}
                <Text
                  style={top_sign.sub_all_count}
                  adjustsFontSizeToFit
                  numberOfLines={0}>
                  {' '}
                  {data && data['korea']['newCase']}{' '}
                </Text>
                <Text style={top_sign.sub_all}>명</Text>
              </Text>
              <Text
                style={top_sign.sub_gj}
                adjustsFontSizeToFit
                numberOfLines={0}>
                어제 대비:{' '}
                <Text
                  style={top_sign.sub_gj_count}
                  adjustsFontSizeToFit
                  numberOfLines={0}>
                  {' '}
                  {subData && subData['TotalCaseBefore'] > 0 ? '+' : ''}
                  {subData && subData['TotalCaseBefore']}{' '}
                </Text>
                <Text
                  style={top_sign.sub_gj}
                  adjustsFontSizeToFit
                  numberOfLines={0}>
                  {' '}
                  명
                </Text>
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
});

const top_sign = StyleSheet.create({
  mom: {
    //flex:0.22
    height: deviceHeight * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.gray,
    flexDirection: 'column',
    width: deviceWidth,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  title_Box: {
    flex: 1,
    backgroundColor: '#2A5FC1',
    width: deviceWidth,
    height: deviceHeight * 0.04,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title_img: {
    resizeMode: 'contain',
    width: deviceWidth * 0.03,
    height: deviceHeight * 0.03,
  },
  title_txt: {
    marginLeft: '5%',
    fontSize: whatsize.small,
    color: color.white,
  },
  sub_Box: {
    flex: 3,
    backgroundColor: '#4498D9',
    width: deviceWidth,
    height: whatsize.xlarge * 4.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sub_img: {
    flex: 0.1,
    resizeMode: 'contain',
    width: whatsize.xlarge * 2.5,
    height: whatsize.xlarge * 2.5,
  },
  sub_txt_box: {
    flex: 0.6,
    height: '90%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  sub_time: {
    flex: 1,
    fontSize: whatsize.mini,
    color: color.white,
  },
  sub_gj: {
    flex: 1,
    color: color.white,
    fontSize: whatsize.mini * 0.9,
  },
  sub_gj_count: {
    color: '#FFE400',
    fontSize: whatsize.medium,
  },
  sub_all: {
    flex: 1,
    color: color.white,
    fontSize: whatsize.mini * 0.9,
  },
  sub_all_count: {
    color: '#FFE400',
    fontSize: whatsize.medium,
  },
});

export default Top_Sign;
