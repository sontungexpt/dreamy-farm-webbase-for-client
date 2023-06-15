import { useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import styles from './Modal.module.scss';
import { Close as CloseIcon } from '~/assets/images/icons/SvgIcons';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function Modal({
  className, // className for the body of the modal
  wrapperClassName, // className for the wrapper of the modal
  closeBtnClassName, // className for the close button
  closeIconClassName, // className for the close icon

  children,
  closeBtn, // closeBtn = {icon: <Icon />, className: 'className'} or true or false

  closeOnEsc = true,
  closeOnOverlayClick = true,

  isOpen, // isOpen is a isOpen state from useModal hook
  hide, // hide is a function to close the modal from useModal hook
}) {
  const overlay = useRef();

  useEffect(() => {
    if (!closeOnEsc) return;

    function handleEsc(event) {
      event.stopPropagation();
      if (event.keyCode === 27) {
        hide();
      }
    }

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, closeOnEsc, hide]);

  useEffect(() => {
    if (!closeOnOverlayClick) return;

    function handleClickOutside(event) {
      event.stopPropagation();
      if (overlay.current && overlay.current.contains(event.target)) {
        hide();
      }
    }

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, hide, closeOnOverlayClick]);

  return isOpen
    ? ReactDOM.createPortal(
        <div
          className={clsx([
            styles.modal,
            {
              [wrapperClassName]: wrapperClassName,
            },
          ])}
        >
          <div ref={overlay} className={styles.overlay}></div>
          <div
            className={clsx([
              styles.body,
              {
                [className]: className,
              },
            ])}
          >
            {closeBtn && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  hide();
                }}
                className={clsx([
                  styles.closeBtn,
                  {
                    [closeBtnClassName]: closeBtnClassName,
                  },
                ])}
              >
                {closeBtn.icon ? (
                  closeBtn.icon
                ) : (
                  <CloseIcon
                    className={clsx([
                      styles.closeIcon,
                      {
                        [closeIconClassName]: closeIconClassName,
                      },
                    ])}
                  />
                )}
              </button>
            )}
            {children}
          </div>
        </div>,
        document.body,
      )
    : null;
}

Modal.propTypes = {
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  closeBtnClassName: PropTypes.string,
  closeIconClassName: PropTypes.string,

  children: PropTypes.node,
  closeBtn: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      icon: PropTypes.node,
      className: PropTypes.string,
    }),
  ]),
  closeOnEsc: PropTypes.bool,
  closeOnOverlayClick: PropTypes.bool,

  isOpen: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
};

export default Modal;
