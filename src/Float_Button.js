import ActionButton from 'react-native-action-button';

import {LogBox, Platform, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {deviceHeight, deviceWidth, whatsize} from './Common/CommonRule';
import {StackActions} from '@react-navigation/native';
import Modal from 'react-native-modal';

import {clearAll} from '../Function/Async.js';

import {color} from './Common/CommonRule';

LogBox.ignoreLogs([
  'Animated: `useNativeDriver` was not specified.',
  'Warning: componentWillReceiveProps has been renamed,',
]);

export default Button = () => {
  const navigation = useNavigation();

  // 혜림추가: 버튼클릭시 float버튼 사이즈 변경 ->
  const [float, setFloat] = useState(false);
  const [location, setLocation] = useState('');
  const [isModalVisible, setVisible] = useState(false);
  const switchVisible = () => {
    setVisible(!isModalVisible);
  };

  var wid = '25%';
  var hei = '20%';
  if (float === true) {
    wid = '100%';
    hei = '100%';
  }

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: wid,
        height: hei,
      }}>
      <ActionButton
        position="right"
        onPress={() => setFloat(!float)} // 혜림 추가
        buttonColor={color.red}
        bgColor="#ffffffcc"
        useNativeFeedback={true}
        backgroundTappable={true}
        activeOpacity={0.7}
        hideShadow={false}>
        <ActionButton.Item
          titleBgColor={'transparent'}
          textContainerStyle={{
            backgroundColor: 'transparent',
            height: deviceHeight * 0.04,
          }}
          hideLabelShadow={true}
          size={deviceHeight * 0.055}
          textStyle={{
            fontWeight: 'bold',
            fontSize: deviceHeight * 0.02,
          }}
          buttonColor={color.red}
          title="QR 촬영"
          onPress={() => {
            navigation.dispatch(StackActions.replace('QR_Camera'));
          }}>
          <Icon name="qr-code" style={styles.actionButtonIcon} />
        </ActionButton.Item>

        <ActionButton.Item
          textContainerStyle={{
            backgroundColor: 'transparent',
            height: deviceHeight * 0.04,
          }}
          hideLabelShadow={true}
          size={deviceHeight * 0.055}
          textStyle={{
            fontWeight: 'bold',
            fontSize: deviceHeight * 0.02,
          }}
          buttonColor={color.red}
          title="확인 받기"
          onPress={() => {
            navigation.dispatch(StackActions.replace('Auto_Exit'));
          }}>
          <Icon name="checkmark-done-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>

        <ActionButton.Item
          textContainerStyle={{
            backgroundColor: 'transparent',
            height: deviceHeight * 0.04,
          }}
          hideLabelShadow={true}
          size={deviceHeight * 0.055}
          textStyle={{
            fontWeight: 'bold',
            fontSize: deviceHeight * 0.02,
          }}
          buttonColor={color.red}
          title="매장방문기록"
          onPress={() => {
            navigation.dispatch(StackActions.replace('Records'));
          }}>
          <Icon name="person-add-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>

        <ActionButton.Item
          textContainerStyle={{
            backgroundColor: 'transparent',
            height: deviceHeight * 0.04,
          }}
          hideLabelShadow={true}
          size={deviceHeight * 0.055}
          textStyle={{
            fontWeight: 'bold',
            fontSize: deviceHeight * 0.02,
          }}
          buttonColor={color.red}
          title="약관보기"
          onPress={() => {
            navigation.dispatch(StackActions.replace('Terms_Pass'));
          }}>
          <Icon name="reader-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>

        <ActionButton.Item
          textContainerStyle={{
            backgroundColor: 'transparent',
            height: deviceHeight * 0.04,
          }}
          hideLabelShadow={true}
          size={deviceHeight * 0.055}
          textStyle={{
            fontWeight: 'bold',
            fontSize: deviceHeight * 0.02,
          }}
          buttonColor={color.red}
          title="로그아웃/탈퇴"
          onPress={() => {
            setVisible(true);
          }}>
          <Icon name="reader-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>

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
        <View style={styles.modalView}>
          <Text style={styles.modalTopTitle}>
            탈퇴를 하시더라도 매장 방문기록은{'\n'}서버에 4주동안 보관됩니다.
            {'\n'}재 가입시 본인 인증을 새로 받아야 하며, 과거 기록 확인은
            불가능합니다.
          </Text>
          <View style={styles.modalButtonView}>
            <TouchableOpacity
              onPress={() => {
                switchVisible();
                setFloat(!float);
              }}
              style={styles.modalButtonNo}>
              <Text style={styles.modalButtonNoText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                clearAll();
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Splash'}],
                });
                //navigation.dispatch(StackActions.replace('Splash'));
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

const styles = StyleSheet.create({
  actionButtonIcon: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: deviceHeight * 0.025,
    width: '100%',
    /*  height: '100%', */
    color: 'white',
  },
  modalView: {
    borderRadius: 5,
    backgroundColor: color.white,
    width: deviceWidth * 0.7,
    height: deviceHeight * 0.3,
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
