import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BASE_URL from '../config/config';


const Register = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [hoten, setHoten] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const dangky = async () => {
    try {
      // Lấy danh sách người dùng từ API
      const res = await fetch(`${BASE_URL}/users`);
      const users = await res.json();

      // Kiểm tra email trùng lặp
      const isEmailTaken = users.some((user) => user.email === email);
      if (isEmailTaken) {
        alert("Email đã được sử dụng!");
        return;
      }

      // Kiểm tra mật khẩu khớp
      if (password !== password2) {
        alert("Mật khẩu không khớp!");
        return;
      }

      // Tạo user mới
      const newUser = {
        email: email,
        hoten: hoten,
        password: password,
      };

      const userRes = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-type': 'Application/json' },
        body: JSON.stringify(newUser),
      });

      if (userRes.ok) {
        const createdUser = await userRes.json();

        // Tạo giỏ hàng mới cho user
        const cartRes = await fetch(`${BASE_URL}/carts`, {
          method: 'POST',
          headers: { 'Content-type': 'Application/json' },
          body: JSON.stringify({
            userId: createdUser.id,
            items: [],
          }),
        });

        if (cartRes.ok) {
          alert("Đăng ký thành công!");
          navigation.replace('Login');
        } else {
          alert("Lỗi khi tạo giỏ hàng!");
        }
      } else {
        alert("Lỗi khi đăng ký!");
      }
    } catch (error) {
      console.error(error);
      alert("Đã xảy ra lỗi!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký</Text>
      
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Họ và tên" 
          style={styles.input} 
          value={hoten} 
          onChangeText={setHoten} 
        />
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Email" 
          style={styles.input} 
          keyboardType="email-address" 
          value={email} 
          onChangeText={setEmail} 
        />
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Mật khẩu" 
          secureTextEntry 
          style={styles.input} 
          value={password} 
          onChangeText={setPassword} 
        />
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Xác nhận mật khẩu" 
          secureTextEntry 
          style={styles.input} 
          value={password2} 
          onChangeText={setPassword2} 
        />
      </View>
      
      <TouchableOpacity style={styles.button} onPress={dangky}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.registerText}>Đã có tài khoản? Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#6200ea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    marginTop: 15,
    fontSize: 16,
    color: '#6200ea',
    fontWeight: 'bold',
  },
});
