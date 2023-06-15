import styles from './Address.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { updateUserAddress, deleteUserAddress } from '~/redux/slices/userSlice';

import AddressCard from './AddressCard/AddressCard.js';
import Trans from '~/components/Trans';
import PaginatePage from '~/components/PaginatePage';
import NewAddressCard from './NewAddressCard';

function Address() {
  const { addreses, email } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleDeleteAddress = useCallback(
    (address, phoneNumber) => {
      dispatch(deleteUserAddress({ email, address, phoneNumber }));
    },
    [dispatch, email],
  );

  const handleUpdateAddress = useCallback(
    ({
      oldAddress,
      oldPhoneNumber,
      currentActive,
      newAddress,
      newPhoneNumber,
      newActive,
    }) => {
      if (currentActive && currentActive === false) return;

      dispatch(
        updateUserAddress({
          email,
          oldAddress,
          oldPhoneNumber,
          newActive,
          newAddress,
          newPhoneNumber,
        }),
      );
    },
    [dispatch, email],
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <Trans>Address</Trans>
        </h2>
        <NewAddressCard />
      </div>

      <PaginatePage
        className={styles.addresses}
        renderSpacingClassName={styles.renderSpacing}
        paginationClassName={styles.pagination}
        itemsPerPage={6}
        data={addreses}
        renderItem={(address, index) => (
          <div key={index} className="col l-6 m-12 c-12">
            <AddressCard
              className={styles.addressCard}
              phoneNumber={address.phoneNumber}
              address={address.address}
              actived={address.active}
              onSaveEdit={(newPhoneNumber, newAddress) =>
                handleUpdateAddress({
                  oldAddress: address.address,
                  oldPhoneNumber: address.phoneNumber,
                  newAddress: newAddress,
                  newPhoneNumber: newPhoneNumber,
                })
              }
              onDelete={() =>
                handleDeleteAddress(address.address, address.phoneNumber)
              }
              onSelectPrimary={() =>
                handleUpdateAddress({
                  oldAddress: address.address,
                  oldPhoneNumber: address.phoneNumber,
                  currentActive: address.active,
                  newActive: true,
                })
              }
            />
          </div>
        )}
      />
    </div>
  );
}

export default Address;
