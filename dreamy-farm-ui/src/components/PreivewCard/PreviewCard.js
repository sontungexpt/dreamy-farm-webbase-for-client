import styles from './PreviewCard.module.scss';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

function Preview({
  enableClickAny = false,
  title,
  image,
  subTitle,
  className,
  to,
  state,
  ...rest
}) {
  const { t } = useTranslation();
  const Wrapper = enableClickAny ? Link : 'div';
  const LinkInner = enableClickAny ? 'span' : Link;
  const wrapperProps = enableClickAny
    ? {
        to,
        state,
      }
    : {};
  const innerProps = enableClickAny ? {} : { to, state };
  return (
    <Wrapper
      {...rest}
      {...wrapperProps}
      className={clsx([
        styles.wrapper,
        {
          [className]: className,
        },
      ])}
    >
      <div className={styles.imageWrapper}>
        <Image src={image} className={styles.img} />
      </div>
      <div className={styles.footer}>
        <h3 className={styles.title}>{t(title)}</h3>
        <LinkInner {...innerProps} className={styles.subTitle}>
          {t(subTitle)}
        </LinkInner>
      </div>
    </Wrapper>
  );
}

export default Preview;
