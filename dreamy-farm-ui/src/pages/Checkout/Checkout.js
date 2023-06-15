import { useSelector, useDispatch } from 'react-redux';
import { setPaymentMethod, clearOrder } from '~/redux/slices/orderSlice';
import { createUserOrder } from '~/redux/slices/userSlice';
import { clsx } from 'clsx';
import { toast } from 'react-toastify';

import styles from './Checkout.module.scss';
import { routes as routesConfig } from '~/configs';
import { checkoutConfigs as configs } from '~/configs/pages';
import { history } from '~/utils';
import { objectToArray } from '~/utils';

import SelectOtherAddress from './SelectOtherAddress';
import Selector from '~/components/Selector';
import LoadMore from '~/components/LoadMore';
import Button from '~/components/Button';
import ItemShoppingCart from '~/components/ItemShoppingCart';
import Trans from '~/components/Trans';
import Card from './Card';

function Checkout() {
  const dispatch = useDispatch();
  const {
    products,
    totalPrice,
    paymentMethod,
    count: productCount,
    address: addressOrder,
  } = useSelector((state) => state.order);
  const { email } = useSelector((state) => state.user);

  const handlePaymentMethodChange = (method) => {
    dispatch(setPaymentMethod(method));
  };

  const handleCompleteCheckout = () => {
    if (
      (products.length <= 0 ||
        addressOrder.phoneNumber === '' ||
        addressOrder.address === '' ||
        paymentMethod === '',
      totalPrice === 0)
    ) {
      toast.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    dispatch(
      createUserOrder({
        email,
        address: addressOrder.address,
        phoneNumber: addressOrder.phoneNumber,
        products: objectToArray(products),
        price: totalPrice,
        paymentMethod,
      }),
    );
    history.navigate(routesConfig.orderConfirm);
    dispatch(clearOrder());
  };

  return (
    <div className={styles.page}>
      <div className={clsx([styles.wrapper])}>
        <section className={styles.section}>
          <h1 className={styles.header}>
            <Trans>Billing address</Trans>
          </h1>
          <SelectOtherAddress />
        </section>
        <section className={styles.section}>
          <h1 className={styles.header}>
            <Trans>Payment method</Trans>
          </h1>
          <Selector
            data={configs.payments}
            itemClassName={clsx([styles.card, 'l-12 m-12 c-12'])}
            onInactiveItemClick={(item) =>
              handlePaymentMethodChange(item.method)
            }
            renderItem={(item) => (
              <Card
                name="payment-method"
                value={item.method}
                onChange={() => {}}
                hoverEffect
                checked={paymentMethod === item.method}
                title={item.title}
                icon={item.icon}
              />
            )}
          />
        </section>
        <section className={styles.section}>
          <h1 className={clsx([styles.header, styles.orderHeader])}>
            <Trans>Order detail</Trans>
          </h1>

          <h3 className={styles.subTitle}>
            {productCount} <Trans>products in cart</Trans>
          </h3>
          <LoadMore
            data={products}
            loadMoreLabel={<Trans>Load More</Trans>}
            collapseLabel={<Trans>Collapse</Trans>}
            noDataLabel={<Trans>There is no data to load</Trans>}
            autoHidden={false}
            canCollapse={true}
            loadAllFirst={true}
            controlClassName={styles.control}
            noDataClassName={styles.noData}
            itemsPerLoad={3}
            renderItem={(item, index, key) => (
              <ItemShoppingCart
                key={key}
                price={item.type.price}
                name={item.name}
                initialPrice={item.type.price * item.count}
                initialCount={item.count}
                image={item.image}
                id={item.id}
                type={item.type}
                hasCounter={false}
                hasBtnRemove={false}
              />
            )}
          />
        </section>
        <section className={styles.section}>
          <div className={styles.totalWrapper}>
            <h2 className={styles.total}>
              <Trans>Total</Trans>
            </h2>
            <h1 className={styles.price}>{totalPrice}đ</h1>
            <Button
              primary
              className={clsx([styles.completeBtn])}
              onClick={handleCompleteCheckout}
            >
              <Trans>Complete Checkout</Trans>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Checkout;
