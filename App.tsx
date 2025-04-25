import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import Home from './Screen/Home';
import main from './Screen/Profile';
import ManChao from './Screen/ManChao';
import Login from './Screen/Login';
import Register from './Screen/Register';
import Search from './Screen/Search';
import Notification from './Screen/Notification';
import { MyTheme, useTheme } from './comp/MyTheme';
import Cart from './Screen/Cart';
import Success from './Screen/Success';
import Users from './ScreenAdmin/Users';
import ADScreen from './ScreenAdmin/ADScreen';
import { Provider } from 'react-redux';
import store from './redux/store';
import Products from './ScreenAdmin/Products';
import Statistics from './ScreenAdmin/Statistics';
import historyUser from './Screen/historyUser';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyTabs = () => {
  const { theme } = useTheme(); // Lấy theme từ Context

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme === 'light' ? 'black' : 'white', // Màu chữ khi active
        tabBarInactiveTintColor: 'gray', // Màu chữ khi inactive
        tabBarStyle: {
          backgroundColor: theme === 'light' ? '#f8f8f8' : '#333', // Thay đổi màu nền theo theme
          height: 60, 
        },
        tabBarLabelStyle: { fontSize: 14, },
        tabBarIcon: ({ focused }) => {
          let iconSource;
          if (route.name === 'Home') {
            iconSource = require('./img/home.png');
          } else if (route.name === 'Profile') {
            iconSource = require('./img/profile.png');
          } else if (route.name === 'Search') {
            iconSource = require('./img/search.png');
          } else if (route.name === 'Notification') {
            iconSource = require('./img/noti.png');
          }
          return (
            <Image
              source={iconSource}
              style={{
                width: 24,
                height: 24,
                opacity: focused ? 1 : 0.5,
              }}
              resizeMode="contain"
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" options={{ headerShown: false }} component={Home} />
      <Tab.Screen name="Search" options={{ headerShown: false }} component={Search} />
      <Tab.Screen name="Notification" options={{ headerShown: false }} component={Notification} />
      <Tab.Screen name="Profile" options={{ headerShown: false }} component={main} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
    <MyTheme>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ManChao">
          <Stack.Screen
            name="ManChao"
            component={ManChao}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={MyTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Success"
            component={Success}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Users"
            component={Users}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ADScreen"
            component={ADScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Products"
            component={Products}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Statistics"
            component={Statistics}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="historyUser"
            component={historyUser}
            options={{ headerShown: false }}
          />
          
        </Stack.Navigator>
      </NavigationContainer>
    </MyTheme>
    </Provider>
  );
};

export default App;