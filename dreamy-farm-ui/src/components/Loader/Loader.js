import { clsx } from 'clsx';
import PropTypes from 'prop-types';
import styles from './Loader.module.scss';

function Loader({ r = '100px', borderWidth = '5px', className, ...props }) {
  return (
    <div
      {...props}
      className={clsx([
        {
          [className]: className,
        },
      ])}
    >
      <div
        className={styles.loader}
        style={{
          width: r,
          height: r,
          borderWidth: borderWidth,
        }}
      ></div>
    </div>
  );
}

Loader.propTypes = {
  r: PropTypes.number,
  borderWidth: PropTypes.number,
  className: PropTypes.string,
};
export default Loader;
