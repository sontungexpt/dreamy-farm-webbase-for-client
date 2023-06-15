import { useRef, useState } from 'react';
import { clsx } from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { addUserAddress } from '~/redux/slices/userSlice';

import styles from './NewAddressCard.module.scss';

import Trans from '~/components/Trans';
import Button from '~/components/Button';
import Input from '~/components/Input';
import { Modal } from '~/components/ModalButton';
import {
  Phone as PhoneIcon,
  Location as LocationIcon,
  Plus as PlusIcon,
} from '~/assets/images/icons/SvgIcons';

import { useValidation } from '~/hooks';
import { userSampleRules } from '~/hooks/useValidation';

function NewAddressCard() {
  const [newAddress, setNewAddress] = useState({
    address: '',
    phoneNumber: '',
  });
  const { email } = useSelector((state) => state.user);
  const { errors, handleSubmit, handleFocus, handleBlur } = useValidation(
    newAddress,
    userSampleRules,
  );

  const modalRef = useRef(null);
  const dispatch = useDispatch();

  const handleAddNewAddress = () => {
    handleSubmit(() => {
      dispatch(
        addUserAddress({
          email,
          address: newAddress.address,
          phoneNumber: newAddress.phoneNumber,
        }),
      );
      modalRef.current.close();
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
    <div>
      <Button
        primary
        className={styles.button}
        onClick={() => modalRef.current.open()}
        whiteText
        leftIcon={<PlusIcon className={styles.plusIcon} />}
      >
        <Trans>Add new address</Trans>
      </Button>
      <Modal ref={modalRef} className={styles.innerModal}>
        <div className="grid">
          <div className={styles.header}>
            <h2>
              <Trans>Add new address</Trans>
            </h2>
          </div>
          <div className={clsx(['col l-12 m-12 c-12', styles.info])}>
            <Input
              labelIcon={<PhoneIcon color="var(--yellow-color)" />}
              className={styles.input}
              label={<Trans>Phone number</Trans>}
              required
              id="new-address-phoneNumber"
              type="text"
              name="phoneNumber"
              errorMessage={errors.phoneNumber}
              value={newAddress.phoneNumber}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <Input
              labelIcon={<LocationIcon color="var(--green-color)" />}
              className={styles.input}
              label={<Trans>Address</Trans>}
              id="new-address-address"
              type="text"
              name="address"
              value={newAddress.address}
              required
              errorMessage={errors.address}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <div className={styles.buttonWrapper}>
            <Button
              blackOutline
              className={styles.controlButton}
              onClick={() => modalRef.current.close()}
            >
              <Trans>Cancel</Trans>
            </Button>
            <Button
              primary
              className={styles.controlButton}
              onClick={handleAddNewAddress}
            >
              <Trans>Save</Trans>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default NewAddressCard;
