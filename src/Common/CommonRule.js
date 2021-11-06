import {Dimensions, Platform, PixelRatio } from 'react-native';
export const deviceWidth = Dimensions.get('screen').width;
export const deviceHeight = Dimensions.get('screen').height;

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// 삼성 갤럭시 s2, 아이폰 5 가로 기준.
const scale = SCREEN_WIDTH / 320;

export function StandardSize(size) {
  const newSize = size * scale 
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

export const whatsize = {
  xlarge: StandardSize(19),
  large: StandardSize(17),
  medium: StandardSize(15),
  small: StandardSize(14),
  mini: StandardSize(13),
  xmini: StandardSize(11),
};

export const color = {
  white: '#ffffff',
  black: '#000000',
  blue: '#C1F0F9',
  gray: '#707070',
  red: '#DE3941',
  top_blue: '#2A5FC1',
};



export const btn = {
  btn_b: color.blue,
  btn_w: color.white,
  radius: 12,
  b_color: 'rgba(198, 198, 198, 0.3)',
};



