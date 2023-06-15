import { useState, useCallback } from 'react';
import { Modal } from '~/components/ModalWithHook';

function useMultiModal() {
  const [modals, setModals] = useState([]);

  const removeLastModal = useCallback(() => {
    setModals((prev) => prev.slice(0, prev.length - 1));
  }, []);

  const getLatestModal = useCallback(() => {
    return modals[modals.length - 1] || null;
  }, [modals]);

  const removeAllModals = useCallback(() => {
    setModals([]);
  }, []);

  const createModal = useCallback(
    ({
      innerModal,
      className, // className for the body of the modal
      wrapperClassName, // className for the wrapper of the modal
      closeBtnClassName, // className for the close button
      closeIconClassName, // className for the close icon
      closeBtn, // closeBtn = {icon: <Icon />, className: 'className'} or true or false
      closeOnEsc = true,
      closeOnOverlayClick = true,
    }) => {
      setModals((prev) => [
        ...prev,
        <Modal
          className={className}
          wrapperClassName={wrapperClassName}
          closeBtnClassName={closeBtnClassName}
          closeIconClassName={closeIconClassName}
          closeBtn={closeBtn}
          closeOnEsc={closeOnEsc}
          closeOnOverlayClick={closeOnOverlayClick}
          hide={removeAllModals}
          isOpen={true}
        >
          {innerModal}
        </Modal>,
      ]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {
    modals,
    removeLastModal,
    removeAllModals,
    createModal,
    getLatestModal,
  };
}

export default useMultiModal;
