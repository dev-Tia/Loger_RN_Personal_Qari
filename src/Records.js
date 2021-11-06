import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  StatusBar,
  InteractionManager,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {color, deviceHeight, deviceWidth, whatsize} from '../src/Common/CommonRule';
import Float_Button from './Float_Button';
import {GetRecords, SetRecords} from '../Function/Async';
import SignMain from '../src/Common/TopSign/SignMain'

function Records(props) {
  const navigation = useNavigation();
  const [records, setRecords] = useState();
  useEffect(() => {
    console.log('!!!', records);
    GetRecords({setRecords: setRecords});
  }, []);

  return (
    <>
      <SafeAreaView
        showsVerticalScrollIndicator={false}
        style={Records_styles.Wrapper}>
        <StatusBar barStyle="dark-content" backgroundColor={color.red} />
        <View style={Records_styles.mom}>
            <SignMain />
          <View style={Records_styles.top}>
            <Text style={Records_styles.title}>날짜</Text>
            <Text style={Records_styles.title}>시간</Text>
            <Text style={Records_styles.title}>방문업체</Text>
          </View>
          <View style={Records_styles.line}></View>
          {!records ? (
            <View style={Records_styles.loading_box}>
              <Image
                style={Records_styles.loading_img}
                source={require('../assets/img/cat_red.png')}></Image>
              <Text style={Records_styles.loading_txt}>최근 방문 업체가 없습니다.</Text>
            </View>
          ) : (
            <>
              <FlatList
                data={records}
                keyExtractor={(data, index) => index.toString()}
                refreshing={true}
                renderItem={(data) => {
                  var t = new Date(data.item.time);
                  var formatted =
                    ('0' + t.getHours()).slice(-2) +
                    ':' +
                    ('0' + t.getMinutes()).slice(-2);
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert('', '이 기록을 삭제하시겠습니까?', [
                          {
                            text: '확인',
                            onPress: () => {
                              var TempRecords = records;
                              TempRecords = TempRecords.filter(
                                (del) => del.time !== data.item.time,
                              );
                              setRecords(TempRecords);
                              SetRecords({data: TempRecords, reset: true});
                            },
                            style: 'cancel',
                          },
                          {text: '취소', onPress: () => {}, style: 'cancel'},
                        ]);
                      }}>
                      <View style={Records_styles.contents}>
                        <View style={Records_styles.list_box}>
                          <Text style={Records_styles.list}>
                            {t.getFullYear() +
                              '-' +
                              (t.getMonth() + 1) +
                              '-' +
                              t.getDate()}
                          </Text>
                          <Text style={Records_styles.list}>{formatted}</Text>
                          <Text style={Records_styles.list}>
                            {data.item.store}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}></FlatList>
            </>
          )}
        </View>
        <Float_Button />
      </SafeAreaView>
    </>
  );
}

const Records_styles = StyleSheet.create({
  Wrapper: {flex: 1},
  mom: {
    width: deviceWidth,
    height: deviceHeight,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  line: {
    marginTop: '3%',
    backgroundColor: color.gray,
    width: deviceWidth * 0.85,
    height: deviceHeight * 0.001,
    borderWidth: 1,
  },

  top: {
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: deviceHeight * 0.02,
    width: deviceWidth * 0.85,
  },

  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: whatsize.large * 0.9,
    fontWeight: 'bold',
    color: color.gray,
  },

  contents: {
    flexDirection: 'column',
    width: deviceWidth,
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  list_box: {
    flex: 1,
    flexDirection: 'row',
    width: deviceWidth * 0.8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  list: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: whatsize.mini *0.9,
    marginBottom: '2%',
    marginTop: '2%',
  },

  loading_box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading_img: {
    resizeMode: 'contain',
    width: deviceWidth * 0.3,
    height: deviceHeight * 0.3,  
  },
  loading_txt:{
    fontSize: whatsize.xlarge,
    marginBottom: deviceWidth * 0.3,
  }
});

export default Records;
