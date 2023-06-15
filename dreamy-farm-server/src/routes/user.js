import express from 'express';
import UserController from '~/controllers/UserController';
import { checkUserInfo, checkIsUser } from '~/middlewares/UserMiddlewares';
import useMiddlewares from '~/utils/useMiddlewares';

const router = express.Router();

const userController = new UserController();

const middlewares = {
  '/infos': [checkUserInfo],
  '/feedback': [checkIsUser, checkUserInfo],
  '/getOrders': [checkIsUser, checkUserInfo],
  '/updateProfile': [checkIsUser, checkUserInfo],
  '/addAddress': [checkIsUser, checkUserInfo],
  '/updateAddress': [checkIsUser, checkUserInfo],
  '/deleteAddress': [checkIsUser, checkUserInfo],
};

useMiddlewares(router, middlewares);

router.post('/register', userController.register);

router.post('/forgot-password', userController.forgotPassword);

router.post('/login', userController.login);

router.post('/infos', userController.getUserInfos);

router.post('/feedback', userController.feedback);

router.put('/updateProfile', userController.updateProfile);

router.put('/addAddress', userController.addAddress);

router.put('/updateAddress', userController.updateAddress);

router.put('/deleteAddress', userController.deleteAddress);

export default router;
