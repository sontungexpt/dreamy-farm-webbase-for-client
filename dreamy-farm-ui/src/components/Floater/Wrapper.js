import styles from './Floater.module.scss';
import { clsx } from 'clsx';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
} from '@floating-ui/react';

function Wrapper({ anchor, className, children, floatingProps, ...props }) {
  const { refs, floatingStyles } = useFloating({
    elements: {
      reference: anchor,
    },
    whileElementsMounted: autoUpdate,
    placement: 'bottom-start',
    middleware: [offset(10), flip(), shift()],
    ...floatingProps,
  });

  return (
    <div
      className={clsx([
        styles.wrapper,
        {
          [className]: className,
        },
      ])}
      ref={refs.setFloating}
      style={floatingStyles}
      {...props}
    >
      {children}
    </div>
  );
}

export default Wrapper;
