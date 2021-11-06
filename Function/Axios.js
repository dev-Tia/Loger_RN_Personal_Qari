import axios from 'axios';
import {Alert, InteractionManager} from 'react-native';
import {SetRecords, SetNotice, GetNotice} from './Async';
import Url_List from '../src/Common/Url_List';
import {setupCache} from 'axios-cache-adapter';

const cache = setupCache({
  maxAge: 0,
});

// Create `axios` instance passing the newly created `cache.adapter`
const api = axios.create({
  adapter: cache.adapter,
});

async function NoticeGet() {
  return await GetNotice();
}

const Notice_Axios = async () => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  /*   axios.get(
    'https://hero-loger.github.io/Loger_JSON/JSON/ytt/notification.json',
    {
      cancelToken: source.token,
    },
  ); */
  await api({
    url: (await Url_List()).Notice,
    method: 'get',
    cancelToken: source.token,
  })
    .then(async function (response) {
      var Notice = await NoticeGet();
      Notice = JSON.parse(Notice);
      var now = parseInt(Date.now() / 1000);
      var TempNotice = response.data;
      //! 공지 갯수만큼 for 문
      for (var i = 0; i < response.data.length; i++) {
        //! 기존 async에 값 확인
        //! async에 값이 있을 시
        if (Notice !== null) {
          //! 시간 내에 있을 시
          if (
            new Date(Notice[0]).getDate() !==
            new Date(parseInt(Date.now())).getDate()
          ) {
            TempNotice[i].view =
              parseInt(response.data[i].start_date) < now &&
              now < parseInt(response.data[i].end_date);
            TempNotice[i].will_view =
              parseInt(response.data[i].start_date) < now &&
              now < parseInt(response.data[i].end_date);
            SetNotice({notice: TempNotice});
          } else {
            console.log('업데이트 안함!');
            if (Notice[1][i].will_view == true) {
              Notice[1][i].view = true;
              SetNotice({notice: Notice[1]});
            }
          }
          //! async에 값이 없을 시
        } else if (Notice == null) {
          console.log('첫 실행!');
          TempNotice[i].view =
            parseInt(response.data[i].start_date) < now &&
            now < parseInt(response.data[i].end_date);
          TempNotice[i].will_view =
            parseInt(response.data[i].start_date) < now &&
            now < parseInt(response.data[i].end_date);
          SetNotice({notice: TempNotice});
        }
      }
    })
    .catch(function (error) {
      console.log('Notice_Axios error==', error);
    });
};

const Axios_First = async ({setAxios, sendNumber, mac}) => {
  axios
    .get((await Url_List()).Axios_First + mac + '&tel=' + sendNumber)
    .then(async function (response) {
      console.log(response.data);
      await setAxios(response.data);
    })
    .catch(async function (error) {
      console.log('error', error, (await Url_List()).Axios_First);
    });
};

const Axios_Second = async ({
  sendNumber,
  mac,
  num,
  navigation,
  setAxios_Second_Result,
}) => {
  axios
    .get(
      (await Url_List()).Axios_Second +
        mac +
        '&tel=' +
        sendNumber +
        '&key=' +
        num,
    )
    .then(function (response) {
      console.log(response.data.res);
      if (response.data.res) {
        InteractionManager.runAfterInteractions(() => {
          setAxios_Second_Result(true);
          /* navigation.pop();
          navigation.push('Personal_Exit'); */
        });
      } else {
        Alert.alert('인증 실패 !', '다시 확인해주세요', [
          {
            text: '확인',
            //onPress: () => console.log(''),
            style: 'cancel',
          },
        ]);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

const Axios_Third = async ({
  setAxiosValue,
  crn,
  GeoGet,
  setScanResult,
  Geo,
}) => {
  axios
    .get(
      (await Url_List()).Axios_Third +
        GeoGet +
        '&nano_id=' +
        crn +
        '&lat=' +
        Geo.lat +
        '&lon=' +
        Geo.lon,
    )
    .then(function (response) {
      console.log(
        'https://qari-check.herokuapp.com' +
          GeoGet +
          '&nano_id=' +
          crn +
          '&lat=' +
          Geo.lat +
          '&lon=' +
          Geo.lon,
      );
      console.log('Axios_Thired = ', response.data);
      SetRecords({
        data: [
          {time: response.data.time, crn: crn, store: response.data.store_name},
        ],
      });
      setAxiosValue(response.data);
      setScanResult(false);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const Axios_Url = async () => {
  var data = '';
  await axios
    .get((await Url_List()).hero_loger)
    .then(function (response) {
      data = response.data;
      //console.log('Axios_Url == ', data);
    })
    .catch(function (e) {
      data = 'error';
    });
  return data;
};

const Axios_Corona_New = async () => {
  await axios
    .get((await Url_List()).Corona_new)
    .then(function (response) {
      data = response.data;
    })
    .catch(function (error) {
      console.log(error);
      data = 'error';
    });
  return data;
};

const Axios_Corona = async () => {
  await axios
    .get((await Url_List()).Corona)
    .then(function (response) {
      data = response.data;
    })
    .catch(function (error) {
      console.log(error);
      data = 'error';
    });
  return data;
};

export {
  Axios_First,
  Axios_Second,
  Axios_Third,
  Axios_Url,
  Notice_Axios,
  Axios_Corona_New,
  Axios_Corona,
};

//  * https://qari.herokuapp.com/
// ! https://qari-check.herokuapp.com/store?StoreInfo=dd33
// ? http://pungryu.cafe24app.com/qari
// TODO: react-native-exit-app
