import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useTheme} from '../comp/MyTheme';
import { useNavigation } from '@react-navigation/native';

const Main = () => {
  const {theme, toggleTheme} = useTheme();
  const sun = require('../img/sun.png');
  const moon = require('../img/moon.png');
  const navigation = useNavigation()
  return (
    <View style={[styles.container, {backgroundColor: theme === 'light' ? '#fff' : '#333'}]}>
      
      {/* Nút đổi theme */}
      <View style={styles.themeSwitch}>
        <TouchableOpacity onPress={toggleTheme}>
          <Image style={styles.themeIcon} source={theme === 'light' ? sun : moon} />
        </TouchableOpacity>
      </View>

      {/* Màn hình cài đặt */}
      <View style={styles.settingsContainer}>
        
        {/* Block: Thông tin cá nhân */}
        <View style={[styles.block,{backgroundColor:theme=='light'?'white':'black'}]}>
          <Text style={[styles.blockTitle,{color:theme=='light'?'black':'white'}]}>Thông tin cá nhân</Text>
          <Text style={[styles.infoText, {color: theme === 'light' ? '#555' : '#ccc'}]}>Họ tên: Vũ Hoàng Nam</Text>
          <Text style={[styles.infoText, {color: theme === 'light' ? '#555' : '#ccc'}]}>MSV: PH54320</Text>
          <Text style={[styles.infoText, {color: theme === 'light' ? '#555' : '#ccc'}]}>Lớp: MD19303</Text>
        </View>

        {/* Block: Thông tin điện thoại */}
        <View style={[styles.block, {backgroundColor: theme === 'light' ? 'white' : 'black'}]}>
          <Text style={[styles.blockTitle, {color: theme === 'light' ? 'black' : 'white'}]}>Thông tin điện thoại</Text>
          <Text style={[styles.infoText, {color: theme === 'light' ? '#555' : '#ccc'}]}>Loại điện thoại: Samsung Galaxy S21</Text>
          <Text style={[styles.infoText, {color: theme === 'light' ? '#555' : '#ccc'}]}>CPU: Snapdragon 888</Text>
          <Text style={[styles.infoText, {color: theme === 'light' ? '#555' : '#ccc'}]}>RAM: 8GB</Text>
          <Text style={[styles.infoText, {color: theme === 'light' ? '#555' : '#ccc'}]}>Bộ nhớ trong: 128GB</Text>
        </View>

       
        <View style={[styles.block, {backgroundColor: theme === 'light' ? 'white' : 'black'}]}>
          <Text style={[styles.blockTitle, {color: theme === 'light' ? 'black' : 'white'}]}>Thiết lập</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={()=>{navigation.navigate('historyUser')}}>
            <Text style={[styles.settingText, {color: theme === 'light' ? '#007BFF' : '#4DA6FF'}]}>Lịch sử đơn</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.replace('Login')}} style={[styles.settingItem, {borderBottomWidth: 0}]}>
            <Text style={[styles.settingText, {color: theme === 'light' ? 'red' : '#FF6666'}]}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  themeSwitch: {
    padding: 5,
    alignItems: 'flex-end',
  },
  themeIcon: {
    width: 30,
    height: 30,
  },
  settingsContainer: {
    marginTop: 20,
  },
  block: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  blockTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  settingItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  settingText: {
    fontSize: 16,
    color: '#007BFF',
  },
});
