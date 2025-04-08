import { Image, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const banner = [
    require('../img/banner1.png'),
    require('../img/banner2.png'),
    require('../img/banner3.png'),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banner.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup tránh rò rỉ bộ nhớ
  }, []);

  return (
    <View style={{borderWidth:1,width:'100%',height:100}}>
      <Image source={banner[currentIndex]} style={styles.image} />
    </View>
  );
};

export default Slideshow;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
});
