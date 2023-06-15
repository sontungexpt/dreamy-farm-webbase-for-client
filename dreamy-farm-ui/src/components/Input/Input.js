import PropTypes from 'prop-types';
import styles from './Input.module.scss';
import { clsx } from 'clsx';

function Input({
  className,
  labelClassName, //optional className for the label
  inputClassName, //optional className for the input
  errorClassName, //optional className for the errorMessage
  inputWrapperClassName, // optional className for the input wrapper

  labelIcon, //optional label icon
  inputIcon, //optional input icon

  id, // required id for the input
  label, // required label for the input
  name, // optional name for the input

  type = 'text', // optional type for the input
  required, // optional boolean to show the error message
  placeHolder, // optional placeholder for the input
  errorMessage, // optional error message
  box, // optional boolean to show the box around the input

  value, // optional value for the input
  onChange, // optional onChange function for the input
  ...props
}) {
  return (
    <div
      className={clsx([
        styles.wrapper,
        {
          [styles.box]: box,
        },
        {
          [className]: className,
        },
      ])}
    >
      <label
        className={clsx([
          {
            [labelClassName]: labelClassName,
          },
        ])}
        htmlFor={id}
      >
        {labelIcon && <span>{labelIcon}</span>}
        {label}
      </label>

      <div
        className={clsx([
          styles.inputWrapper,
          {
            [inputWrapperClassName]: inputWrapperClassName,
          },
        ])}
      >
        {inputIcon && <span>{inputIcon}</span>}
        <input
          className={clsx([
            {
              [inputClassName]: inputClassName,
            },
          ])}
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>

      {required && errorMessage && (
        <span
          className={clsx([
            styles.error,
            {
              [styles.errorClassName]: errorClassName,
            },
          ])}
        >
          {errorMessage}
        </span>
      )}
    </div>
  );
}

Input.propTypes = {
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  inputWrapperClassName: PropTypes.string,

  labelIcon: PropTypes.node,
  inputIcon: PropTypes.node,

  id: PropTypes.string,
  label: PropTypes.node,
  type: PropTypes.string,
  name: PropTypes.string,
  placeHolder: PropTypes.string,
  errorMessage: PropTypes.string,
  box: PropTypes.bool,

  value: PropTypes.string,
  onChange: PropTypes.func,

  required: PropTypes.bool,
};

export default Input;
