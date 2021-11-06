import AsyncStorage from '@react-native-community/async-storage';

import {StackActions} from '@react-navigation/native';
import {InteractionManager} from 'react-native';
import {Axios_Url, Axios_Corona_New, Axios_Corona} from './Axios';
//! 초기값 저장 개인 인증 후 mac 값 있을 시 lat,lon,time 업데이트
const SetLocation = async ({data, navigation}) => {
  var getValue = '';
  const jsonValue = JSON.stringify(data);
  console.log('----- 초기값 자동으로 넣기전에 이렇게 생겼어요!!!');
  console.log(jsonValue);
  const value = await AsyncStorage.getItem('CurrentLocation');
  if (value !== null) {
    getValue = JSON.parse(value);
  }
  try {
    // 받아온 값 집어넣기
    // 컨텐스트로 해도 상관없지만 스토리지에 넣어도 편할것 같음
    if (!getValue.mac) {
      await AsyncStorage.setItem('CurrentLocation', jsonValue);
      navigation.dispatch(StackActions.replace('Terms'));
    } else {
      console.log('mac값 있음 ');
      getValue.lat = data.lat;
      getValue.lon = data.lon;
      getValue.time_Now = data.time_Now;
      await AsyncStorage.setItem('CurrentLocation', JSON.stringify(getValue));
      navigation.dispatch(StackActions.replace('QR_Camera'));

      console.log(getValue);
    }
  } catch (e) {
    console.log(e);
  }
};

//! 받아온 초기값 + mac 핸드폰 번호 저장
const addLocationValue = async ({TempData}) => {
  console.log('addLocationValue', TempData);
  const jsonValue = JSON.stringify(TempData);
  try {
    await AsyncStorage.setItem('CurrentLocation', jsonValue);
    console.log('addLocationValue = Done.');
  } catch (e) {
    // save error
    console.log(e);
  }
};
//! 기기에 대한 위치 및 mac 핸드폰 번호 데이터 획득
const getLocation = async ({setGeoGet}) => {
  try {
    const value = await AsyncStorage.getItem('CurrentLocation');
    if (value !== null) {
      let jsonValue = JSON.parse(value);
      setGeoGet(jsonValue);
      return;
    } else {
      console.log('getLocation 값이 없어요!');
      return 'null';
    }
  } catch (e) {
    console.log('에러예요!');
    return 'error';
  }
};

//! QR체크 후 데이터 저장
const SetRecords = async ({data, reset}) => {
  const jsonValue = JSON.stringify(data);
  try {
    let getValue = '';
    // 받아온 값 집어넣기
    // 컨텐스트로 해도 상관없지만 스토리지에 넣어도 편할것 같음
    const value = await AsyncStorage.getItem('Records');
    if (value !== null) {
      getValue = JSON.parse(value);
    }
    if (value == null) {
      await AsyncStorage.setItem('Records', jsonValue);
    } else if (value !== null) {
      //getValue.concat(data);
      if (reset) {
        await AsyncStorage.setItem('Records', jsonValue);
        console.log('reset OK');
      } else {
        await AsyncStorage.setItem(
          'Records',
          JSON.stringify(data.concat(JSON.parse(value))),
        );
      }
    }
  } catch (e) {
    console.log(e);
  }
};

//! 매장방문기록 Get
const GetRecords = async ({setRecords}) => {
  try {
    const value = await AsyncStorage.getItem('Records');
    if (value !== null) {
      let jsonValue = JSON.parse(value);
      console.log('GetRecords value', jsonValue.length);
      setRecords(jsonValue.length == 0 ? null : jsonValue);
      return;
    } else {
      console.log('GetRecords 값이 없어요!');
      return 'null';
    }
  } catch (e) {
    console.log('에러예요!');
    return 'error';
  }
};

//! URL 저장
const SetUrl = async () => {
  var Axios_Value = '';
  //await Axios_Url();
  Axios_Value = await new Axios_Url();
  //console.log('Axios_Url()', await new Axios_Url({Axios_Value: Axios_Value}));
  console.log('Axios_Value = ', Axios_Value);
  const jsonValue = JSON.stringify(Axios_Value);
  console.log('깃허브 Url = ', jsonValue);
  try {
    await AsyncStorage.setItem('Url', jsonValue);
  } catch (e) {
    await AsyncStorage.setItem('Url', 'error');
  }
};

const getUrl = async () => {
  var result = '';
  try {
    const _value = await AsyncStorage.getItem('Url');
    if (_value !== null) {
      //console.log('getData : ' + JSON.parse(_value).CurrentServer);
      if (JSON.parse(_value) == undefined) {
        result = 'error';
      } else {
        result = JSON.parse(_value);
      }
    } else {
      console.log('getUrl 값이 없어요!');
      result = 'error';
    }
  } catch (e) {
    result = 'error';
  }
  return result;
};

//! URL 저장
const SetNotice = async ({notice}) => {
  var getdata = notice;
  var now = parseInt(Date.now());
  const value = JSON.stringify([now, getdata]);
  try {
    await AsyncStorage.setItem('Notice', value);
  } catch (e) {
    await AsyncStorage.setItem('Notice', 'error');
  }
};

//! URL 불러옴
const GetNotice = async () => {
  var result = '';
  try {
    const _value = await AsyncStorage.getItem('Notice');
    if (_value !== null) {
      result = _value;
    } else {
      result = 'null';
    }
  } catch (e) {
    result = 'error';
  }

  return result;
};

const SetCorona = async () => {
  var dataA = '';
  var dataB = '';
  dataA = await Axios_Corona_New();
  dataB = await Axios_Corona();

  const value = JSON.stringify([dataA, dataB]);
  try {
    await AsyncStorage.setItem('Corona', value);
  } catch (e) {
    await AsyncStorage.setItem('Corona', 'error');
  }
};

const GetCorona = async () => {
  var result = '';
  try {
    const _value = await AsyncStorage.getItem('Corona');
    if (_value !== null) {
      result = _value;
    } else {
      result = 'null';
    }
  } catch (e) {
    result = 'error';
  }

  return result;
};

const getValue = async (key) => {
  try {
    const _value = await AsyncStorage.getItem(key);
    if (_value !== null) {
      console.log('getData : ' + _value);
    } else {
      console.log('getValue 값이 없어요!');
    }
  } catch (e) {}
};

const getAllKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    // read key error
  }

  console.log(keys);
  // example console.log result:
  // ['@MyApp_user', '@MyApp_key']
};

const addValue = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // save error
  }
  console.log('Done.');
};

const removeValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
  }
  console.log('Done.');
};

const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }
  console.log('clearAll Done.');
};

export {
  SetLocation,
  getLocation,
  addLocationValue,
  SetRecords,
  GetRecords,
  SetUrl,
  getUrl,
  SetNotice,
  GetNotice,
  SetCorona,
  GetCorona,
  clearAll,
};
