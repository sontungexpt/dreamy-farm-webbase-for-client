import styles from './AddressCard.module.scss';
import {
  Address as AddressIcon,
  Phone as PhoneIcon,
} from '~/assets/images/icons/SvgIcons';
import { clsx } from 'clsx';
import OptionCard from './OptionCard';
import PropTypes from 'prop-types';

function AddressCard({
  phoneNumber,
  address,
  onSaveEdit,
  onDelete,
  onSelectPrimary,
  actived = false,
  className,
}) {
  return (
    <div
      className={clsx([
        'grid',
        styles.addressCard,
        {
          [className]: className,
        },
      ])}
    >
      <div className={styles.info}>
        <div className={styles.infoElement}>
          <PhoneIcon className={styles.icon} color="var(--red-color)" />
          <span>{phoneNumber}</span>
          {actived && <span className={styles.defaultMark}>Default</span>}
        </div>
        <div className={styles.infoElement}>
          <AddressIcon className={clsx([styles.icon, styles.addressIcon])} />
          <span>{address}</span>
        </div>
      </div>
      <div className={styles.threedots}>
        <OptionCard
          address={address}
          phoneNumber={phoneNumber}
          onDelete={onDelete}
          onSaveEdit={onSaveEdit}
          onSelectPrimary={onSelectPrimary}
          actived={actived}
        />
      </div>
    </div>
  );
}

AddressCard.propTypes = {
  phoneNumber: PropTypes.string,
  address: PropTypes.string,
  onSaveEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onSelectPrimary: PropTypes.func,
  actived: PropTypes.bool,
  className: PropTypes.string,
};

export default AddressCard;
