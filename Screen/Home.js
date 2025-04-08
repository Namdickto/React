import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
} from 'react-native';
import { useTheme } from '../comp/MyTheme';
import Slideshow from '../comp/Slideshow';
import { useNavigation } from '@react-navigation/native'; // Import navigation
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import icon

const Home = () => {
  const { theme, toggleTheme } = useTheme();
  const navigation = useNavigation(); 
  const [modal, setModal] = useState(false);
  const [isSelected, setIsSelected] = useState(null);
  const [thoigian, settime] = useState(59);
  const [comment, setComment] = useState('');

  const dulieu = [
    { id: 1, image: 'https://i.pinimg.com/736x/cb/54/10/cb5410ae82bb789a203348c7fb1f7e75.jpg', name: 'Chó', price: 300, mota: 'Siêu đẹp trai' },
    { id: 2, image: 'https://i.pinimg.com/736x/cb/54/10/cb5410ae82bb789a203348c7fb1f7e75.jpg', name: 'Mèo', price: 400, mota: 'Dễ thương lắm nè!' },
    { id: 3, image: 'https://i.pinimg.com/736x/cb/54/10/cb5410ae82bb789a203348c7fb1f7e75.jpg', name: 'Lợn', price: 350, mota: 'Hồng hào và dễ thương!' },
    { id: 4, image: 'https://i.pinimg.com/736x/cb/54/10/cb5410ae82bb789a203348c7fb1f7e75.jpg', name: 'Lợn', price: 350, mota: 'Hồng hào và dễ thương!' },
    { id: 5, image: 'https://i.pinimg.com/736x/cb/54/10/cb5410ae82bb789a203348c7fb1f7e75.jpg', name: 'Lợn', price: 350, mota: 'Hồng hào và dễ thương!' },
    { id: 6, image: 'https://i.pinimg.com/736x/cb/54/10/cb5410ae82bb789a203348c7fb1f7e75.jpg', name: 'Lợn', price: 350, mota: 'Hồng hào và dễ thương!' },
    { id: 7, image: 'https://i.pinimg.com/736x/cb/54/10/cb5410ae82bb789a203348c7fb1f7e75.jpg', name: 'Lợn', price: 350, mota: 'Hồng hào và dễ thương!' },
  ];

  const openModal = (item) => {
    setIsSelected(item);
    setModal(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      settime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={[styles.container, theme === 'light' ? styles.light : styles.dark]}>
      {/* Icon giỏ hàng */}
      <TouchableOpacity
        style={styles.cartIcon}
        onPress={() => navigation.navigate('Cart')} // Chuyển sang màn hình Cart
      >
        <Text>🛒</Text>
      </TouchableOpacity>

      {/* Banner */}
      <View style={{ borderBottomWidth: 1, paddingBottom: 10 }}>
        <Slideshow />
      </View>

      {/* Timer */}
      <ImageBackground source={require('../img/x_tra.png')} style={styles.timerBackground}>
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>00</Text>
          <Text>:</Text>
          <Text style={styles.timerText}>30</Text>
          <Text>:</Text>
          <Text style={styles.timerText}>{thoigian}</Text>
        </View>
      </ImageBackground>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={dulieu}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Hiển thị 2 cột
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, theme === 'light' ? styles.lightCard : styles.darkCard]}
            onPress={() => openModal(item)}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.price}>{item.price}K</Text>
          </TouchableOpacity>
        )}
      />

      <Modal visible={modal} animationType="slide" transparent={false}>
        <View style={styles.fullModalContainer}>
          {isSelected && (
            <>
              {/* Hình ảnh sản phẩm full width */}
              <ImageBackground
                source={{ uri: isSelected.image }}
                style={styles.modalImageBackground}
              >
                {/* Nút quay về */}
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => setModal(false)}
                >
                  <Text style={styles.backButtonText}>Quay về</Text>
                </TouchableOpacity>
              </ImageBackground>

              {/* Nội dung chi tiết sản phẩm */}
              <ScrollView style={styles.scrollViewContent}>
                <View style={styles.modalContent}>
                  {/* Tiêu đề sản phẩm */}
                  <Text style={styles.modalTitle}>{isSelected.name}</Text>

                  {/* Mô tả sản phẩm */}
                  <Text style={styles.modalDesc}>{isSelected.mota}</Text>

                  {/* Input bình luận */}
                  <TextInput
                    style={styles.commentInput}
                    placeholder="Nhập bình luận của bạn..."
                    placeholderTextColor="#888"
                    multiline
                    value={comment}
                    onChangeText={setComment}
                  />

                  {/* Nút gửi bình luận */}
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => {
                      // Chức năng gửi bình luận (để trống)
                      alert('Bình luận đã được gửi!');
                    }}
                  >
                    <Text style={styles.submitButtonText}>Gửi bình luận</Text>
                  </TouchableOpacity>

                  {/* Nút thêm vào giỏ hàng */}
                  <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => {
                      // Chức năng thêm vào giỏ hàng (để trống)
                      alert('Đã thêm vào giỏ hàng!');
                    }}
                  >
                    <Text style={styles.addToCartButtonText}>Thêm vào giỏ hàng</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  light: {
    backgroundColor: '#CCCCCC',
  },
  dark: {
    backgroundColor: '#222',
  },
  listContainer: {
    marginTop: 10,
    padding: 5,
    backgroundColor: '#EEEEEE',
    borderRadius: 5,
  },
  card: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    elevation: 5,
    backgroundColor: '#fff', // Nền trắng cho sản phẩm
  },
  lightCard: {
    backgroundColor: '#F6F6F6',
  },
  darkCard: {
    backgroundColor: '#444',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  price: {
    fontSize: 14,
    color: 'red',
  },
  timerBackground: {
    height: 100,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  timerContainer: {
    flexDirection: 'row',
    height: 20,
  },
  timerText: {
    backgroundColor: 'black',
    color: 'white',
    paddingHorizontal: 5,
  },
  cartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền mờ
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20, // Bo góc trên trái
    borderTopRightRadius: 20, // Bo góc trên phải
    marginTop: -20, // Đẩy nội dung lên để che viền
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'left',
  },
  modalDesc: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 20,
    color: '#666',
  },
  commentInput: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    textAlignVertical: 'top', // Đặt con trỏ ở đầu input
    backgroundColor: '#f9f9f9',
  },
  submitButton: {
    backgroundColor: '#4CAF50', // Màu xanh lá
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 5, // Đổ bóng (Android)
    shadowColor: '#000', // Đổ bóng (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  submitButtonText: {
    color: '#fff', // Màu chữ trắng
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  closeButton: { marginTop: 15, backgroundColor: 'red', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 },
  closeButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  fullModalContainer: {
    flex: 1,
    backgroundColor: '#fff', // Nền trắng
  },
  modalImageBackground: {
    width: '100%',
    height: 300, // Chiều cao cố định
    justifyContent: 'flex-start', // Căn nội dung lên trên
    alignItems: 'flex-start', // Căn nội dung sang trái
  },
  backButton: {
    marginTop: 20,
    marginLeft: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền mờ
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff', // Màu chữ trắng
    fontWeight: 'bold',
    fontSize: 14,
  },
  addToCartButton: {
    backgroundColor: '#FF5722', // Màu cam
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
    elevation: 5, // Đổ bóng (Android)
    shadowColor: '#000', // Đổ bóng (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  addToCartButtonText: {
    color: '#fff', // Màu chữ trắng
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  scrollViewContent: {
    flex: 1,
    backgroundColor: '#fff', // Nền trắng cho nội dung cuộn
  },
  flatListContainer: {
    paddingBottom: 20, // Khoảng cách dưới cùng
  },
});