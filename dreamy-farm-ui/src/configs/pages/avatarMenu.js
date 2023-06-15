import {
  Logout as LogoutIcon,
  Setting as SettingIcon,
} from '~/assets/images/icons/SvgIcons';
import { routes, routes as routesConfig } from '~/configs';

const isLoggedIn = true;

const configs = {
  menus: [
    {
      title: 'Settings',
      icon: SettingIcon,
      colorIcon: 'var(--blue-color)',
      to: routes.userInfos.root,
      condition: isLoggedIn,
    },
    {
      title: 'Logout',
      icon: LogoutIcon,
      colorIcon: 'var(--red-color)',
      to: routesConfig.login,
      condition: isLoggedIn,
    },
    {
      title: 'Login',
      icon: LogoutIcon,
      colorIcon: 'var(--blue-color)',
      to: routesConfig.login,
      condition: !isLoggedIn,
    },
  ],
};

export default configs;
