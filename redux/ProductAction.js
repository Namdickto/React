import { createAsyncThunk } from '@reduxjs/toolkit';
import BASE_URL from '../config/config';
import {addProduct} from './ProductReducer';
import { Alert } from 'react-native';

const api_product = `${BASE_URL}/products`;

export const fetchProducts = () => {
  return async dispatch => {
    const res = await fetch(api_product);
    const data = await res.json();
    data.forEach(item => {
      dispatch(addProduct(item));
    });
  };
};

export const deleteProduct = createAsyncThunk(
    'deleeProduct',
    async (id)=>{
        const res = await fetch(`${BASE_URL}/products/${id}`,{
            method:'DELETE'
        })
        if(res.ok){
            return id;
        }
    }
)

export const addProductApi = createAsyncThunk(
  'add/product',
  async (objProduct)=>{
      const res = await fetch(api_product,{
        method:'POST',
        headers:{
          'Content-Type':'Application-json'
        },
        body:JSON.stringify(objProduct)
      })
      const data = await res.json()
      if(res.ok){
        return data
      }
  }
)
export const updateProductApi = createAsyncThunk(
  'update/product',
  async ({id,objProduct})=>{
      const res = await fetch(`${api_product}/${id}`,{
        method:'PUT',
        headers:{
          'Content-Type':'Application-json'
        },
        body:JSON.stringify(objProduct)
      })
      const data = await res.json()
      console.log('Dữ liệu trả về từ API:', data); // Kiểm tra dữ liệu trả về
      if(res.ok){
        return data
      }
  }
)
