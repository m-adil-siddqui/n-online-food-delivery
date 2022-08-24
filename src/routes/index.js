import express from 'express';
let router = express.Router();
import { index } from "controllers/index_controller";



/* GET home page. */
router.get('/home', index);

router.get('/test', (req, res) => {
    return res.send('hello');
})

// ..stuff below
export default router;

