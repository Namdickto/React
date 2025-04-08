import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Success = () => {
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Text style={styles.successText}>Thanh toán thành công!</Text>
      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Main')}>
        <Text style={styles.homeButtonText}>Quay về Trang chủ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  successText: { fontSize: 24, fontWeight: 'bold', color: '#4CAF50', marginBottom: 20 },
  homeButton: { backgroundColor: '#6200ea', padding: 15, borderRadius: 10 },
  homeButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});