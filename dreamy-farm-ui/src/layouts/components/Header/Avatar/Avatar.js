import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '~/redux/slices/userSlice';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';

import styles from './Avatar.module.scss';
import { routes as routesConfig } from '~/configs';
import { avtarMenuConfigs as configs } from '~/configs/pages';

import { Floater, offset } from '~/components/Floater';
import Image from '~/components/Image';
import jpgImages from '~/assets/images/jpgs';
import { User as UserIcon } from '~/assets/images/icons/SvgIcons';
import Button from '~/components/Button';

function Avatar({ className }) {
  const dispatch = useDispatch();
  const { loggedIn, avatar } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Floater
      className={clsx([
        styles.wrapper,
        {
          [className]: className,
        },
      ])}
      anchorClassName={styles.anchor}
      floaterClassName={styles.floater}
      whenHover
      floatingProps={{
        placement: 'bottom-end',
        middleware: [
          offset(() => ({
            mainAxis: 4,
            crossAxis: 20,
          })),
        ],
      }}
      anchor={
        loggedIn ? (
          <Image
            className={clsx([styles.avatar, styles.navbarLink])}
            src={avatar}
            altSrc={jpgImages.noAvatar}
            alt="avatar"
          />
        ) : (
          <Link to={routesConfig.login} className={styles.navbarLink}>
            <UserIcon style={{ marginTop: '7px' }} />
          </Link>
        )
      }
      data={(() =>
        configs.menus.filter((menu) => menu.condition === loggedIn))()}
      renderItem={(item) => (
        <Button
          alignLeft
          onClick={item.title === 'Logout' ? handleLogout : null}
          className={styles.link}
          leftIcon={(() => {
            const Icon = item.icon;
            return <Icon color={item.colorIcon} className={styles.icon} />;
          })()}
          to={item.to}
        >
          {item.title}
        </Button>
      )}
    />
  );
}

Avatar.propTypes = {
  className: PropTypes.string,
};

export default Avatar;
