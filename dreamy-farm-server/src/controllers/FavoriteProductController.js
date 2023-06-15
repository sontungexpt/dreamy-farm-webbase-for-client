import FavoriteProduct from '~/models/FavoriteProduct';

class FavoriteProductController {
  // [GET] /user/getFavoriteProducts/get
  get = async (req, res) => {
    try {
      const userInfo = res.locals._userInfo;

      const favoriteProducts = await FavoriteProduct.find({
        user: userInfo._id,
      })
        .populate('product')
        .exec();

      if (!favoriteProducts) {
        return res.json({
          status: 'error',
          message: 'No favorite products found',
          data: 'No favorite products found',
        });
      }

      res.json({
        status: 'success',
        message: 'Get favorite products successfully',
        data: favoriteProducts,
      });
    } catch (error) {
      res.send({ status: 'error', message: error.message, error: error });
    }
  };

  // [PUT] /user/updateFavoriteProducts/update
  update = async (req, res) => {
    try {
      const userInfo = res.locals._userInfo;

      const { productId, method } = req.body;

      if (method) {
        if (method === 'add') {
          await FavoriteProduct.create({
            user: userInfo._id,
            product: productId,
          });
        } else if (method === 'remove') {
          await FavoriteProduct.findOneAndDelete({
            user: userInfo._id,
            product: productId,
          });
        }
      } else {
        const productRemove = await FavoriteProduct.findOneAndDelete({
          user: userInfo._id,
          product: productId,
        });
        if (!productRemove) {
          await FavoriteProduct.create({
            user: userInfo._id,
            product: productId,
          });
        }
      }

      await this.get(req, res);
    } catch (error) {
      res.json({ status: 'error', message: error.message, error: error });
    }
  };
}

export default FavoriteProductController;
