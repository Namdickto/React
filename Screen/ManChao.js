import { Image, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const ManChao = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Chuyển sang màn hình Đăng nhập
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../img/ph54320.png')} // Hình ảnh màn hình chào
        style={styles.image}
      />
    </View>
  );
};

export default ManChao;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c2a5f',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});