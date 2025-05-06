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
  Alert,
} from 'react-native';
import { useTheme } from '../comp/MyTheme';
import Slideshow from '../comp/Slideshow';
import {Provider, useDispatch, useSelector} from 'react-redux'
import { useNavigation } from '@react-navigation/native'; // Import navigation

import { fetchProducts } from '../redux/ProductAction';
import BASE_URL from '../config/config';

const Home = () => {
  const { theme, toggleTheme } = useTheme();
  const navigation = useNavigation(); 
  const [modal, setModal] = useState(false);
  const [isSelected, setIsSelected] = useState(null);
  const [thoigian, settime] = useState(59);
  const [comment, setComment] = useState('');
  const listProduct = useSelector(state => state.listProductInStore.listProduct)
  const dispatch = useDispatch()


  useEffect(()=>{
    if(listProduct.length === 0){
      dispatch(fetchProducts())
    }
      
  },[dispatch,listProduct])

  const slideNgang =[
    {image:'https://i.pinimg.com/736x/92/7f/f8/927ff8bd4b7825c07442e026ffe8b71a.jpg'},
    {image:'https://i.pinimg.com/736x/81/ea/66/81ea667df46b0902b2dee0b67b34bc6c.jpg'},
    {image:'https://i.pinimg.com/736x/ad/48/d8/ad48d8fc2e5e5a6a66a1d71715b5281e.jpg'},
    {image:'https://i.pinimg.com/736x/81/bd/a6/81bda6f015ff23b90bf1a05176a6da4d.jpg'},
    {image:'https://i.pinimg.com/736x/3d/31/b2/3d31b2160b862e6adf946942fed0c308.jpg'},
    {image:'https://i.pinimg.com/736x/3d/2c/71/3d2c71abc87afe0ad9371bfdf6223535.jpg'},
  ]
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

const userID = useSelector((state) => state.listProductInStore.user?.id); // Lấy userID từ Redux Store
 
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
      console.log('data:', data);
  
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
    <ScrollView style={[styles.container, theme === 'light' ? styles.light : styles.dark]}>
    <View style={{backgroundColor:theme=='light'?'rgb(117, 178, 239)':'#6666FF',padding:20,height:300}}>
      {/* Icon giỏ hàng */}
      <TouchableOpacity
        style={styles.cartIcon}
        onPress={() => navigation.navigate('Cart')} // Chuyển sang màn hình Cart
      >
        <Text>🛒</Text>
      </TouchableOpacity>

      {/* Banner */}
      <View style={{  paddingBottom: 10 }}>
        <Slideshow />
      </View>
      <View style={{flexDirection:'row'}}>
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
      <View>
        {/* Slide trượt bằng tay */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.slider}>
          {slideNgang.map((item) => (
            <TouchableOpacity key={item.id} style={styles.slideItem}>
              <Image source={{ uri: item.image }} style={styles.slideImage} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      </View>
      </View>
      <View style={{backgroundColor:theme=='light'?'white':"black",marginTop:-50,borderTopRightRadius:30,borderTopLeftRadius:30,padding:10}}>
      <FlatList
        data={listProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} 
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
  </View>
      <Modal visible={modal} animationType="slide" transparent={false}>
        <View style={styles.fullModalContainer}>
          {isSelected && (
            <>
              <ImageBackground
                source={{ uri: isSelected.image }}
                style={styles.modalImageBackground}
              >
         
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => setModal(false)}
                >
                  <Text style={styles.backButtonText}>Quay về</Text>
                </TouchableOpacity>
              </ImageBackground>

       
              <ScrollView style={styles.scrollViewContent}>
                <View style={[styles.modalContent,{backgroundColor:theme=='light'?'white':'black'}]}>
            
                  <Text style={[styles.modalTitle,{color:theme=='light'?'black':'white'}]}>{isSelected.name}</Text>
                  <Text style={[styles.modalTitle,{color:theme=='light'?'red':'white'}]}>{isSelected.price}K</Text>
         
                  <Text style={[styles.modalDesc,{color:theme=='light'?'black':'white'}]}>{isSelected.mota}</Text>


                  <TextInput
                    style={[styles.commentInput,{backgroundColor:theme=='light'?'white':'gray'}]}
                    placeholder="Nhập bình luận của bạn..."
                    placeholderTextColor="#888"
                    multiline
                    value={comment}
                    onChangeText={setComment}
                  />


                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => {

                      alert('Bình luận đã được gửi!');
                    }}
                  >
                    <Text style={styles.submitButtonText}>Gửi bình luận</Text>
                  </TouchableOpacity>


                  <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => {
                      addToCart(isSelected)

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
    padding: 5,
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
    backgroundColor: '#fff', 
  },
  lightCard: {
    backgroundColor: '#F6F6F6',
  },
  darkCard: {
    backgroundColor: '#444',
  },
  image: {
    width: 120,
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
    width: 100,
    borderRadius: 15, 
    overflow: 'hidden', 
  },
  timerContainer: {
    flexDirection: 'row',
    height: 20,
    borderRadius:20
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
    zIndex: 50,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
    
   
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
  slider: {
    marginTop: 5,
    paddingHorizontal: 10,
    width:'210'
  },
  slideItem: {
    marginRight: 15,
    alignItems: 'center',
  },
  slideImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  slideText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});