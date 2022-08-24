import express from "express";
const router = express.Router();
import {index, store, show, productsByCategory } from "controllers/product_controller";
import { galleryUploadFile} from "common/helpers/function";


router.route('/').get(index).post(galleryUploadFile(`../../../public/images/products`, 4), store);
router.route('/:id').get(show);
router.route('/by-category/:id').get(productsByCategory);

export default router;