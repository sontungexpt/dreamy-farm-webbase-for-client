import styles from './ForgotPassword.module.scss';
import inputStyles from '~/pages/Accounts/styles/InputStyles.module.scss';
import { Link } from 'react-router-dom';
import { routes as routesConfig } from '~/configs';
import Button from '~/components/Button/Button';
import Input from '~/components/Input';

function ForgotPassword() {
  return (
    <form className={styles.wrapper}>
      <h1 className={styles.header}>Create new password</h1>

      <Input
        box
        label="Email"
        id="email-forgot"
        type="text"
        labelClassName={inputStyles.label}
      />

      <Input
        box
        label="New Password"
        id="new-password-forgot"
        type="password"
        labelClassName={inputStyles.label}
      />

      <Button hoverZoom primary className={styles.btn}>
        Create new password
      </Button>

      <div className={styles.suggestCreateAccount}>
        <p>New to Dreamy Farm?</p>
        <Link to={routesConfig.register} className={styles.navigateToSignUp}>
          Sign up
        </Link>
      </div>
    </form>
  );
}
export default ForgotPassword;
