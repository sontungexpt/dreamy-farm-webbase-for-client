import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useState } from 'react';

import styles from './EditAddressCard.module.scss';
import Button from '~/components/Button';
import Input from '~/components/Input/Input';
import {
  Phone as PhoneIcon,
  Location as LocationIcon,
} from '~/assets/images/icons/SvgIcons';

import { useValidation } from '~/hooks';
import { userSampleRules } from '~/hooks/useValidation';

function EditAddressCard({
  onSave,
  close,

  initialAddress,
  initialPhoneNumber,
}) {
  const [newAddress, setNewAddress] = useState({
    address: initialAddress || '',
    phoneNumber: initialPhoneNumber || '',
  });
  const { t } = useTranslation('translations');
  const { errors, handleSubmit, handleFocus, handleBlur } = useValidation(
    newAddress,
    userSampleRules,
  );

  const handleSave = () => {
    handleSubmit(() => {
      onSave && onSave(newAddress.phoneNumber, newAddress.address);
      close();
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>{t('Edit address')}</h2>
      </div>
      <div className={clsx(['col l-12 m-12 c-12', styles.info])}>
        <Input
          labelIcon={<PhoneIcon color="var(--yellow-color)" />}
          className={styles.input}
          label={t('Phone number')}
          id="edit-address-phoneNumber"
          type="numeric"
          name="phoneNumber"
          required
          errorMessage={errors.phoneNumber}
          value={newAddress.phoneNumber}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <Input
          labelIcon={<LocationIcon color="var(--green-color)" />}
          className={styles.input}
          label={t('Address')}
          id="edit-address-address"
          type="text"
          name="address"
          required
          errorMessage={errors.address}
          value={newAddress.address}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      <div className={styles.buttonWrapper}>
        <Button blackOutline onClick={() => close()} className={styles.button}>
          {t('Cancel')}
        </Button>
        <Button primary onClick={handleSave} className={styles.button}>
          {t('Save')}
        </Button>
      </div>
    </div>
  );
}

EditAddressCard.propTypes = {
  onSave: PropTypes.func,
  close: PropTypes.func.isRequired,

  initialAddress: PropTypes.string,
  initialPhoneNumber: PropTypes.string,
};

export default EditAddressCard;
