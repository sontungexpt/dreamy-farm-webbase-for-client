import { forwardRef } from 'react';
import { useId } from '@floating-ui/react';
import clsx from 'clsx';

function ItemWrapper({ className, children, active, ...props }, ref) {
  const id = useId();
  return (
    <li
      className={clsx([
        {
          [className]: className,
        },
      ])}
      ref={ref}
      role="option"
      id={id}
      aria-selected={active}
      {...props}
    >
      {children}
    </li>
  );
}

export default forwardRef(ItemWrapper);
