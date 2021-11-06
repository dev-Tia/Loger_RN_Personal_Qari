import Geolocation from 'react-native-geolocation-service';
import {
  InteractionManager,
  PermissionsAndroid,
  Platform,
  Alert,
  BackHandler,
} from 'react-native';
import {SetLocation, getLocation_Start} from './Async.js';
import {StackActions} from '@react-navigation/native';

// async function requestPermissions() {
//   if (Platform.OS === 'ios') {
//     Geolocation.requestAuthorization('whenInUse');
//   }

//   if (Platform.OS === 'android') {
//     await requestLocationPermission();
//     await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//     );
//   }
// }

// const requestLocationPermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS
//         .ACCESS_FINE_LOCATION /* ,
//       {
//         title: 'App LOCATION Permission',
//         message:
//           'Qari needs access to your LOCATION' +
//           '위치정보 미제공시 앱 사용이 불안정 합니다.',
//         buttonNeutral: 'Ask Me Later',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       }, */,
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('1.Set_GeoArray You can use the LOCATION');
//     } else {
//       console.log('1.Set_GeoArray LOCATION permission denied');
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// };

const Set_GeoArray = ({navigation}) => {
  console.log('1.Set_GeoArray 시작');
  console.log('1.Set_GeoArray Platform.os = ', Platform.OS);
  var pos = '';
  /*  requestPermissions()
    .then(() => { */
  Geolocation.getCurrentPosition(
    (position) => {
      console.log('1.Set_GeoArray Geolocation.watchPosition 시작', position);

      var lat = position['coords']['latitude'];
      var lon = position['coords']['longitude'];
      var time_Now = (position['timestamp'] - 1000).toString().substring(0, 10);

      pos = {
        lat: lat,
        lon: lon,
        time_Now: time_Now,
      };
      SetLocation({data: pos, navigation: navigation});
    },
    (error) => {
      console.log(error.code, error.message);
      //! pos 데이터 임의로 지정
      var tiem = new Date();

      pos = {
        lat: 35.14745837064882,
        lon: 126.85345092681068,
        time_Now: tiem.getTime(),
      };
      SetLocation({data: pos, navigation: navigation});
      //navigation.dispatch(StackActions.replace('NoPermission'));
    },
  ),
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000};
  /*  })
    .catch((err) => {
      console.log(err.code, err.message);
    }); */
};

export default Set_GeoArray;
