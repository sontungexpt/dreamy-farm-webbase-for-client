import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateWishList } from '~/redux/slices/userSlice';
import { addAndCalcPrice } from '~/redux/slices/orderSlice';

import styles from './AddableItem.module.scss';
import { routes as routeConfigs } from '~/configs';

import {
  FilledHeart as FilledHeartIcon,
  EmptyHeart as EmptyHeartIcon,
} from '~/assets/images/icons/SvgIcons';

import Button from '~/components/Button';
import ToggleIcon from '~/components/ToggleIcon';
import Image from '~/components/Image';
import Trans from '~/components/Trans';

function AddableItem({
  name,
  image,
  type,
  slug,
  id,
  isFavorite = false,

  onClickFavorite,
  onUnClickFavorite,
  onAdd,
}) {
  const dispatch = useDispatch();
  const { email, loggedIn } = useSelector((state) => state.user);

  const handleAdd = (event) => {
    event.stopPropagation();
    event.preventDefault();

    dispatch(
      addAndCalcPrice({
        id: slug,
        name: name,
        count: 1,
        image: image,
        type: type,
      }),
    );

    // custom logic
    onAdd && onAdd();
  };

  const handleClickFavorite = (event, active) => {
    event.stopPropagation();
    event.preventDefault();
    if (active) {
      dispatch(updateWishList({ email, productId: id, method: 'remove' }));
    } else {
      dispatch(updateWishList({ email, productId: id, method: 'add' }));
    }
  };

  return (
    <Link to={routeConfigs.moveProductDetail(slug)} className={styles.wrapper}>
      <Image className={styles.image} src={image} alt={name} />
      <div className={styles.content}>
        <div>
          <h3 className={styles.name}>{name}</h3>
          <ToggleIcon
            disableToggle={!loggedIn}
            initialActive={isFavorite}
            className={styles.favorite}
            activeIcon={<FilledHeartIcon />}
            unActiveIcon={<EmptyHeartIcon color="var(--red-color)" />}
            onClick={handleClickFavorite}
            onActive={onClickFavorite}
            onUnActive={onUnClickFavorite}
          />
        </div>
        <div>
          <p className={styles.quantity}>{type.name || ''}</p>
          <p className={styles.price}>{type.price || ''} đ</p>
        </div>
        <Button onClick={handleAdd} className={styles.addBtn} primary>
          <Trans>Add</Trans>
        </Button>
      </div>
    </Link>
  );
}

PropTypes.AddableItem = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  type: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  slug: PropTypes.string.isRequired,
  id: PropTypes.string,
  isFavorite: PropTypes.bool,

  onAdd: PropTypes.func,
  onClickFavorite: PropTypes.func,
  onUnClickFavorite: PropTypes.func,
};

export default AddableItem;
