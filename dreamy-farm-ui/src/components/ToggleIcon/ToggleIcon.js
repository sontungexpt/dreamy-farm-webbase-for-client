import { clsx } from 'clsx';
import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ToggleIcon.module.scss';

function ToggleIcon({
  className,
  disableToggle = false,
  activeIcon,
  unActiveIcon,

  initialActive = false,
  customEvent,

  onClick,
  onActive,
  onUnActive,
  type = 'button',
  ...props
}) {
  const [active, setActive] = useState(
    typeof initialActive === 'function' ? initialActive() : initialActive,
  );

  const handleClick = (event) => {
    if (typeof disableToggle === 'function') {
      disableToggle = disableToggle();
    }
    if (disableToggle) {
      onClick && onClick(event);
      return;
    }

    onClick && onClick(event, active);
    setActive(!active);
    if (active) {
      onUnActive && onUnActive(event);
    } else {
      onActive && onActive(event);
    }
  };

  return (
    <button
      {...props}
      type={type}
      className={clsx([styles.wrapper, { [className]: className }])}
      onClick={handleClick}
    >
      {(customEvent && customEvent()) || active ? activeIcon : unActiveIcon}
    </button>
  );
}

ToggleIcon.propTypes = {
  className: PropTypes.string,
  activeIcon: PropTypes.node.isRequired,
  unActiveIcon: PropTypes.node.isRequired,
  onActive: PropTypes.func,
  onUnActive: PropTypes.func,
  onClick: PropTypes.func,
  disableToggle: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  initialActive: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  type: PropTypes.string,
};

export default ToggleIcon;
