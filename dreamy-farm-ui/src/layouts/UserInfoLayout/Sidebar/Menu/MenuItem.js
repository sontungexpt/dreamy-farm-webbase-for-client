import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';

function MenuItem({
  className,
  activeClassName,
  pendingClassName,
  separatorClassName,
  to,
  icon,
  title,
  ...props
}) {
  return (
    <NavLink
      className={({ isActive, isPending }) =>
        clsx([
          {
            [className]: className,
          },
          {
            [activeClassName]: isActive,
          },
          {
            [pendingClassName]: isPending,
          },
          {
            [separatorClassName]: separatorClassName,
          },
        ])
      }
      to={to}
      {...props}
    >
      <span>{icon}</span>
      {title}
    </NavLink>
  );
}

MenuItem.propTypes = {
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  pendingClassName: PropTypes.string,
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default MenuItem;
