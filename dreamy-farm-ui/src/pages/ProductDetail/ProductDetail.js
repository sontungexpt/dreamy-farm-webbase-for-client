//libraries
import { clsx } from 'clsx';
import { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '~/apiServices/productServices';
import { useDispatch, useSelector } from 'react-redux';
import { addAndCalcPrice } from '~/redux/slices/orderSlice';
import { updateWishList } from '~/redux/slices/userSlice';

//configs
import styles from './ProductDetail.module.scss';

//components
import Counter from '~/components/Counter';
import Button from '~/components/Button';
import Image from '~/components/Image';
import ToggleIcon from '~/components/ToggleIcon';
import {
  FilledHeart as FilledHeartIcon,
  EmptyHeart as EmptyHeartIcon,
} from '~/assets/images/icons/SvgIcons';
import Selector from '~/components/Selector';
import Trans from '~/components/Trans';

function ProductDetail() {
  //state
  const [product, setProduct] = useState();
  const [price, setPrice] = useState(0);

  //global state
  const { loggedIn, email, wishList } = useSelector((state) => state.user);

  //hooks
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //ref
  const counterRef = useRef();
  const typeRef = useRef();

  //effect
  useEffect(() => {
    const handleGetProductDetail = async () => {
      const productRes = await getProduct(slug);

      const isFavorite = wishList.includes(
        (item) => (item._id = productRes._id),
      );
      if (productRes) {
        setProduct((prev) => ({
          ...prev,
          ...productRes,
          isFavorite,
        }));
      } else {
        navigate('/e404', { replace: true });
      }
    };
    handleGetProductDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // make sure product is loaded to render
  if (!product) return null;

  const handleAdd = () => {
    dispatch(
      addAndCalcPrice({
        id: product.slug,
        name: product.name,
        image: product.image,
        type: typeRef.current.activeItem,
        count: counterRef.current.value,
      }),
    );
  };

  const handleClickFavorite = (event, active) => {
    event.stopPropagation();
    event.preventDefault();
    if (active) {
      dispatch(
        updateWishList({
          email,
          productId: product._id,
          method: 'remove',
        }),
      );
    } else {
      dispatch(
        updateWishList({
          email,
          productId: product._id,
          method: 'add',
        }),
      );
    }
  };

  return (
    <div className={clsx(['grid', 'wide', styles.wrapper])}>
      <div className="row">
        <div className={clsx(['col', 'l-6', 'm-6', 'c-12', styles.col1])}>
          <div className={styles.imageFixed}>
            <Image
              className={styles.image}
              src={product.image}
              alt="Image Item"
            />
          </div>
        </div>
        <div className={clsx(['col', 'l-6', 'm-6', 'c-12'])}>
          <div className={styles.container}>
            <div>
              <div className={styles.header}>
                <h3 className={styles.name}>{product.name}</h3>
                <ToggleIcon
                  className={styles.favorite}
                  activeIcon={<FilledHeartIcon />}
                  unActiveIcon={<EmptyHeartIcon color="var(--red-color)" />}
                  initialActive={product.isFavorite}
                  disableToggle={!loggedIn}
                  onClick={handleClickFavorite}
                />
              </div>
              <p className={styles.price}>{price} đ</p>
            </div>

            <Selector
              ref={typeRef}
              className={clsx([styles.type, 'row'])}
              itemClassName={clsx(['col', 'l-4', 'm-4', 'c-6'])}
              itemActiveClassName={styles.active}
              onActiveChange={(item) =>
                setPrice(item.price * counterRef.current.value)
              }
              data={product.types}
              renderItem={(item) => (
                <div className={styles.typeButton}>{item.name}</div>
              )}
            />

            <Counter
              ref={counterRef}
              onIncrease={(curr, next) =>
                setPrice(typeRef.current.activeItem.price * next)
              }
              onDecrease={(curr, next) =>
                setPrice(typeRef.current.activeItem.price * next)
              }
              className={styles.quantity}
            />

            <Button onClick={handleAdd} primary className={styles.addBtn}>
              <Trans>Add to cart</Trans>
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.description}>
        <h3>
          <Trans>Description</Trans>
        </h3>
        <p>{product.description || <Trans>No description</Trans>}</p>
      </div>
    </div>
  );
}

export default ProductDetail;
