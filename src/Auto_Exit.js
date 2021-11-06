import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  BackHandler,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  color,
  btn,
  deviceHeight,
  deviceWidth,
  whatsize,
} from "../src/Common/CommonRule";
import { GetRecords } from "../Function/Async";
import Float_Button from "./Float_Button";
import SignMain from "../src/Common/TopSign/SignMain";
import { SafeAreaView } from "react-native-safe-area-context";


function Auto_Exit({ time }) {
  const navigation = useNavigation();
  const [records, setRecords] = useState();

  useEffect(() => {
    setTimeout(() => {
      GetRecords({ setRecords: setRecords });
    }, 100);
  }, []);

  // now Date 변수로 뺌 : 혜림
  var now, year, month, day, hour, minute;
  var check = false // 5분 지났는지 확인
  if (records) {
    now = new Date(records[0].time);
    year = now.getFullYear();
    month = ("0" + (now.getMonth() + 1)).slice(-2);
    day = ("0" + now.getDate()).slice(-2);
    hour = ("0" + now.getHours()).slice(-2);
    minute = ("0" + now.getMinutes()).slice(-2);

    if (records[0].time+300000 < new Date().getTime() ) {
      check = true
    }
  }

  return (
    <>
    <SignMain />
      <View style={[p_rec.mom, check ? { backgroundColor: '#FFB534' }:{ backgroundColor: 'white' }]}>
        <Image
          style={p_rec.QrImg}
          source={require("../assets/img/qr_icon.png")}
        />
        {records ? (
          <View>
            <View style={p_rec.TimeBox}>
              <Text style={p_rec.date}
                adjustsFontSizeToFit 
                numberOfLines={0}
              >
                {year}년 {month}월 {day}일
              </Text>
            </View>
            <View style={p_rec.TimeBox}
              adjustsFontSizeToFit 
              numberOfLines={0}
            >
              <Text style={[p_rec.time, check ? { color: color.black }:{ color: color.top_blue }]}>
                {hour} : {minute}
              </Text>
            </View>
            <View style={p_rec.store}
            adjustsFontSizeToFit 
            numberOfLines={0}
            >
              <Text 
              adjustsFontSizeToFit 
              numberOfLines={0}
              style={[p_rec.StoreName, check ? { color: color.black }:{ color: color.top_blue }]}>{records[0].store}</Text>
            </View>
            <View style={p_rec.Txt2Box}            
            adjustsFontSizeToFit 
            numberOfLines={0}
            >
              <Text style={p_rec.Txt2}>{check ? '방문 5분이 지났습니다.':'확인 완료되었습니다.'}</Text>
            </View>
          </View>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              adjustsFontSizeToFit
              numberOfLines={0}
              style={{
                flex: 1,
                marginTop: whatsize.xlarge * 2.5,
                fontSize: whatsize.xlarge,
                fontWeight: "bold",
                textAlign: "center",
                color: color.black,
              }}
            >
              QR 인증을 해 주세요
            </Text>
          </View>
        )}
        <Float_Button></Float_Button>
      </View>
    </>
  );
}
 
const p_rec = StyleSheet.create({
  mom: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
  },

  QrImg: {
    flex: 1,
    marginTop: whatsize.xlarge,
    marginBottom: whatsize.xmini * 0.5,
    width: whatsize.xlarge * 7,
    resizeMode: "contain",
  },
  TimeBox: {   
    justifyContent: "center",
    alignItems: "center",
    width: deviceWidth * 0.9,
    flexDirection: "row",
    marginBottom: whatsize.medium,
  },

  date: {
    textAlign: "center",
    flex: 0.7,
    fontSize: whatsize.xlarge * 1,
    color: color.black,
  },

  time: {
    textAlign: "center",
    flex: 0.5,
    fontSize: whatsize.xlarge * 1.5,
    fontWeight: '700'
  },

  txt: {
    flex: 0.5,
    textAlign: "center",
    color: "black",
    fontSize: whatsize.medium,
  },

  store: {
    flexDirection: "row",
    width: deviceWidth * 0.9,
    marginBottom: whatsize.medium,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  StoreName: {
    flex: 1,
    fontSize: whatsize.xlarge * 1.5,
    textAlign: 'center',
    fontWeight: '700',
  },
  Txt2Box: {
    width: deviceWidth * 0.9,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: whatsize.xlarge * 3,
  },
  Txt2: {
    fontSize: whatsize.medium,
  },
});

export default Auto_Exit;
