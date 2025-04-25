import React, { useState, useMemo, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import BASE_URL from '../config/config';
import { useSelector } from 'react-redux';

const Cart = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false); // Trạng thái hiển thị modal
  const [userInfo, setUserInfo] = useState({ name: '', phone: '', address: '' }); // Thông tin người dùng
  const userID = useSelector((state) => state.listProductInStore.user?.id); // Lấy userID từ Redux Store

  const removeFromCart = async (id) => {
    try {
      // Lọc bỏ sản phẩm khỏi danh sách trong state
      const updatedItems = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedItems);
  
      // Cập nhật giỏ hàng trên server
      const res = await fetch(`${BASE_URL}/carts?userId=${userID}`);
      const data = await res.json();
  
      if (data.length > 0) {
        const cart = data[0];
        cart.items = updatedItems;
  
        await fetch(`${BASE_URL}/carts/${cart.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cart),
        });
      }
  
      Alert.alert('Xóa sản phẩm thành công!');
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error);
      Alert.alert('Lỗi khi xóa sản phẩm!');
    }
  };
  const listCart = async () => {
    try {
      const res = await fetch(`${BASE_URL}/carts?userId=${userID}`);
      const data = await res.json();

      if (data.length > 0) {
        const items = data[0].items.map((item) => ({
          ...item,
          quantity: item.quantity || 1, // Đảm bảo có số lượng mặc định là 1
        }));
        setCartItems(items);
      } 
    } catch (error) {
      console.error('Lỗi khi lấy giỏ hàng:', error);
      Alert.alert('Lỗi khi lấy giỏ hàng!');
    }
  };

  useEffect(() => {
    listCart();
  }, []);

  const increaseQuantity = async (id) => {
    try {
      const updatedItems = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );

      setCartItems(updatedItems);

      // Cập nhật giỏ hàng trên server
      const res = await fetch(`${BASE_URL}/carts?userId=${userID}`);
      const data = await res.json();

      if (data.length > 0) {
        const cart = data[0];
        cart.items = updatedItems;

        await fetch(`${BASE_URL}/carts/${cart.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cart),
        });
      }
    } catch (error) {
      console.error('Lỗi khi tăng số lượng:', error);
      Alert.alert('Lỗi khi tăng số lượng sản phẩm!');
    }
  };

  const decreaseQuantity = async (id) => {
    try {
      const updatedItems = cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

      setCartItems(updatedItems);

      // Cập nhật giỏ hàng trên server
      const res = await fetch(`${BASE_URL}/carts?userId=${userID}`);
      const data = await res.json();

      if (data.length > 0) {
        const cart = data[0];
        cart.items = updatedItems;

        await fetch(`${BASE_URL}/carts/${cart.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cart),
        });
      }
    } catch (error) {
      console.error('Lỗi khi giảm số lượng:', error);
      Alert.alert('Lỗi khi giảm số lượng sản phẩm!');
    }
  };

  // Hàm xử lý khi nhấn "Check Out"
  const handleCheckout = () => {
    setModalVisible(true); // Hiển thị modal nhập thông tin
  };

  // Hàm lưu thông tin vào `history`
  const saveOrderToHistory = async () => {
    if (!userInfo.name || !userInfo.phone || !userInfo.address) {
      Alert.alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    try {
      const totalPrice = calculateTotalPrice(); // Tính tổng tiền

      const order = {
        userId: userID,
        userInfo,
        items: cartItems,
        totalPrice, // Thêm tổng tiền vào lịch sử
        date: new Date().toISOString(), // Thêm ngày đặt hàng
      };

      // Gửi thông tin đơn hàng vào `history` trong db.json
      await fetch(`${BASE_URL}/history`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });

      // Xóa giỏ hàng trên server
      const res = await fetch(`${BASE_URL}/carts?userId=${userID}`);
      const data = await res.json();

      if (data.length > 0) {
        const cart = data[0];
        await fetch(`${BASE_URL}/carts/${cart.id}`, {
          method: 'DELETE', // Sử dụng phương thức DELETE để xóa giỏ hàng
        });
      }

      // Làm trống giỏ hàng trong state
      setCartItems([]);

      Alert.alert('Đặt hàng thành công!');
      setModalVisible(false); // Đóng modal
      navigation.navigate('Success'); // Chuyển sang màn hình thành công
    } catch (error) {
      console.error('Lỗi khi lưu lịch sử:', error);
      Alert.alert('Lỗi khi lưu lịch sử!');
    }
  };
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Giỏ hàng</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price}K</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => decreaseQuantity(item.id)}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => increaseQuantity(item.id)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
              
            </View>
            <TouchableOpacity style={{position:'absolute',marginLeft:300,marginTop:70}} onPress={()=>{removeFromCart(item.id)}}>
                <Image style={{width:30,height:30}} source={require('../img/delete_icon.png')}/>
              </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Tổng tiền : {calculateTotalPrice()}k</Text>
      </TouchableOpacity>

      {/* Modal nhập thông tin */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nhập thông tin đặt hàng</Text>
            <TextInput
              style={styles.input}
              placeholder="Họ và tên"
              value={userInfo.name}
              onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Số điện thoại"
              keyboardType="phone-pad"
              value={userInfo.phone}
              onChangeText={(text) => setUserInfo({ ...userInfo, phone: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Địa chỉ"
              value={userInfo.address}
              onChangeText={(text) => setUserInfo({ ...userInfo, address: text })}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#4CAF50' }]}
                onPress={saveOrderToHistory}
              >
                <Text style={styles.modalButtonText}>Xác nhận</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#f44336' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  cartItem: { flexDirection: 'row', marginBottom: 10, backgroundColor: '#fff', padding: 10, borderRadius: 10, elevation: 3 },
  itemImage: { width: 60, height: 60, borderRadius: 10 },
  itemDetails: { marginLeft: 10, justifyContent: 'center', flex: 1 },
  itemName: { fontSize: 16, fontWeight: 'bold' },
  itemPrice: { fontSize: 14, color: 'red', marginBottom: 10 },
  quantityText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  quantityButton: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#4CAF50', justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 },
  quantityButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  checkoutButton: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  checkoutButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { width: '90%', backgroundColor: '#fff', padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  modalButton: { flex: 1, padding: 10, marginHorizontal: 5, borderRadius: 5, alignItems: 'center' },
  modalButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});