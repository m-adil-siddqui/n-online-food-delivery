import express from "express";
const router = express.Router();
import {index, store, show ,update, destory} from "controllers/category_controller";
import { uploadFile} from "common/helpers/function";

router.route('/').get(index).post(uploadFile(`../../../public/images/category`), store);
router.route('/:id').get(show).put(update).delete(destory)


export default router;