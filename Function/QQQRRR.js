import React, {Component, useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Fragment,
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  InteractionManager,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {Dimensions} from 'react-native';
import {
  font,
  color,
  btn,
  deviceHeight,
  deviceWidth,
  whatsize,
} from '../src/Common/CommonRule';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {StackActions} from '@react-navigation/native';

import {Axios_Third} from './Axios.js';
import {getLocation} from './Async';
import Url_List from '../src/Common/Url_List';

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
import Modal from 'react-native-modal';

const QRCodeScreen = (props) => {
  console.log(props.scan);
  const [scan, setScan] = useState(false);
  const [scanResult, setScanResult] = useState(false);
  const [result, setResult] = useState(null);
  const [axiosValue, setAxiosValue] = useState('');
  const [GeoGet, setGeoGet] = useState();
  const scanner = React.useRef('');
  const [isModalVisible, setVisible] = useState(false);
  const [setCrn, getCrn] = useState('');
  const switchVisible = () => {
    setVisible(!isModalVisible);
  };
  useEffect(() => {
    setScan(props.scan);
  }, [props.scan]);
  //https://qari-check.herokuapp.com/

  const onSuccess = (e) => {
    const check = e.data.indexOf(Url_List.Qr_Check_Url);
    console.log('스캔된 전체 코드 : ' + e.data);
    console.log('로거주소 확인부분 : ' + e.data.slice(-5, e.data.length));
    var crn = e.data.slice(-5, e.data.length);
    getCrn(crn);
    setResult(e);
    setScan(false);
    setScanResult(true);

    //! check === 0 <- 원래 if 판단방법
    if (true) {
      console.log('로거주소 확인 되었습니다');
      //alert(e.data);
      //할일을 여기에 적기
      //다시 원래대로 돌리기
      switchVisible();
    } else {
      setResult(e);
      setScan(false);
      setScanResult(false);
    }
  };

  const activeQR = () => {
    setScan(true);
  };

  const scanAgain = () => {
    setScan(true);
    setScanResult(false);
  };

  // const desccription = 'QR code (abbreviated from Quick Response Code) is the trademark for a type of matrix barcode (or two-dimensional barcode) first designed in 1994 for the automotive industry in Japan. A barcode is a machine-readable optical label that contains information about the item to which it is attached. In practice, QR codes often contain data for a locator, identifier, or tracker that points to a website or application. A QR code uses four standardized encoding modes (numeric, alphanumeric, byte/binary, and kanji) to store data efficiently; extensions may also be used.'
  const desccription = 'Qari - Loger';

  useEffect(() => {
    getLocation({setGeoGet: setGeoGet});
    setTimeout(() => {
      InteractionManager.runAfterInteractions(() => {
        check(PERMISSIONS.ANDROID.CAMERA)
          .then((result) => {
            console.log('PERMISSIONS.ANDROID.CAMERA', result);
            switch (result) {
              case RESULTS.UNAVAILABLE:
                {
                  console.log(
                    'This feature is not available (on this device / in this context)',
                  );
                }
                break;
              case RESULTS.DENIED:
                if (scan == true) {
                  InteractionManager.runAfterInteractions(() => {
                    Alert.alert(
                      '사진 권한 설정 필요',
                      '앱 설정 화면에서 권한을 허용 해 주세요.\nQR이용 시 사진 권한이 필요합니다.\n (확인시 에플리케이션 정보 화면으로\n 이동합니다.)',
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
                  });
                }
                break;
            }
          })
          .catch((error) => {
            console.log('App.js = ', error);
          });
      });
    }, 500);
  }, []);

  useEffect(() => {
    if (axiosValue !== '') {
      //props.socket.close();
      props.navigation.dispatch(StackActions.replace('Auto_Exit'));
    }
  }, [axiosValue]);

  return (
    <View style={styles.container}>
      <View
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: 'red',
        }}>
        {!scan && !scanResult && !isModalVisible && (
          <View style={styles.cardView}>
            <TouchableOpacity
              onPress={() => {
                activeQR();
              }}
              style={styles.buttonTouchable}>
              <Text style={styles.buttonTextStyle}>
                일치하는 매장이 없습니다.{'\n'}QR코드를 확인해 주세요
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {scan ? (
          <QRCodeScanner
            permissionDialogTitle={''}
            permissionDialogMessage={'카메라 권한 확인 중'}
            buttonPositive={''}
            checkAndroid6Permissions={false}
            topViewStyle={{height: 0, marginTop: 0}}
            bottomContent={
              <View style={{marginTop: -deviceHeight * 0.05}}>
                <Text
                  style={{
                    fontSize: deviceHeight * 0.03,
                    color: 'white',
                  }}>
                  QR을 찍어주세요!
                </Text>
              </View>
            }
            reactivate={true}
            showMarker={true}
            cameraStyle={{
              borderWidth: 40,
              borderColor: 'transparent',
            }}
            ref={(node) => {
              scanner.current = node;
            }}
            onRead={onSuccess}
            cameraProps={{ratio: '2:2'}}
            // containerStyle={{
            // }}
            cameraStyle={{
              width: '100%',
              height: '100%',
              alignSelf: 'center',
              justifyContent: 'center',
            }}
            markerStyle={{borderColor: 'transparent'}}
            /*  topContent={
              <Text style={styles.centerText}>
                Go to
                <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text>
                on your computer and scan the QR code to test.
              </Text>
            } */
            /*  bottomContent={
             */
          />
        ) : (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text>확인중</Text>
          </View>
        )}
      </View>

      <Modal
        onBackdropPress={() => {
          setVisible(false);
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
        <View style={styles.modalView}>
          <Text style={styles.modalTopTitle}>
            내 정보를 매장에 전송 합니다.
          </Text>
          <View style={styles.modalButtonView}>
            <TouchableOpacity
              onPress={() => {
                switchVisible();

                setScanResult(true);
                setScan(true);
              }}
              style={styles.modalButtonNo}>
              <Text style={styles.modalButtonNoText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Axios_Third({
                  setAxiosValue: setAxiosValue,
                  crn: setCrn,
                  GeoGet: GeoGet.sendNumber,
                  Geo: GeoGet,
                  setScanResult: setScanResult,
                });
              }}
              style={styles.modalButtonYes}>
              <Text style={styles.modalButtonYesText}>동의</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default QRCodeScreen;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: color.gray,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },

  scrollViewStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#99003d',
  },

  rec_BTN: {
    borderRadius: 14,
    backgroundColor: 'white',
    width: deviceHeight * 0.1,
    height: deviceHeight * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  recTxt: {
    fontSize: 15,
    fontWeight: 'bold',
    color: color.black,
    marginTop: '10%',
  },

  textTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 16,
    color: 'white',
  },
  textTitle1: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 16,
    color: 'black',
  },
  cardView: {
    // marginTop: deviceHeight * 0.15,
    // width: deviceWidth,
    // height: deviceWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanCardView: {
    // width: deviceWidth - 32,
    // height: deviceHeight / 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: 'white',
  },
  buttonScan: {
    width: 42,
  },
  descText: {
    padding: 16,
    textAlign: 'justify',
    fontSize: 50,
  },

  highlight: {
    fontWeight: '700',
  },

  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonTouchable: {
    fontSize: 21,
    width: deviceWidth * 0.6,
    backgroundColor: '#ffffff',
    marginTop: 32,
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

    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  buttonTextStyle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: deviceHeight * 0.025,
  },

  modalView: {
    borderRadius: 5,
    backgroundColor: color.white,
    width: deviceWidth * 0.7,
    height: deviceHeight * 0.2,
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
