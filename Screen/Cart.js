import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

const Cart = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Chó', price: 300, quantity: 1, image: 'https://i.pinimg.com/736x/cb/54/10/cb5410ae82bb789a203348c7fb1f7e75.jpg' },
    { id: '2', name: 'Mèo', price: 400, quantity: 1, image: 'https://i.pinimg.com/736x/cb/54/10/cb5410ae82bb789a203348c7fb1f7e75.jpg' },
  ]);

  // Hàm tăng số lượng
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Hàm giảm số lượng
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Tính tổng số tiền
  const totalAmount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  // Hàm xử lý khi nhấn "Check Out"
  const handleCheckout = () => {
    navigation.navigate('Success'); // Chuyển sang màn hình thành công
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
          </View>
        )}
      />
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Check Out - {totalAmount}K</Text>
      </TouchableOpacity>
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
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  quantityButton: {
    backgroundColor: '#ddd',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: { fontSize: 16, fontWeight: 'bold' },
  quantityText: { fontSize: 16, fontWeight: 'bold' },
  checkoutButton: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  checkoutButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});