import Order from '~/models/Order';
import checkParams from '~/utils/checkParams';

class OrderController {
  // [GET] /order/getOrders
  get = async (req, res) => {
    try {
      const userInfo = res.locals._userInfo;
      const orders = await Order.find({ user: userInfo._id });

      if (!orders) {
        return res.json({
          status: 'error',
          message: 'Orders not found',
          data: 'Orders not found',
        });
      }

      res.json({
        status: 'success',
        message: 'Get orders successfully',
        data: orders,
      });
    } catch (error) {
      res.send({ status: 'error', message: error.message, error: error });
    }
  };

  // [POST] /order/createOrder
  create = async (req, res) => {
    try {
      const userInfo = res.locals._userInfo;
      const { products, address, phoneNumber, paymentMethod, price } = req.body;
      checkParams(
        req.body,
        'products',
        'address',
        'phoneNumber',
        'paymentMethod',
        'price',
      );

      await Order.create({
        user: userInfo._id,
        products,
        address,
        phoneNumber,
        paymentMethod,
        price,
      });

      res.status(200).json({
        status: 'success',
        message: 'Create order successfully',
      });
    } catch (error) {
      res.send({ status: 'error', message: error.message, error: error });
    }
  };
}

export default OrderController;
