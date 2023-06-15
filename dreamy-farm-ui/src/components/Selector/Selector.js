import { clsx } from 'clsx';
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import styles from './Selector.module.scss';

function Selector(
  {
    data, //array or object
    renderItem, //function
    className, //string
    itemClassName, //string
    itemActiveClassName, //string
    itemInactiveClassName, //string

    // just use one of these initialActiveIndex or initialActiveItem
    // number or string or
    // function like initialActiveItem(data, arrayData)
    // data is object or array that you provided
    // arrayData is array convert from your object that you provided
    // arrayData convert by return array of values from your object that you provided like this
    // {
    //  key1: value1,
    //  key2: value2,
    //  key3: value3,
    //  ...
    // }
    // to
    // [value1, value2, value3, ...]
    // if you provide array, arrayData is not work you just use your array
    initialActiveIndex,

    //initialActiveItem(item)
    //item is the value of your object or array that you provided like this
    // {
    // key1: value1,
    // key2: value2,
    // key3: value3,
    // ...
    // }
    // or
    // [value1, value2, value3, ...]
    // initialActiveItem is function return boolean
    // if return true, item is active
    // if return false, item is inactive
    // this function will loop through your object or array that you provided to find active item
    // by use array.findIndex(item) function
    // the item in initialActiveItem(item) is same as item in array.findIndex(item)
    // you can use the item to check if it is active or not by your condition
    // like when you use with array.findIndex(item)
    // like this
    // initialActiveItem(item) {
    //    return item === 'value1';
    // }
    initialActiveItem,

    onActiveItemClick, //function
    onInactiveItemClick, //function
    onItemClick, //function
    onActiveChange, //function
    ...props
  },
  ref,
) {
  const arrayData = (object) => {
    const array = [];
    for (const key in object) {
      array.push(object[key]);
    }
    return array;
  };
  const [activeIndex, setActiveIndex] = useState(() => {
    if (initialActiveItem) {
      let index;
      if (Array.isArray(data)) {
        index = data.findIndex((item) => initialActiveItem(item));
      } else {
        index = arrayData(data).findIndex((item) => initialActiveItem(item));
      }
      return Object.keys(data)[index];
    }

    if (initialActiveIndex) {
      if (
        typeof initialActiveIndex === 'number' ||
        typeof initialActiveIndex === 'string'
      ) {
        return initialActiveIndex;
      }
      // is function
      if (Array.isArray(data)) {
        return initialActiveIndex(data);
      } else {
        return initialActiveIndex(data, arrayData(data));
      }
    }
    return Object.keys(data)[0];
  });

  useImperativeHandle(
    ref,
    () => ({
      activeIndex: activeIndex,
      activeItem: data[activeIndex],
    }),
    [activeIndex, data],
  );

  useEffect(() => {
    if (Array.isArray(data)) {
      onActiveChange && onActiveChange(data[activeIndex], activeIndex);
    } else {
      onActiveChange &&
        onActiveChange(data[activeIndex], activeIndex, arrayData(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, data]);

  const handleClick = (item, index, event) => {
    if (activeIndex !== index) {
      setActiveIndex(index);
      onInactiveItemClick && onInactiveItemClick(item, index, event);
    } else {
      onActiveItemClick && onActiveItemClick(item, index, event);
    }
    onItemClick && onItemClick(item, index, event);
  };

  return (
    <ul
      {...props}
      className={clsx([
        styles.wrapper,
        {
          [className]: className,
        },
      ])}
    >
      {(() => {
        const array = [];
        for (const key in data) {
          array.push(
            <li
              key={key}
              onClick={(event) =>
                handleClick(data[key] /*currentItem*/, key, event)
              }
              className={clsx([
                styles.item,
                {
                  [itemClassName]: itemClassName,
                },
                {
                  [itemActiveClassName]: activeIndex === key,
                },
                {
                  [itemInactiveClassName]: activeIndex !== key,
                },
              ])}
            >
              {renderItem(
                data[key] /*currentItem*/,
                key,
                activeIndex === key,
                activeIndex,
              )}
            </li>,
          );
        }
        return array;
      })()}
    </ul>
  );
}

export default forwardRef(Selector);
