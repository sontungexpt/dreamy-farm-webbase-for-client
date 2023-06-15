//libraries
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

//configs
import styles from './Detail.module.scss';
import { routes as routeConfigs } from '~/configs';
import { productsPageConfigs as configs } from '~/configs/pages';

//components
import Counter from '~/components/Counter';
import Button from '~/components/Button';
import Image from '~/components/Image';
import ToggleIcon from '~/components/ToggleIcon';
import {
  FilledHeart as FilledHeartIcon,
  EmptyHeart as EmptyHeartIcon,
} from '~/assets/images/icons/SvgIcons';

function Detail({ id = 1, image, name, price, description }) {
  const [priceRangeSelected, setPriceRangeSelected] = useState(
    configs.priceRanges[0],
  );
  const { t } = useTranslation('translations');
  const counterRef = useRef();

  return (
    <div className={styles.wrapper}>
      <div className={clsx(['grid', styles.info])}>
        <div className="row">
          <Image
            className={clsx(['col', 'l-5', 'm-5', 'c-12', styles.image])}
            src={image}
            alt="item"
          />
          <div
            className={clsx(['col', 'l-7', 'm-7', 'c-12', styles.container])}
          >
            <div>
              <div className={styles.header}>
                <Link to={routeConfigs.moveProductDetail(id)}>
                  <h3 className={styles.name}>{name}</h3>
                </Link>
                <ToggleIcon
                  className={styles.favorite}
                  activeIcon={<FilledHeartIcon />}
                  unActiveIcon={<EmptyHeartIcon color="var(--red-color)" />}
                />
              </div>
              <p className={styles.price}>{price} đ</p>
            </div>
            <div className={clsx([styles.type])}>
              {configs.priceRanges.map((priceRange) => (
                <Button
                  key={priceRange}
                  onClick={() => setPriceRangeSelected(priceRange)}
                  className={clsx([
                    styles.typeButton,
                    {
                      [styles.active]: priceRange === priceRangeSelected,
                    },
                  ])}
                >
                  {priceRange}
                </Button>
              ))}
            </div>
            <Counter ref={counterRef} className={styles.quantity} />
            <Button
              onClick={() => console.log(counterRef.current.value)}
              primary
              className={styles.addBtn}
            >
              {t('Add to cart')}
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.description}>
        <h3>{t('Description')}</h3>
        <p>
          {description ||
            'Beli aneka produk di Toko YouReady secara online sekarang. Kamu bisa beli produk dari Toko YouReady dengan aman & mudah dari Kota Bandung. Ingin belanja lebih hemat & terjangkau di Toko YouReady? Kamu bisa gunakan fitur Cicilan 0% dari berbagai bank dan fitur Bebas Ongkir di Toko YouReady sehingga kamu bisa belanja online dengan nyaman di Tokopedia. Beli aneka produk terbaru di Toko YouReady dengan mudah dari genggaman tangan kamu menggunakan Aplikasi Tokopedia. Cek terus juga Toko YouReady untuk update Produk, Kode Voucher hingga Promo Terbaru dari Toko YouReady Terbaru secara online di Tokopedia'}
        </p>
      </div>
    </div>
  );
}

export default Detail;
