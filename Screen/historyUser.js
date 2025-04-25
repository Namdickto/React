import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, ScrollView, Alert } from 'react-native';
import BASE_URL from '../config/config';
import { useSelector } from 'react-redux';

const HistoryUser = () => {
  const [history, setHistory] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // Lưu trữ đơn hàng được chọn
  const [isModalVisible, setModalVisible] = useState(false);

  const userID = useSelector((state) => state.listProductInStore.user?.id); // Lấy userID từ Redux Store

  const fetchUserHistory = async () => {
    try {
      const res = await fetch(`${BASE_URL}/history?userId=${userID}`);
      const data = await res.json();
      setHistory(data);
    } catch (error) {
      console.error('Lỗi khi lấy lịch sử:', error);
      Alert.alert('Lỗi khi lấy lịch sử!');
    }
  };

  const deleteOrder = async (id) => {
    try {
      await fetch(`${BASE_URL}/history/${id}`, {
        method: 'DELETE',
      });
      setHistory(history.filter((order) => order.id !== id)); // Cập nhật danh sách sau khi xóa
      Alert.alert('Xóa đơn hàng thành công!');
    } catch (error) {
      console.error('Lỗi khi xóa đơn hàng:', error);
      Alert.alert('Lỗi khi xóa đơn hàng!');
    }
  };

  useEffect(() => {
    fetchUserHistory();
  }, []);

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lịch sử đặt hàng</Text>
      <FlatList
        data={[...history].reverse()} // Đảo ngược thứ tự để hiển thị đơn hàng mới nhất lên đầu
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <TouchableOpacity style={styles.orderDetails} onPress={() => openModal(item)}>
              <Text style={styles.orderText}>👤 Tên: <Text style={styles.boldText}>{item.userInfo.name}</Text></Text>
              <Text style={styles.orderText}>📍 Địa chỉ: <Text style={styles.boldText}>{item.userInfo.address}</Text></Text>
              <Text style={styles.orderText}>📞 Số điện thoại: <Text style={styles.boldText}>{item.userInfo.phone}</Text></Text>
              <Text style={styles.orderText}>💰 Tổng giá: <Text style={styles.boldText}>{item.totalPrice}K</Text></Text>
            </TouchableOpacity>
            {!item.isCompleted && ( // Chỉ hiển thị nút "Hủy" nếu đơn hàng chưa hoàn thành
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteOrder(item.id)}>
                <Text style={styles.deleteButtonText}>Hủy</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />

      {/* Modal hiển thị chi tiết đơn hàng */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chi tiết đơn hàng</Text>
            {selectedOrder && (
              <ScrollView>
                <FlatList
                  data={selectedOrder.items}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.itemDetail}>
                      <Text style={styles.itemText}>📦 Tên sản phẩm: <Text style={styles.boldText}>{item.name}</Text></Text>
                      <Text style={styles.itemText}>💵 Giá: <Text style={styles.boldText}>{item.price}K</Text></Text>
                      <Text style={styles.itemText}>🔢 Số lượng: <Text style={styles.boldText}>{item.quantity}</Text></Text>
                    </View>
                  )}
                />
              </ScrollView>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HistoryUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  orderDetails: {
    flex: 1,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  itemDetail: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  itemText: {
    fontSize: 16,
    color: '#555',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});