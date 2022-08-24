import express from "express";
const router = express.Router();
import {index, store, show ,update, destory} from "controllers/category_controller";
import { galleryUploadFile} from "common/helpers/function";

router.route('/').get(index).post(galleryUploadFile(`../../../public/images/category`, 1), store);
router.route('/:id').get(show).put(update).delete(destory)


export default router;