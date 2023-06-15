import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import i18next from 'i18next';

function LinkCondition({
  errorMessage,
  isAllowed,
  className,
  to,
  children,
  onClick,
  ...props
}) {
  const handleClick = (e) => {
    if (typeof isAllowed === 'function') {
      const result = isAllowed(e);
      isAllowed = result;
    }
    if (!isAllowed) {
      e.preventDefault();
      errorMessage && toast.error(i18next.t(errorMessage));
    }
    onClick && onClick(e);
  };

  return (
    <Link onClick={handleClick} className={className} to={to} {...props}>
      {children}
    </Link>
  );
}

LinkCondition.propTypes = {
  to: PropTypes.string,
  isAllowed: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  children: PropTypes.node.isRequired,
  errorMessage: PropTypes.string,
  className: PropTypes.string,
};

export default LinkCondition;
