import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';

const InputByNam = ({ placeholder, value, onChangeText, style, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, style]} // Kết hợp style mặc định và style tùy chỉnh
        placeholder={placeholder} // Placeholder cho input
        value={value} // Giá trị của input
        onChangeText={onChangeText} // Hàm xử lý khi thay đổi text
        secureTextEntry={secureTextEntry} // Ẩn text (dùng cho mật khẩu)
        placeholderTextColor="#aaa" // Màu chữ placeholder
      />
    </View>
  );
};

export default InputByNam;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10, // Khoảng cách trên dưới giữa các input
  },
  input: {
    height: 50, // Chiều cao của input
    borderWidth: 1, // Đường viền
    borderColor: '#ccc', // Màu đường viền
    borderRadius: 8, // Bo góc
    paddingHorizontal: 10, // Khoảng cách giữa text và viền
    fontSize: 16, // Kích thước chữ
    backgroundColor: '#fff', // Màu nền
  },
});