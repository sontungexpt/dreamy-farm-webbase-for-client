import PropTypes from 'prop-types';

import styles from './OptionCard.module.scss';
import { useMultiModal } from '~/hooks';

import Button from '~/components/Button';
import EditAddressCard from '../EditAddressCard';
import Trans from '~/components/Trans';
import { ThreeDots as ThreeDotsIcon } from '~/assets/images/icons/SvgIcons';

function OptionCard({
  address,
  phoneNumber,

  onDelete,
  onSelectPrimary,
  onSaveEdit,
}) {
  const { createModal, getLatestModal, removeAllModals } = useMultiModal();

  const handleDelete = (event) => {
    onDelete && onDelete(event);
    removeAllModals();
  };

  const handleSelectPrimary = (event) => {
    onSelectPrimary && onSelectPrimary(event);
    removeAllModals();
  };

  return (
    <div>
      <span
        className={styles.option}
        onClick={() =>
          createModal({
            innerModal: (
              <ol className={styles.optionList}>
                <li>
                  <Button
                    className={styles.button}
                    onClick={() =>
                      createModal({
                        innerModal: (
                          <EditAddressCard
                            initialAddress={address}
                            initialPhoneNumber={phoneNumber}
                            close={removeAllModals}
                            onSave={onSaveEdit}
                          />
                        ),
                      })
                    }
                  >
                    <Trans>Edit</Trans>
                  </Button>
                </li>
                <li>
                  <Button onClick={handleDelete} className={styles.button}>
                    <Trans>Delete</Trans>
                  </Button>
                </li>
                <li>
                  <Button
                    onClick={handleSelectPrimary}
                    className={styles.button}
                  >
                    <Trans>Select as primary address</Trans>
                  </Button>
                </li>
              </ol>
            ),
          })
        }
      >
        <ThreeDotsIcon className={styles.threedots} />
      </span>
      {getLatestModal()}
    </div>
  );
}

OptionCard.propTypes = {
  address: PropTypes.string,
  phoneNumber: PropTypes.string,
  onDelete: PropTypes.func,
  onSelectPrimary: PropTypes.func,
  onSaveEdit: PropTypes.func,
};

export default OptionCard;
