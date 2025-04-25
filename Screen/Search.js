import { FlatList, Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import InputByNam from '../comp/InputByNam';
import BASE_URL from '../config/config';
import { useSelector } from 'react-redux';

const Search = () => {
  const [products, setProducts] = useState([]);
  const [timkiem, setTimKiem] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null); // Lưu trữ sản phẩm được chọn
  const [isModalVisible, setModalVisible] = useState(false);

  const userID = useSelector((state) => state.listProductInStore.user?.id); // Lấy userID từ Redux Store

  const fetchdata = async () => {
    const res = await fetch(`${BASE_URL}/products`);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const datatimkiem = products.filter((item) =>
    item.name.toLowerCase().includes(timkiem.toLowerCase())
  );

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalVisible(false);
  };

  const addToCart = async (item) => {
    const product = {
      name: item.name,
      price: item.price,
      image: item.image,
      id: item.id,
    };

    try {
      const res = await fetch(`${BASE_URL}/carts?userId=${userID}`);
      const data = await res.json();

      if (data.length > 0) {
        const cart = data[0];

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
        const existingProductIndex = cart.items.findIndex((cartItem) => cartItem.id === product.id);

        if (existingProductIndex !== -1) {
          // Nếu sản phẩm đã tồn tại, tăng số lượng lên 1
          cart.items[existingProductIndex].quantity += 1;
        } else {
          // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới với số lượng là 1
          cart.items.push({ ...product, quantity: 1 });
        }

        // Cập nhật giỏ hàng trên server
        await fetch(`${BASE_URL}/carts/${cart.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cart),
        });

        Alert.alert('Đã cập nhật giỏ hàng!');
      } else {
        // Nếu giỏ hàng chưa tồn tại, tạo giỏ hàng mới
        await fetch(`${BASE_URL}/carts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: userID,
            items: [{ ...product, quantity: 1 }],
          }),
        });

        Alert.alert('Đã tạo giỏ hàng và thêm sản phẩm!');
      }
    } catch (error) {
      console.error('Lỗi thêm vào giỏ hàng:', error);
      Alert.alert('Lỗi khi thêm vào giỏ hàng');
    }
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require('../img/backgroudnen.png')}>
      <InputByNam value={timkiem} onChangeText={setTimKiem} />
      <FlatList
        data={datatimkiem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.card} onPress={() => openModal(item)}>
              <Image style={styles.image} source={{ uri: item.image }} />
              <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{item.price}K</Text>
                <Text style={styles.description}>{item.mota}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {/* Modal hiển thị chi tiết sản phẩm */}
      <Modal visible={isModalVisible} animationType="slide" transparent={false}>
        <View style={styles.modalContainer}>
          {selectedProduct && (
            <>
              <ImageBackground
                source={{ uri: selectedProduct.image }}
                style={styles.modalImageBackground}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={closeModal}>
                  <Text style={styles.backButtonText}>Quay về</Text>
                </TouchableOpacity>
              </ImageBackground>
              <ScrollView style={styles.modalContent}>
                <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
                <Text style={styles.modalPrice}>{selectedProduct.price}K</Text>
                <Text style={styles.modalDescription}>{selectedProduct.mota}</Text>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => {
                    addToCart(selectedProduct);
                    closeModal();
                  }}>
                  <Text style={styles.addToCartButtonText}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
              </ScrollView>
            </>
          )}
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default Search;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: '#555',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalImageBackground: {
    width: '100%',
    height: 300,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  backButton: {
    marginTop: 20,
    marginLeft: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'red',
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  addToCartButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  addToCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});