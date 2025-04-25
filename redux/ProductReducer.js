import { createSlice } from "@reduxjs/toolkit";
import { addProductApi, deleteProduct, updateProductApi } from "./ProductAction";



const initialState ={
    listProduct : [],
    user: null,
}

const ProductSlice = createSlice(
    {
        name:'product',
        initialState,
        reducers:{
                addProduct(state,action){
                    state.listProduct.push(action.payload)
                },
                setUser(state, action) { 
                    state.user = action.payload;
                },
                clearUser(state) { 
                    state.user = null;
                },
        },
        extraReducers : builder =>{
            builder.addCase(deleteProduct.fulfilled,(state,action)=>{
                state.listProduct = state.listProduct.filter(item=> item.id != action.payload)
            }),
            builder.addCase(addProductApi.fulfilled,(state,action)=>{
                state.listProduct.push(action.payload)
            }),
            builder.addCase(updateProductApi.fulfilled,(state,action)=>{
                const {id,name,price,image,mota} = action.payload
                const objUpdate = state.listProduct.find(item => item.id == id)
                if(objUpdate){
                    objUpdate.name = name,
                    objUpdate.price = price,
                    objUpdate.image = image,
                    objUpdate.mota = mota
                }
            })
        }
    }
)
export const {addProduct,setUser,clearUser} = ProductSlice.actions
export default ProductSlice.reducer