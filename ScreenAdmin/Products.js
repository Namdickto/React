import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  ActivityIndicator,
  Alert,
  Button,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addProductApi,
  deleteProduct,
  fetchProducts,
  updateProductApi,
} from '../redux/ProductAction';
import InputByNam from '../comp/InputByNam';

const Products = () => {
  const dispatch = useDispatch();
  const listProduct = useSelector(
    state => state.listProductInStore.listProduct,
  );
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [mota, setMota] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // sửa từ true => false
  const [idEdit, setIdEdit] = useState(null);

  useEffect(() => {
    if (listProduct.length == 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, listProduct]);

  const handleShowDetails = item => {
    setSelectedProduct(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const handleDelete = id => {
    dispatch(deleteProduct(id))
      .then(() => {
        Alert.alert('Xóa thành công');
      })
      .catch(() => {
        Alert.alert('Lỗi xóa sản phẩm');
      });
  };

  const handleAdd = () => {
    if (!name || !image || !price) {
      Alert.alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    const newProduct = {
      name,
      image,
      price,
      mota,
    };

    dispatch(addProductApi(newProduct)).then(() => {
      Alert.alert('Thêm thành công');
      setName('');
      setImage('');
      setPrice('');
      setMota('');
    });
  };

  const handleUpdate = () => {
    if (idEdit == null) {
      Alert.alert('Vui lòng chọn sản phẩm để sửa');
      return;
    }

    const updateprd = {
      name,
      image,
      price,
      mota,
    };

    dispatch(updateProductApi({id: idEdit, objProduct: updateprd})).then(() => {
      setName('');
      setIdEdit(null);
      setPrice('');
      setMota('');
      setImage('');
      Alert.alert('Cập nhật thành công');
    });
  };

  const showEdit = item => {
    setName(item.name);
    setIdEdit(item.id);
    setPrice(item.price.toString());
    setMota(item.mota);
    setImage(item.image);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Danh sách sản phẩm</Text>
      <View>
      <InputByNam placeholder="Name product" onChangeText={setName} value={name} />
      <InputByNam placeholder="Img url product" onChangeText={setImage} value={image} />
      <InputByNam placeholder="Price product" onChangeText={setPrice} value={price} />
      <InputByNam placeholder="Mô tả product" onChangeText={setMota} value={mota} />
      <Button title={idEdit ? 'Cập nhật' : 'Thêm'} onPress={idEdit ? handleUpdate : handleAdd} />
      <FlatList
        data={[...listProduct].reverse()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleShowDetails(item)}>
            <View style={styles.productCard}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price}K</Text>
                <Text style={styles.productDescription}>{item.mota}</Text>
                <View style={styles.actionContainer}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.editButton]}
                    onPress={() => showEdit(item)}
                  >
                    <Text style={styles.actionButtonText}>Sửa</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Text style={styles.actionButtonText}>Xóa</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Không có sản phẩm nào</Text>
        }
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedProduct ? (
              <ScrollView>
                <Image source={{uri: selectedProduct.image}} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
                <Text style={styles.modalPrice}>{selectedProduct.price}K</Text>
                <Text style={styles.modalDescription}>{selectedProduct.mota}</Text>

                <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                  <Text style={styles.closeButtonText}>Đóng</Text>
                </TouchableOpacity>
              </ScrollView>
            ) : (
              <ActivityIndicator size="large" color="#007BFF" />
            )}
          </View>
        </View>
      </Modal></View>
    </ScrollView>
  );
};

export default Products;

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
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#007BFF',
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white'
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalPrice: {
    fontSize: 18,
    color: '#007BFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: 'green',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  productDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
});
