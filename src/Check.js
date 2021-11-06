import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  InteractionManager,
} from 'react-native';
import {
  font,
  color,
  btn,
  deviceHeight,
  deviceWidth,
  whatsize,
} from './Common/CommonRule';
import {useNavigation} from '@react-navigation/native';
//getMacAddress ()
import {Axios_First, Axios_Second} from '../Function/Axios';
import {getLocation, addLocationValue} from '../Function/Async.js';
import DeviceInfo from 'react-native-device-info';
import {getUniqueId, getMacAddress} from 'react-native-device-info';
import {StackActions} from '@react-navigation/native';
import Modal from 'react-native-modal';
import Url_List from './Common/Url_List';

const Check = () => {
  const navigation = useNavigation();

  const [isModalVisible, setVisible] = useState(false);
  const switchVisible = () => {
    setVisible(!isModalVisible);
  };

  const [number, setNumber] = useState('');

  const [sendNumber, setSendNumber] = useState('');

  const [number2, setNumber2] = useState('');

  const [number3, setNumber3] = useState('');

  const [number4, setNumber4] = useState('');

  const [GeoGet, setGeoGet] = useState();

  const [getAxios, setAxios] = useState();

  const [Ref, setRef] = useState(null);

  const [Ref2, setRef2] = useState(null);

  const [timer, setTimer] = useState(180);

  const [Axios_Second_Result, setAxios_Second_Result] = useState(false);

  const [changeTime, setChangeTime] = useState(timer / 60 + '분');

  const [url, setUrl] = useState('');

  const [TempData, setTempData] = useState(GeoGet);

  const timeCheck = () => {
    setTimeout(() => {
      setTimer(timer - 1);
      setChangeTime(timer / 60 + '분' + (timer % 60) + '초');
    }, 1000);
  };

  useEffect(() => {
    if (Axios_Second_Result == false) {
      if (0 <= timer && timer !== 180) {
        setTimeout(() => {
          setTimer(timer - 1);
          setChangeTime(
            parseInt(timer / 60) + '분' + parseInt(timer % 60) + '초',
          );
        }, 1000);
      }
    } else {
      InteractionManager.runAfterInteractions(() => {
        // ? 인증 성공 했으니 시간 안보이게 변경
        setTimer(180);
        // ? Async 요청
      }).then(() => {
        let mac = getUniqueId();
        var Temp = Object.assign(GeoGet, {
          sendNumber: sendNumber,
          mac: mac,
        });
        InteractionManager.runAfterInteractions(() => {
          addLocationValue({TempData: Temp});
        }).then(() => {
          setVisible(true);
        });
      });
    }
  }, [timer]);

  const onChange = ({text}) => {
    var cleaned = ('' + text).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? '+1 ' : '',
        number = [, /* intlCode */ match[2], '-', match[3], '-', match[4]].join(
          '',
        );
      setNumber(number);
      setSendNumber(text);
      if (number.length > 11) {
        Keyboard.dismiss();
      }
      return;
    }
    setNumber(text);
    returnText({text: text, num: 1});
  };

  const returnText = ({text, num}) => {
    let newText = '';
    let numbers = '0123456789';

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        1;
        newText = newText + text[i];
      } else {
        //alert('please enter numbers only');
        newText = newText;
      }
    }
    if (num == 3) {
      setNumber3(newText);
      if (newText) {
        Ref2.focus();
      }
    } else if (num == 4) {
      setNumber4(newText);
    } else if (num == 1) {
      setNumber(newText);
    } else if (num == 2) {
      setNumber2(newText);
      if (newText) {
        Ref.focus();
      }
    }
  };

  const SendNumber = () => {
    //console.log(sendNumber);
    //console.log(DeviceInfo.getUniqueId());

    let mac = getUniqueId();
    //console.log(mac);
    Axios_First({setAxios: setAxios, sendNumber: sendNumber, mac: mac});
  };
  const CallUrl = async () => {
    console.log('11111111111111111');
    console.log('CallUrl=', (await Url_List()).Url_Now);
    setUrl((await Url_List()).Url_Now);
  };

  useEffect(() => {
    //Geo({setGeoGet: setGeoGet});
    CallUrl();
    getLocation({setGeoGet: setGeoGet});
  }, []);

  const GeoView = () => {
    return (
      <View style={{backgroundColor: '#ffffffcc'}}>
        <Text>{GeoGet ? GeoGet.lat : ''}</Text>
        <Text>{GeoGet ? GeoGet.lon : ''}</Text>
        <Text>{GeoGet && GeoGet}</Text>
      </View>
    );
  };

  const ButtonPhone = () => {
    return (
      <TouchableOpacity
        disabled={number.length < 11 ? true : false}
        style={[
          {
            backgroundColor: number.length < 11 ? '#00b0ff' : color.red,
          },
          personal_check.PhoneSubmit,
        ]}
        activeOpacity={0.3}
        onPress={() => {
          setAxios();
          setNumber2();
          setNumber3();
          setNumber4();
          SendNumber();
          setTimer(180);
          timeCheck();
        }}>
        <Text style={personal_check.PhoneSubmitText}>문자보내기</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View
          contentInsetAdjustmentBehavior="automatic"
          style={personal_check.mom}>
          {/* <GeoView /> */}
          <View style={personal_check.top_title_box}>
            <Text style={personal_check.top_title}>휴대폰 번호</Text>
          </View>
          <View style={personal_check.phone_input_box}>
            <TextInput
              style={personal_check.phone_input}
              textContentType="telephoneNumber"
              dataDetectorTypes="phoneNumber"
              keyboardType="numeric"
              placeholder={'\t- 없이 숫자만 입력해 주세요  '}
              onSubmitEditing={() => {
                if (number.length > 13) {
                  SendNumber();
                }
              }}
              onChangeText={(text) => {
                onChange({text: text});
                //console.log(text.length);
              }}
              value={number}
              maxLength={13}
            />
            <ButtonPhone />
          </View>
          <View style={personal_check.ResultChkBox}>
            <Text style={personal_check.ResultChkTxt}>
              인증 번호&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {timer !== 180 && changeTime}
            </Text>
          </View>
          <View style={personal_check.ResultInput_Wrapper}>
            <View style={personal_check.ResultInput_Wrapper_Box}>
              <TextInput
                style={personal_check.ResultInput_None}
                editable={false}
                selectTextOnFocus={false}
                value={getAxios && String(getAxios.key).slice(0, 1)}
              />
              <TextInput
                style={personal_check.ResultInput}
                textContentType="telephoneNumber"
                dataDetectorTypes="phoneNumber"
                keyboardType="numeric"
                maxLength={1}
                returnKeyType="next"
                onChangeText={(text) => {
                  returnText({text: text, num: 2});
                  //setNumber3(text);
                }}
                value={number2}
              />
              <TextInput
                style={personal_check.ResultInput}
                textContentType="telephoneNumber"
                dataDetectorTypes="phoneNumber"
                keyboardType="numeric"
                maxLength={1}
                returnKeyType="next"
                ref={(input) => {
                  setRef(input);
                }}
                onChangeText={(text) => {
                  returnText({text: text, num: 3});
                  //setNumber3(text);
                }}
                value={number3}
              />
              <TextInput
                style={personal_check.ResultInput}
                textContentType="telephoneNumber"
                dataDetectorTypes="phoneNumber"
                keyboardType="numeric"
                maxLength={1}
                ref={(input) => {
                  setRef2(input);
                }}
                onChangeText={(text) => {
                  returnText({text: text, num: 4});
                }}
                value={number4}
              />
            </View>
          </View>
          <View style={personal_check.Submit_Num_Box}>
            <TouchableOpacity
              disabled={
                number && getAxios && number3 && number4
                  ? number.length < 11
                    ? true
                    : false
                  : true
              }
              onPress={() => {
                let mac = getUniqueId();
                Axios_Second({
                  num: getAxios.key + number2 + number3 + number4,
                  sendNumber: sendNumber,
                  mac: mac,
                  navigation: navigation,
                  setAxios_Second_Result: setAxios_Second_Result,
                });
              }}
              style={[
                personal_check.Submit_Btn,
                {
                  backgroundColor:
                    number && getAxios && number3 && number4
                      ? number.length < 11
                        ? '#187bcd'
                        : color.red
                      : '#00b0ff',
                },
              ]}>
              <Text style={personal_check.PhoneSubmitText}>제출하기</Text>
            </TouchableOpacity>

            {__DEV__ ? (
              <TouchableOpacity
                onPress={() => {
                  navigation.dispatch(StackActions.replace('QR_Camera'));
                }}
                style={personal_check.submit}>
                <Text style={personal_check.PhoneSubmitText}>
                  넘어가기 (로거만)
                </Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}

            {/*  <Text>
                {number + '\n'}
                {getAxios ? getAxios.key && getAxios.key : ''}
                {'\n' + number3 + number4}
              </Text> */}
          </View>
          <Text style={{position: 'absolute', bottom: 30}}>{url}</Text>
          <Text>
            {Platform.OS === 'ios'
              ? 'ver. 1.0.1 (218)'
              : 'ver. 1.0.1 (120)'}
          </Text>
        </View>
      </TouchableWithoutFeedback>

      <Modal
        onBackdropPress={() => {
          setVisible(false);
          setFloat(!float);
        }}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={0.1}
        animationOutTiming={0.1}
        coverScreen={true}
        hasBackdrop={true}
        backdropOpacity={0}
        isVisible={isModalVisible}
        style={{
          margin: 0,
          backgroundColor: '#ffffffcc',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={personal_check.modalView}>
          <Text style={personal_check.modalTopTitle}>
            가입이 정상적으로 완료되었습니다.
          </Text>
          <View style={personal_check.modalButtonView}>
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(StackActions.replace('QR_Camera'));
              }}
              style={personal_check.modalButtonYes}>
              <Text style={personal_check.modalButtonYesText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const personal_check = StyleSheet.create({
  mom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  top_title_box: {
    flex: 0.7,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    width: deviceWidth * 0.75,
    marginBottom: '3%',
  },
  top_title: {
    fontWeight: 'bold',
    fontSize: whatsize.medium,
  },
  phone_input_box: {
    width: deviceWidth * 0.75,
    height: whatsize.xlarge * 2.7,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  phone_input: {
    flex: 0.85,
    fontSize: whatsize.mini * 0.9,
    borderRadius: 5,
    fontWeight: 'bold',
    marginRight: '5%',
    backgroundColor: '#DEDCDC',
  },

  PhoneSubmit: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    width: deviceWidth * 0.75,
    height: whatsize.xlarge * 2.7,
  },

  PhoneSubmitText: {
    color: 'white',
    fontSize: whatsize.mini * 0.9,
    fontWeight: 'bold',
  },

  ResultChkBox: {
    marginBottom: whatsize.large,
    marginTop: whatsize.xlarge * 2,
    width: deviceWidth * 0.75,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  ResultChkTxt: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: whatsize.medium,
    color: color.gray,
  },
  ResultInput_Wrapper: {
    flex: 0.3,
    width: deviceWidth * 0.7,
    flexDirection: 'row',
  },

  ResultInput_Wrapper_Box: {
    flexDirection: 'row',
    width: deviceWidth * 0.75,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ffffff',
  },

  ResultInput_None: {
    width: whatsize.xlarge * 2.1,
    height: whatsize.xlarge * 2.1,
    marginRight: '2%',
    fontWeight: 'bold',
    backgroundColor: '#ffffffcc',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: color.gray,
    textAlign: 'center',
    color: 'grey',
    fontSize: whatsize.medium,
  },

  ResultInput: {
    width: whatsize.xlarge * 2.1,
    height: whatsize.xlarge * 2.1,
    marginRight: '2%',
    fontWeight: 'bold',
    backgroundColor: '#ffffffcc',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: color.gray,
    textAlign: 'center',
    color: 'black',
    fontSize: whatsize.medium,
  },

  submit: {
    flex: 1,
    backgroundColor: color.gray,
    height: whatsize.xlarge * 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  Submit_Num_Box: {
    marginTop: whatsize.xlarge * 1.5,
    flex: 0.8,
    width: deviceWidth * 0.7,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },

  Submit_Btn: {
    flex: 1,
    width: deviceWidth * 0.75,
    height: whatsize.xlarge * 2.5,
    marginRight: '15%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  modalView: {
    borderRadius: 5,
    backgroundColor: color.white,
    width: deviceWidth * 0.7,
    height: deviceHeight * 0.25,
    marginBottom: deviceHeight * 0.05,
    paddingLeft: deviceWidth * 0.02,
    paddingLeft: deviceWidth * 0.02,
    paddingTop: deviceHeight * 0.04,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50, 50, 50)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        elevation: 5,
      },
    }),
  },

  modalTopTitle: {
    color: color.black,
    fontSize: deviceHeight * 0.022,
    fontWeight: 'bold',
  },

  modalButtonView: {
    flexDirection: 'row',
    marginTop: deviceHeight * 0.05,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  modalButtonNo: {
    borderRadius: 8,
    backgroundColor: color.white,
    width: deviceWidth * 0.2,
    height: deviceHeight * 0.05,

    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50, 50, 50)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        elevation: 5,
      },
    }),
  },

  modalButtonNoText: {fontWeight: 'bold'},

  modalButtonYes: {
    borderRadius: 8,
    backgroundColor: color.red,
    width: deviceWidth * 0.2,
    height: deviceHeight * 0.05,

    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50, 50, 50)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        elevation: 5,
      },
    }),
  },

  modalButtonYesText: {fontWeight: 'bold', color: 'white'},
});

export default Check;
