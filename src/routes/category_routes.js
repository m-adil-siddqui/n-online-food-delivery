import express from "express";
const router = express.Router();
import {index, store, show ,update, destory} from "controllers/category_controller";


router.route('/').get(index).post(store);
router.route('/:id').get(show).put(update).delete(destory)


export default router;