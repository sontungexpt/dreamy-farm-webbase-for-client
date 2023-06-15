import LinkCondition from '~/components/LinkCondition';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import styles from './Button.module.scss';

function Button({
  className, //optional
  children, //optional
  childrenClassName, //optional
  iconClassName, //optional

  alignLeft, //optional
  alignRight, //optional
  leftIcon, //optional
  rightIcon, //optional
  small, //optional
  primary, //optional
  to, //optional
  isAllowed = true, //optional // boolean or callback
  errorMessage, //optional
  href, //optional
  onClick, //optional
  hoverZoom, //optional
  whiteOutline, //optional
  blackOutline, //optional
  primaryOutline, //optional
  whiteText, //optional
  disabled, //optional
  disabledText, //optional
  primaryText, //optional
  ...rest
}) {
  let Component = 'button';
  let props = {
    onClick,
  };

  if (to) {
    props.isAllowed = isAllowed;
    props.errorMessage = errorMessage;
    props.to = to;
    Component = LinkCondition;
  } else if (href) {
    props.href = href;
    Component = 'a';
  }

  return (
    <Component
      className={clsx([
        styles.button,
        {
          [className]: className,
        },
        {
          [styles.primary]: primary,
        },
        {
          [styles.small]: small,
        },
        {
          [styles.alignLeft]: alignLeft,
        },
        {
          [styles.alignRight]: alignRight,
        },
        {
          [styles.whiteOutline]: whiteOutline,
        },
        {
          [styles.blackOutline]: blackOutline,
        },
        {
          [styles.primaryOutline]: primaryOutline,
        },
        {
          [styles.whiteText]: whiteText,
        },
        {
          [styles.disabled]: disabled,
        },
        {
          [styles.disabledText]: disabledText,
        },
        {
          [styles.primaryText]: primaryText,
        },
        {
          [styles.hoverZoom]: hoverZoom,
        },
      ])}
      {...props}
      {...rest}
    >
      {leftIcon && (
        <span
          className={clsx([
            styles.icon,
            {
              [iconClassName]: iconClassName,
            },
          ])}
        >
          {leftIcon}
        </span>
      )}
      <span
        className={clsx([
          styles.title,
          {
            [childrenClassName]: childrenClassName,
          },
        ])}
      >
        {children}
      </span>
      {rightIcon && (
        <span
          className={clsx([
            styles.icon,
            {
              [iconClassName]: iconClassName,
            },
          ])}
        >
          {rightIcon}
        </span>
      )}
    </Component>
  );
}

Button.propTypes = {
  alignLeft: PropTypes.bool, //optional
  alignRight: PropTypes.bool, //optional
  leftIcon: PropTypes.node, //optional
  rightIcon: PropTypes.node, //optional
  small: PropTypes.bool, //optional
  primary: PropTypes.bool, //optional
  to: PropTypes.string, //optional
  isAllowed: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]), //optional
  errorMessage: PropTypes.string, //optional
  href: PropTypes.string, //optional
  onClick: PropTypes.func, //optional
  children: PropTypes.node.isRequired, //optional
  className: PropTypes.string, //optional
  whiteOutline: PropTypes.bool, //optional
  blackOutline: PropTypes.bool, //optional
  primaryOutline: PropTypes.bool, //optional
  hoverZoom: PropTypes.bool, //optional
  whiteText: PropTypes.bool, //optional
  disabled: PropTypes.bool, //optional
  disabledText: PropTypes.bool, //optional
  primaryText: PropTypes.bool, //optional
};

export default Button;
