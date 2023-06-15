import PropTypes from 'prop-types';
import { clsx } from 'clsx';

function Menu({ className, children, ...props }) {
  return (
    <nav
      className={clsx([
        {
          [className]: className,
        },
      ])}
      {...props}
    >
      {children}
    </nav>
  );
}

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Menu;
