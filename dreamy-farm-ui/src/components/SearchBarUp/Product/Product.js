import PropTypes from 'prop-types';
import { clsx } from 'clsx';

import styles from './Product.module.scss';
import Image from '~/components/Image';

function Product({ image, title, active, activeClassName }) {
  return (
    <div
      className={clsx([
        styles.wrapper,
        {
          [styles.active]: active,
        },
        {
          [activeClassName]: active,
        },
      ])}
    >
      <div className={styles.paddingImage}>
        <div className={styles.imageWrapper}>
          <Image className={styles.image} src={image} alt={title} />
        </div>
      </div>
      <h3 className={styles.title}>{title}</h3>
    </div>
  );
}

Product.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  activeClassName: PropTypes.string,
};

export default Product;
