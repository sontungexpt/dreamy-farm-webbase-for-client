import express from 'express';
import FavoriteProductController from '~/controllers/FavoriteProductController';
import { checkUserInfo, checkIsUser } from '~/middlewares/UserMiddlewares';
import useMiddlewares from '~/utils/useMiddlewares';

const router = express.Router();
const favoriteProductController = new FavoriteProductController();

const middlewares = {
  '/get': [checkIsUser, checkUserInfo],
  '/update': [checkIsUser, checkUserInfo],
};

useMiddlewares(router, middlewares);

router.put('/update', favoriteProductController.update);

router.post('/get', favoriteProductController.get);

export default router;
