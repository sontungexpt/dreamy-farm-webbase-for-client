import {
  Wallet as WalletIcon,
  CreditCard as CreditCardIcon,
} from '~/assets/images/icons/SvgIcons';

const configs = {
  payments: [
    {
      title: 'Cash on delivery',
      method: 'cash',
      icon: <WalletIcon color="var(--primary-color)" />,
    },
    {
      title: 'Credit card',
      method: 'credit',
      icon: <CreditCardIcon color="var(--red-color)" />,
    },
  ],
};

export default configs;
