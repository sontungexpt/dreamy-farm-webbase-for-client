import { clsx } from 'clsx';
import { useState, useImperativeHandle, forwardRef } from 'react';

import styles from './Counter.module.scss';

import {
  Adding as AddingIcon,
  Union as UnionIcon,
} from '~/assets/images/icons/SvgIcons';

function Counter(
  {
    onIncrease, //onIncrease(current, next)
    onDecrease, //onDecrease(current, idealNextValue)
    onCountChange, //onChange(value) - when value change by input - not work if disabledChange = true
    disabledInputChange = false, //disable change value by input
    //idealNextValue is the value after decrease
    //the ui may not update if the next value is less than min value

    initialCount,
    className,
    inputClassName,
    iconClassName,
    iconWrapperClassName,
    minValue = 1,
    ...props
  },
  ref,
) {
  const [value, setValue] = useState(initialCount || minValue);

  useImperativeHandle(ref, () => ({
    value,
  }));

  function handleIncrease() {
    onIncrease && onIncrease(value /*current*/, value + 1 /*next*/);
    setValue(Number.parseInt(value) + 1);
  }

  function handleDecrease() {
    const intValue = Number.parseInt(value);
    if (intValue > minValue) {
      onDecrease && onDecrease(intValue, intValue - 1);
      setValue(intValue - 1);
    }
  }

  function handleChangeInput(e) {
    if (disabledInputChange) return;
    const re = /^[0-9\b]+$/; //rules
    if (e.target.value === '') {
      setValue(minValue);
      onCountChange && onCountChange(minValue);
    } else if (re.test(e.target.value)) {
      setValue(Number.parseInt(e.target.value));
      onCountChange && onCountChange(Number.parseInt(e.target.value));
    }
  }

  return (
    <div
      className={clsx([
        styles.wrapper,
        {
          [className]: className,
        },
      ])}
      {...props}
    >
      <span
        className={clsx([
          styles.iconWrapper,
          {
            [iconWrapperClassName]: iconWrapperClassName,
          },
        ])}
        onClick={handleDecrease}
      >
        <UnionIcon
          className={clsx([
            {
              [iconClassName]: iconClassName,
            },
          ])}
        />
      </span>
      {disabledInputChange ? (
        <span
          className={clsx([
            styles.inputSpan,
            {
              [inputClassName]: inputClassName,
            },
          ])}
        >
          {value}
        </span>
      ) : (
        <input
          className={clsx([
            styles.input,
            {
              [inputClassName]: inputClassName,
            },
          ])}
          type="text"
          value={value}
          onChange={handleChangeInput}
        />
      )}
      <span
        className={clsx([
          styles.iconWrapper,
          {
            [iconWrapperClassName]: iconWrapperClassName,
          },
        ])}
        onClick={handleIncrease}
      >
        <AddingIcon
          className={clsx([
            {
              [iconClassName]: iconClassName,
            },
          ])}
        />
      </span>
    </div>
  );
}

export default forwardRef(Counter);
