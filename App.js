import React, {useEffect, useState} from 'react';
import {View, StatusBar, InteractionManager, Alert} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import {font, color, btn} from './src/Common/CommonRule';

import Splash from './src/Splash';
import Terms from './src/Terms';
import Terms_Pass from './src/Terms_Pass';
import Check from './src/Check';
import Records from './src/Records';
import Auto_Exit from './src/Auto_Exit';
import QR_Camera from './src/QR_Camera';
import NoPermission from './src/NoPermission';
import QQQRRR from './Function/QQQRRR';
import {SetUrl} from './Function/Async';
import {SafeAreaView} from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const App = () => {

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={color.red} />
      <SafeAreaView style={{backgroundColor: color.red, flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              animationEnabled: false,
              cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            }}
            initialRouteName={
              /* GeoGet && GeoGet.mac ? 'QR_Camera' : 'Terms' */ Splash
            }>
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Terms"
              component={Terms}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Terms_Pass"
              component={Terms_Pass}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Check"
              component={Check}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="QR_Camera"
              component={QR_Camera}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Records"
              component={Records}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="NoPermission"
              component={NoPermission}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Auto_Exit"
              component={Auto_Exit}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

export default App;
