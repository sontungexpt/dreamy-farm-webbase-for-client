import { clsx } from 'clsx';
import styles from './WishList.module.scss';

import PaginatePage from '~/components/PaginatePage';
import AddableItem from '~/components/AddableItem';
import Trans from '~/components/Trans';
import { useSelector } from 'react-redux';

function WishList() {
  const { wishList } = useSelector((state) => state.user);

  return (
    <div className={clsx(['grid', styles.wrapper])}>
      <div className={styles.header}>
        <h2>
          <Trans>Wishlist</Trans>
        </h2>
        <div className={styles.wishListCount}>{wishList.length}</div>
      </div>

      <div className={styles.main}>
        <PaginatePage
          className={styles.container}
          data={wishList}
          itemsPerPage={8}
          renderItem={({ product }) => (
            <div key={product._id} className="col l-3 m-4 c-6">
              <AddableItem
                id={product._id}
                name={product.name}
                image={product.image}
                type={product.types[0]}
                slug={product.slug}
                isFavorite={true}
              />
            </div>
          )}
        />
      </div>
    </div>
  );
}

export default WishList;
