import OrderItem from './OrderItem';
import { useState, useEffect } from 'react';
import styles from './Orders.module.scss';
import { getOrders } from '~/apiServices/userServices';
import { useSelector } from 'react-redux';

function Orders() {
  const [orders, setOrders] = useState([]); // [OrderItem, OrderItem, OrderItem
  const { email } = useSelector((state) => state.user);

  useEffect(() => {
    const handlegetOrders = async () => {
      const ordersRes = await getOrders(email);
      if (ordersRes) setOrders(ordersRes);
      else setOrders([]);
    };
    handlegetOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2>Orders</h2>
      <div className={styles.content}>
        {orders.map((order, index) => (
          <OrderItem
            key={index}
            className={styles.orderItem}
            orderDate={order.createdAt}
            orderName={order._id}
            orderPrice={order.price}
            orderState={
              order.status.charAt(0).toUpperCase() + order.status.slice(1)
            }
            numberOfItem={order.products.length}
          />
        ))}
      </div>
    </div>
  );
}

export default Orders;
