import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Trending from './Screens/Trending';
import GetNews from './Screens/GetNews';
import WebVieww from './Screens/WebVieww';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Trending"
          component={Trending}
        />
        <Stack.Screen
          name="GetNews"
          component={GetNews}
        />
      <Stack.Screen
          name="WebNews"
          component={WebVieww}
          options={{headerShown:false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
