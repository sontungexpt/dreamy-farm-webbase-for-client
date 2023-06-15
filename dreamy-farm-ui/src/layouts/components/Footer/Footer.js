// libabry
import { clsx } from 'clsx';

// configs
import styles from './Footer.module.scss';

//components
import Logo from '~/assets/images/icons/Logo';
import LanguageButton from './LanguageButton';
import Feedback from './Feedback';
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
} from '~/assets/images/icons/SvgIcons';

function Footer() {
  return (
    <footer className={clsx([styles.wrapper])}>
      <div className={clsx(['grid', 'wide', styles.inner])}>
        <div className={styles.companyInfo}>
          <ul className={styles.socialList}>
            <li>
              <div className={clsx([styles.logo])}>
                <Logo color="var(--white-color)" transform={'scale(2.1)'} />
              </div>
              <a
                href="https://www.facebook.com/DreamyFarm/"
                className={clsx([styles.socialLink])}
                target="_blank"
                rel="noreferrer"
              >
                <span className={clsx([styles.socialIcons])}>
                  <FacebookIcon />
                </span>
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/dreamyfarmvn/"
                target="_blank"
                rel="noreferrer"
                className={clsx([styles.socialLink])}
              >
                <span className={clsx([styles.socialIcons])}>
                  <InstagramIcon />
                </span>
                Instagram
              </a>
            </li>
            <li>
              <a href="/" className={clsx([styles.socialLink])}>
                <span className={clsx([styles.socialIcons])}>
                  <PhoneIcon />
                </span>
                0392211343
              </a>
            </li>
            <li>
              <a
                href="mailto:dreamyfarmcustomerservice@gmail.com"
                className={clsx([styles.socialLink])}
                target="_blank"
                rel="noreferrer"
              >
                <span className={clsx([styles.socialIcons])}>
                  <MailIcon />
                </span>
                dreamyfarmcustomerservice@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <Feedback
          className={styles.feedback}
          title="Feedback"
          placeholder="Enter your feedback"
          sendTitle="Submit"
          titleClassName={styles.feedbackTitle}
          textareaClassName={styles.feedbackInput}
          sendButtonClassName={styles.submitBtn}
        />

        <LanguageButton />
      </div>
      <p className={styles.copyRight}>Dreamy Farm © 2023. All Right Served.</p>
    </footer>
  );
}

export default Footer;
