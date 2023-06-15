import { clsx } from 'clsx';
import PropTypes from 'prop-types';

import styles from './Input.module.scss';

function BoxInput({
  className, // optional className of the wrapper div
  labelClassName, //optional className for the label
  inputClassName, //optional className for the input
  errorClassName, //optional className for the errorMessage

  id, // required id for the input
  label, // required label for the input
  name, // optional name for the input

  type = 'text', // optional type for the input
  required, // optional boolean to show the error message
  placeHolder, // optional placeholder for the input
  errorMessage, // optional error message

  value, // optional value for the input
  onChange, // optional onChange function for the input
  ...props
}) {
  return (
    <div
      className={clsx([
        styles.wrapper,
        {
          [className]: className,
        },
      ])}
    >
      <label
        htmlFor={id}
        className={clsx([
          styles.label,
          {
            [labelClassName]: labelClassName,
          },
        ])}
      >
        {label}
      </label>
      <input
        placeholder={placeHolder}
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        {...props}
        className={clsx([
          styles.input,
          {
            [inputClassName]: inputClassName,
          },
        ])}
      />
      {required && (
        <span
          className={clsx([
            styles.error,
            {
              [styles.errorClassName]: errorClassName,
            },
          ])}
        >
          {errorMessage || 'This field is required'}
        </span>
      )}
    </div>
  );
}

BoxInput.propTypes = {
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  errorClassName: PropTypes.string,

  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,

  type: PropTypes.string,
  required: PropTypes.bool,
  placeHolder: PropTypes.string,
  errorMessage: PropTypes.string,

  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default BoxInput;
