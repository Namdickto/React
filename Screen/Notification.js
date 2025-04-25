import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../comp/MyTheme';

const Notification = () => {
  // Dữ liệu thông báo mẫu
  const { theme, toggleTheme } = useTheme()
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Thông báo 1', content: 'Nội dung thông báo 1', time: '10 phút trước' },
    { id: '2', title: 'Thông báo 2', content: 'Nội dung thông báo 2', time: '1 giờ trước' },
    { id: '3', title: 'Thông báo 3', content: 'Nội dung thông báo 3', time: 'Hôm qua' },
    { id: '4', title: 'Thông báo 4', content: 'Nội dung thông báo 4', time: '2 ngày trước' },
    { id: '5', title: 'Thông báo 5', content: 'Nội dung thông báo 5', time: '1 tuần trước' },
  ]);

  // Hàm xử lý khi nhấn vào thông báo
  const handlePress = (item) => {
    alert(`Bạn đã nhấn vào: ${item.title}`);
  };

  return (
    <View style={[styles.container,{backgroundColor:theme =='light'?'white':'black'}]}>
      <Text style={[styles.header,{color:theme=='light'?'black':'red'}]}>Thông báo</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.notificationCard}
            onPress={() => handlePress(item)}
          >
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationContent}>{item.content}</Text>
            <Text style={styles.notificationTime}>{item.time}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  notificationCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  notificationContent: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
});