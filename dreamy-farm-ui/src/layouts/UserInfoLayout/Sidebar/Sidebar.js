import { clsx } from 'clsx';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import styles from './Sidebar.module.scss';
import { userInfoConfigs as configs } from '~/configs/pages';
import { useDispatch } from 'react-redux';
import { logout } from '~/redux/slices/userSlice';

import Menu, { MenuItem } from './Menu';
import { Setting as SettingIcon } from '~/assets/images/icons/SvgIcons';

function Sidebar({ className, ...props }) {
  const { t } = useTranslation('translations');
  const dispatch = useDispatch();

  const handleLogout = (title) => {
    if (title === 'Logout') {
      dispatch(logout());
    }
  };

  return (
    <aside
      {...props}
      className={clsx([
        styles.sidebar,
        {
          [className]: className,
        },
      ])}
    >
      <div className={styles.title}>
        <span>
          <SettingIcon width="30px" />
        </span>
        <h2>{t('Informations')}</h2>
      </div>
      <Menu className={styles.menu}>
        {configs.categories.map(
          ({ title, icon: Icon, to, colorIcon, separator }, index) => (
            <MenuItem
              to={to}
              className={clsx([styles.menuItem, 'col', 'l-12', 'm-12', 'c-6'])}
              activeClassName={styles.active}
              separatorClassName={clsx([{ [styles.separator]: separator }])}
              key={index}
              title={t(title)}
              icon={<Icon color={colorIcon} className={styles.icon} />}
              onClick={() => handleLogout(title)}
            />
          ),
        )}
      </Menu>
    </aside>
  );
}

Sidebar.propTypes = {
  className: PropTypes.string,
};

export default Sidebar;
