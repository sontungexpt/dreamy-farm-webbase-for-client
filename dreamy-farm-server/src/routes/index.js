import productRouter from './product';
import userRouter from './user';
import siteRouter from './site';
import recipeRouter from './recipe';
import orderRouter from './order';
import favoriteProductRouter from './favoriteProduct';

import { checkToken, checkUser } from '~/middlewares/UserMiddlewares';

function route(app) {
  app.use('/recipes', recipeRouter);

  app.use('/products', productRouter);

  app.use(
    '/user/favoriteProducts',
    checkToken,
    checkUser,
    favoriteProductRouter,
  );

  app.use('/user', checkToken, checkUser, userRouter);

  app.use('/order', checkToken, checkUser, orderRouter);

  app.use('/', siteRouter);
}

export default route;
