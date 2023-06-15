import { useRef } from 'react';
import { clsx } from 'clsx';
import PropTypes from 'prop-types';

import Modal from './Modal';

function ModalButton({
  className,
  modalClassName,
  button,
  innerModal,
  onOpen,
  onClose,
  closeBtn,
}) {
  const modalRef = useRef();

  return (
    <>
      <div
        className={clsx([
          {
            [className]: className,
          },
        ])}
        onClick={() => modalRef.current.open()}
      >
        {button}
      </div>
      <Modal
        ref={modalRef}
        className={clsx([{ [modalClassName]: modalClassName }])}
        closeBtn={closeBtn}
        onClose={onClose}
        onOpen={onOpen}
      >
        {innerModal}
      </Modal>
    </>
  );
}

ModalButton.propTypes = {
  className: PropTypes.string,
  modalClassName: PropTypes.string,
  button: PropTypes.node.isRequired,
  innerModal: PropTypes.node.isRequired,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  closeBtn: PropTypes.bool,
};

export default ModalButton;
