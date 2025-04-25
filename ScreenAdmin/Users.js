import {FlatList, StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import BASE_URL from '../config/config';

const Users = () => {
  const [users, setUsers] = useState([]);

  // Lấy danh sách người dùng khi component được mount
  useEffect(() => {
    const getListUsers = async () => {
      try {
        const res = await fetch(`${BASE_URL}/users`);
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
      }
    };
    getListUsers();
  }, []);

  // Hàm xóa người dùng
  const deleteUser = async (id) => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn xóa người dùng này?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xóa",
          onPress: async () => {
            try {
              const res = await fetch(`${BASE_URL}/users/${id}`, {
                method: 'DELETE',
              });

              if (res.ok) {
                // Cập nhật danh sách người dùng sau khi xóa
                setUsers(users.filter(user => user.id !== id));
                Alert.alert("Thành công", "Người dùng đã được xóa!");
              } else {
                Alert.alert("Lỗi", "Không thể xóa người dùng!");
              }
            } catch (error) {
              console.error("Lỗi khi xóa người dùng:", error);
              Alert.alert("Lỗi", "Đã xảy ra lỗi khi xóa người dùng!");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách người dùng</Text>
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          return (
            <View style={styles.userCard}>
              <Text style={styles.userId}>ID: {item.id}</Text>
              <Text style={styles.userEmail}>Email: {item.email}</Text>
              <Text style={styles.userName}>Họ tên: {item.hoten}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteUser(item.id)}
              >
                <Text style={styles.deleteButtonText}>Xóa</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200ea',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  userName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});