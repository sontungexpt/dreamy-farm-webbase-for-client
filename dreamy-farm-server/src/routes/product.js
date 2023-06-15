import express from 'express';
import ProductController from '~/controllers/ProductController';
const router = express.Router();

const productController = new ProductController();

// router.get('/vegetables', productController.vegetables);

// router.get('/herbs-aromatics', productController.herbs_aromatics);

// router.get('/frozens', productController.frozens);

// router.get('/meats-seafoods', productController.meats_seafoods);

// router.get('/dairy-eggs', productController.dairy_eggs);

// router.get('/fruits', productController.fruits);

router.post('/create', productController.create);

router.get('/detail/:slug', productController.show);

router.get('/:category', productController.getProductAtCategory);

export default router;
