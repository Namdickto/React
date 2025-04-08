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
        <View style={styles.block}>
          <Text style={styles.blockTitle}>Thông tin cá nhân</Text>
          <Text style={styles.infoText}>Họ tên: Vũ Hoàng Nam</Text>
          <Text style={styles.infoText}>MSV: PH54320</Text>
          <Text style={styles.infoText}>Lớp: MD19303</Text>
        </View>

        {/* Block: Thông tin điện thoại */}
        <View style={styles.block}>
          <Text style={styles.blockTitle}>Thông tin điện thoại</Text>
          <Text style={styles.infoText}>Loại điện thoại: Samsung Galaxy S21</Text>
          <Text style={styles.infoText}>CPU: Snapdragon 888</Text>
          <Text style={styles.infoText}>RAM: 8GB</Text>
          <Text style={styles.infoText}>Bộ nhớ trong: 128GB</Text>
        </View>

       
        <View style={styles.block}>
          <Text style={styles.blockTitle}>Thiết lập </Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Đổi mật khẩu</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.replace('Login')}} style={[styles.settingItem, {borderBottomWidth: 0}]}>
            <Text style={[styles.settingText, {color: 'red'}]}>Đăng xuất</Text>
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
