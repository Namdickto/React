import {configureStore} from "@reduxjs/toolkit"
import ProductReducer from './ProductReducer'
export default configureStore(
    {
        reducer:{
            listProductInStore : ProductReducer
        }
    }
)