import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CheckBox} from 'react-native-elements/dist/checkbox/CheckBox';
import BASE_URL from '../config/config';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/ProductReducer';

const Login = () => {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false); // Trạng thái của checkbox
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const check = async () => {
    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ email và mật khẩu!");
      return;
    }
    if(email==='admin'&&password==='1'){
      navigation.navigate('ADScreen')
    }else{
    try {
      const res = await fetch(`${BASE_URL}/users?email=${email}&password=${password}`);
      const users = await res.json();

      if (users.length > 0) {
        // Nếu tìm thấy user, chuyển hướng đến màn hình chính
        alert("Đăng nhập thành công!");
        dispatch(setUser(users[0]))
        console.log('Dữ liệu người dùng:', users[0]);
        
        navigation.replace('Main');
      } else {
        // Nếu không tìm thấy user, hiển thị thông báo lỗi
        alert("Email hoặc mật khẩu không đúng!");
      }
    } catch (error) {
      console.error(error);
      alert("Đã xảy ra lỗi khi đăng nhập!");
    }}
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
      </View>
      {/* Thêm CheckBox */}
      <CheckBox
        title="Remember me?"
        checked={isChecked}
        onPress={() => setIsChecked(!isChecked)} // Thay đổi trạng thái khi nhấn
        checkedIcon={<Image style={{width:20, height:20}} source={require('../img/remeber.png')}/>}
        uncheckedIcon={<Image style={{width:20, height:20}} source={require('../img/unremember.png')}/>}
        containerStyle={styles.checkboxContainer} // Style cho container
        textStyle={styles.checkboxText} // Style cho văn bản
      />
      <TouchableOpacity
        style={styles.button}
        onPress={check}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <View
          style={{
            flexDirection: 'row',
            paddingBottom: 10,
          }}>
          <Text
            style={{
              marginTop: 15,
              fontSize: 16,
              color: 'black',
              fontWeight: 'bold',
            }}>
            Chưa có tài khoản?
          </Text>
          <Text style={styles.registerText}> Đăng ký</Text>
        </View>
      </TouchableOpacity>
      <Text>---------------Hoặc--------------</Text>
      <View style={{flexDirection: 'row', padding: 10}}>
        <Image
          style={{width: 45, height: 45}}
          source={require('../img/fb.png')}
        />
        <Text>      </Text>
        <Image
          style={{width: 45, height: 45}}
          source={require('../img/google.png')}
        />
      </View>
    </View>
  );
};

export default Login;

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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    shadowOffset: {width: 0, height: 4},
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
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  checkboxText: {
    fontSize: 16,
    color: '#333',
  },
});
