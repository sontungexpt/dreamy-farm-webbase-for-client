import styles from './Card.module.scss';
import Trans from '~/components/Trans';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';

function Card({
  name,

  // title and icon prop will not work if titles is provided
  title = 'You are not providing title',
  icon,

  // titles is an array of objects with title and icon
  // title: string
  // icon: ReactNode
  // example: [{title: 'title', icon: <Icon />},{title: 'title', icon: <Icon />}]
  titles,

  className,
  value,
  checked,
  onChange,
  onClick,

  hoverEffect,
  ...props
}) {
  return (
    <div
      {...props}
      onClick={onClick}
      className={clsx([
        styles.wrapper,
        {
          [className]: className,
        },
        {
          [styles.click]: onClick,
        },
        {
          [styles.hoverEffect]: hoverEffect,
        },
      ])}
    >
      <input
        value={value}
        onChange={onChange}
        checked={checked}
        type="radio"
        name={name}
      />
      {titles ? (
        <div className={styles.titleList}>
          {titles.map((title, index) => (
            <div key={index} className={styles.titleItem}>
              {title.icon && <span className={styles.icon}>{title.icon}</span>}
              <Trans>{title.title}</Trans>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.title}>
          {icon && <span className={styles.icon}>{icon}</span>}
          <Trans>{title}</Trans>
        </div>
      )}
    </div>
  );
}

// <>
//   {icon && <span className={styles.icon}>{icon}</span>}
//   <Trans>{title}</Trans>
// </>
Card.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.node,
  titles: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

export default Card;
