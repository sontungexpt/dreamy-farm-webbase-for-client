import { Cart } from '~/assets/images/icons/SvgIcons';
import { useSelector } from 'react-redux';
import styles from './CartIcon.module.scss';

function CartIcon() {
  const count = useSelector((state) => state.order.count);
  return (
    <div className={styles.wrapper}>
      <Cart color="var(--primary-color)" className={styles.icon} />
      <div className={styles.badge}>{count}</div>
    </div>
  );
}

export default CartIcon;
