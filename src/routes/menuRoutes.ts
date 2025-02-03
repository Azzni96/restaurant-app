import express from 'express';
import { fetchMenus, addMenu } from '../controllers/menuController';
import upload from '../utils/multerConfig';

const router = express.Router();

router.get('/:restaurant_id', fetchMenus);
router.post('/:restaurant_id/menu', upload.single('image'), addMenu);

export default router;