import express from "express"
import { Router } from 'express';
import { getProductById, getProducts ,deleteProduct,updateProduct,createProduct,createProductReview,getTopProducts} from '../controllers/productController.js'
import { protect ,admin} from "../middleware/authMiddleWare.js";
const router = Router();
router.route('/').get(getProducts).post(protect,admin,createProduct)
router.route('/:id/reviews').post(protect,createProductReview)
router.get('/top',getTopProducts)
router.route('/:id').get(getProductById).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct)




export default router