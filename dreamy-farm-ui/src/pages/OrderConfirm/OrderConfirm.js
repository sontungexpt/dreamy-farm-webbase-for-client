import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';

import styles from './OrderConfirm.module.scss';
import { GreenTick } from '~/assets/images/icons/SvgIcons';
function OrderConfirm() {
  const { t } = useTranslation('translations');
  return (
    <div className={styles.wrapper}>
      <div className={clsx([styles.greenTick])}>
        <GreenTick />
      </div>
      <div className={clsx([styles.sub])}>
        <h1>{t('Order Successfully')}</h1>
      </div>
      <div className={clsx([styles.text])}>
        <p>{t('Please check your email for more information')}</p>
      </div>
    </div>
  );
}
export default OrderConfirm;
