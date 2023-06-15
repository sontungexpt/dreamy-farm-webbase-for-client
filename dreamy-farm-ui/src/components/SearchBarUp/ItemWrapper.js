import { forwardRef } from 'react';
import { useId } from '@floating-ui/react';
import clsx from 'clsx';

function ItemWrapper(
  { className, activeClassName, children, active, ...rest },
  ref,
) {
  const id = useId();
  return (
    <div
      ref={ref}
      role="option"
      id={id}
      aria-selected={active}
      {...rest}
      className={clsx([
        {
          [className]: className,
        },
        {
          [activeClassName]: active,
        },
      ])}
    >
      {children}
    </div>
  );
}

export default forwardRef(ItemWrapper);
