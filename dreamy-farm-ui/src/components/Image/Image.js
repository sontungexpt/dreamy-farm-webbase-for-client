import PropTypes from 'prop-types';
import { useState } from 'react';
import { clsx } from 'clsx';

import styles from './Image.module.scss';
import jpgImages from '~/assets/images/jpgs';

function Image({
  src,
  altSrc = jpgImages.noImage, // the image to display if the src is not passed
  alt,
  className,
  fallback: customFallback = jpgImages.noImage, // the image to display if the src is not found
  ...props
}) {
  const [fallback, setFallback] = useState('');

  const handleError = () => {
    setFallback(customFallback);
  };

  return (
    <img
      className={clsx([
        styles.wrapper,
        {
          [className]: className,
        },
      ])}
      src={fallback || src || altSrc}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
}

Image.propTypes = {
  src: PropTypes.string,
  altSrc: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  fallback: PropTypes.string,
};

export default Image;
