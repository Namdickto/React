import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';

const ADScreen = () => {
  const navigation = useNavigation();

  // Giá trị động cho góc xoay
  const rotation = useSharedValue(0);

  // Phong cách động cho hình ảnh
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  // Bắt đầu hiệu ứng xoay
  React.useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 2000 }), -1); // Xoay liên tục
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản lý hệ thống</Text>
      {/* Hình ảnh xoay */}
      <Animated.Image
        style={[{ width: 50, height: 50 ,marginBottom:20}, animatedStyle]}
        source={require('../img/setting.png')}
      />
      <View style={styles.buttonContainer}>
        {/* Nút Quản lý người dùng */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Users')}
        >
          <Image
            source={require('../img/users.png')} // Thay bằng icon của bạn
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Quản lý người dùng</Text>
        </TouchableOpacity>

        {/* Nút Quản lý sản phẩm */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Products')} // Thay bằng màn hình quản lý sản phẩm
        >
          <Image
            source={require('../img/products.png')} // Thay bằng icon của bạn
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Quản lý sản phẩm</Text>
        </TouchableOpacity>

        {/* Nút Thống kê */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Statistics')} // Thay bằng màn hình thống kê
        >
          <Image
            source={require('../img/static.png')} // Thay bằng icon của bạn
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Đơn hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ADScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});