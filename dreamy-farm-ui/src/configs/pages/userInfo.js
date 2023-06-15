import {
  Logout as LogoutIcon,
  Order as OrderIcon,
  EmptyHeart as EmptyHeartIcon,
  NoFilledUser as NoFilledUserIcon,
  Location as LocationIcon,
} from '~/assets/images/icons/SvgIcons';
import { routes as routeConfigs } from '~/configs';

const configs = {
  categories: [
    {
      title: 'Accounts',
      icon: NoFilledUserIcon,
      colorIcon: 'var(--blue-color)',
      to: routeConfigs.userInfos.root,
    },
    {
      title: 'Orders',
      icon: OrderIcon,
      colorIcon: 'var(--green-color)',
      to: routeConfigs.userInfos.orders,
    },
    {
      title: 'Wishlist',
      icon: EmptyHeartIcon,
      colorIcon: 'var(--yellow-color)',
      to: routeConfigs.userInfos.wishlist,
    },
    {
      title: 'Address',
      icon: LocationIcon,
      colorIcon: 'var(--blue-color)',
      to: routeConfigs.userInfos.address,
      separator: true,
    },
    {
      title: 'Logout',
      icon: LogoutIcon,
      colorIcon: 'var(--red-color)',
      to: routeConfigs.login,
    },
  ],
};

export default configs;
