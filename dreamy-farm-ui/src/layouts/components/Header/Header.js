// libabry
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';

// configs
import styles from './Header.module.scss';
import { routes as routesConfig } from '~/configs';

//components
import SearchBar from '~/components/SearchBarUp';
import Product from '~/components/SearchBarUp/Product';
import Logo from '~/assets/images/icons/Logo';
import CartIcon from './CartIcon';
import Avatar from './Avatar';
import ToggleIcon from '~/components/ToggleIcon';
import {
  EmptyHeart as EmptyHeartIcon,
  FilledHeart as FilledHeartIcon,
} from '~/assets/images/icons/SvgIcons';

function Header() {
  const { t } = useTranslation('translations');
  const { wishList } = useSelector((state) => state.user);

  return (
    <header className={styles.wrapper}>
      <nav className={clsx(['grid', 'wide', styles.navbar])}>
        <ul className={styles.navbarList}>
          <li className={styles.navbarItem}>
            <Link to={routesConfig.root} className={styles.navbarLink}>
              <Logo />
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link to={routesConfig.products} className={styles.navbarLink}>
              {t('Products')}
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link to={routesConfig.recipes} className={styles.navbarLink}>
              {t('Recipes')}
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link to={routesConfig.aboutUs} className={styles.navbarLink}>
              {t('About Us')}
            </Link>
          </li>
        </ul>
        <ul className={styles.navbarList}>
          <li className={styles.navbarItem}>
            <SearchBar
              placeholder="Search products"
              renderItem={(item, index, active) => (
                <Product title={item.name} image={item.image} active={active} />
              )}
            />
          </li>

          <li className={styles.navbarItem}>
            <Link
              to={routesConfig.userInfos.wishlist}
              className={styles.navbarLink}
            >
              <ToggleIcon
                activeIcon={<FilledHeartIcon />}
                unActiveIcon={<EmptyHeartIcon color="var(--red-color)" />}
                disableToggle={true}
                customEvent={() => wishList.length > 0}
              />
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link
              isAllowed={true}
              to={routesConfig.shoppingCart}
              className={styles.navbarLink}
              errorMessage="Your cart is empty"
            >
              <CartIcon />
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Avatar />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
