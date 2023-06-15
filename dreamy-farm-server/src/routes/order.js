import express from 'express';
import OrderController from '~/controllers/OrderController';
import { checkUserInfo, checkIsUser } from '~/middlewares/UserMiddlewares';
import useMiddlewares from '~/utils/useMiddlewares';

const router = express.Router();

const orderController = new OrderController();

const middlewares = {
  '/get': [checkIsUser, checkUserInfo],
  '/create': [checkIsUser, checkUserInfo],
};

useMiddlewares(router, middlewares);

router.get('/get', orderController.get);
router.post('/create', orderController.create);

export default router;
