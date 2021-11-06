import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  LogBox,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {font, color, btn, deviceHeight, deviceWidth} from './Common/CommonRule';
import QR from '../Function/QQQRRR.js';
import Modal from 'react-native-modal';
import io from 'socket.io-client';
import SignMain from '../src/Common/TopSign/SignMain';
import {SafeAreaView} from 'react-native-safe-area-context';

import Float_Button from './Float_Button';
import {GetNotice, SetNotice} from '../Function/Async';

LogBox.ignoreLogs([
  'Unrecognized WebSocket connection option(s) `localAddress`. ',
]);

function QR_Camera() {
  const navigation = useNavigation();
  const [NoticeValue, setNoticeValue] = useState('');
  const [NoticeBackground, setNoticeBackground] = useState(0);

  async function reCallNotice() {
    var result = '';
    async function Get() {
      result = JSON.parse(await GetNotice());
      console.log('result  ==', result);
      setNoticeValue(result);
    }
    Get();
  }

  useEffect(() => {
    var result = '';
    async function Get() {
      result = JSON.parse(await GetNotice());
      console.log('result  ==', result);
      setNoticeValue(result);
    }
    Get();
  }, []);
  console.log(NoticeBackground);
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <SignMain />
        <View style={p_rec.mom}>
          <QR
            navigation={navigation}
            scan={NoticeBackground == 0 ? true : false} /* socket={socket} */
          />
          <Float_Button />
          {NoticeValue !== null && (
            <FlatList
              data={NoticeValue[1]}
              showsVerticalScrollIndicator={false}
              keyExtractor={(notice, index) => index.toString()}
              renderItem={(notice) => {
                return (
                  <Modal
                    style={{
                      backgroundColor: 'rgba(0,0,0,1)',
                      width: deviceWidth,
                      height: deviceHeight,
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: 0,
                    }}
                    onModalShow={() => {
                      setNoticeBackground(NoticeBackground + 1);
                    }}
                    onBackButtonPress={() => {
                      var TempNotice = NoticeValue[1];
                      TempNotice[[notice.index]].view = false;
                      SetNotice({notice: TempNotice});
                      setNoticeBackground(NoticeBackground - 1);

                      reCallNotice();
                    }}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    animationInTiming={0.2}
                    animationOutTiming={0.2}
                    /*   coverScreen={true}
                    hasBackdrop={true} */
                    backdropOpacity={
                      NoticeBackground ? 0.8 / NoticeBackground : 0.8
                    }
                    isVisible={NoticeValue[1][notice.index].view}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        width: deviceWidth * 0.64,
                        height: deviceHeight * 0.4,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255,1)',
                        borderRadius: 15,
                        elevation: 15,
                        opacity: 1,
                      }}>
                      <View
                        style={{
                          paddingLeft: deviceWidth * 0.03,
                          paddingRight: deviceWidth * 0.03,
                        }}>
                        <Text
                          style={{
                            marginTop: deviceWidth * 0.05,
                            marginBottom: deviceWidth * 0.05,
                            fontSize: deviceWidth * 0.05,
                            color: 'black',
                          }}>
                          {notice.item.title}
                        </Text>
                      </View>
                      <View
                        style={{
                          paddingLeft: deviceWidth * 0.03,
                          paddingRight: deviceWidth * 0.03,
                        }}>
                        <Text
                          style={{
                            fontSize: deviceWidth * 0.035,
                            color: 'black',
                            textAlign: 'center',
                          }}>
                          {notice.item.discription}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: deviceWidth * 0.6,
                        paddingTop: deviceWidth * 0.04,
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity
                        style={{
                          width: deviceWidth * 0.3,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onPress={() => {
                          var TempNotice = NoticeValue[1];
                          TempNotice[[notice.index]].view = false;
                          SetNotice({notice: TempNotice});
                          setNoticeBackground(NoticeBackground - 1);
                          reCallNotice();
                        }}>
                        <Text
                          style={{
                            fontSize: deviceWidth * 0.03,
                            color: 'white',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                          }}>
                          닫기
                        </Text>
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontSize: deviceWidth * 0.04,
                          color: 'white',
                          textAlign: 'center',
                        }}>
                        |
                      </Text>
                      <TouchableOpacity
                        style={{
                          width: deviceWidth * 0.3,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onPress={() => {
                          var TempNotice = NoticeValue[1];
                          TempNotice[[notice.index]].view = false;
                          TempNotice[[notice.index]].will_view = false;
                          SetNotice({notice: TempNotice});
                          setNoticeBackground(NoticeBackground - 1);
                          reCallNotice();
                        }}>
                        <Text
                          style={{
                            fontSize: deviceWidth * 0.03,
                            color: 'white',
                            textAlign: 'center',
                          }}>
                          오늘 다시 보지 않기
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Modal>
                );
              }}
            />
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const p_rec = StyleSheet.create({
  mom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000AA',
    flexDirection: 'column',
  },
});

export default QR_Camera;
