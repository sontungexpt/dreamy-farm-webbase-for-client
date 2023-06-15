import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '~/redux/slices/userSlice';

import { routes as routesConfig } from '~/configs';
import inputStyles from '~/pages/Accounts/styles/InputStyles.module.scss';
import styles from './Login.module.scss';

import Button from '~/components/Button/Button';
import Input from '~/components/Input';

import { useValidation } from '~/hooks';
import { userSampleRules } from '~/hooks/useValidation';

function Login() {
  const [account, setAccount] = useState({
    email: '',
    password: '',
  });
  const { errors, handleSubmit, handleFocus, handleBlur } = useValidation(
    account,
    userSampleRules,
  );
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    handleSubmit(() => {
      dispatch(login(account));
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setAccount((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleLogin} className={styles.wrapper}>
      <h1 className={styles.header}>{t('Login to your account')}</h1>

      <Input
        labelClassName={inputStyles.label}
        box
        required
        label={t('Email')}
        id="email-login"
        type="text"
        name="email"
        value={account.email}
        errorMessage={errors.email}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleInputChange}
      />
      <Input
        labelClassName={inputStyles.label}
        required
        box
        label={t('Password')}
        id="password-login"
        type="password"
        name="password"
        value={account.password}
        errorMessage={errors.password}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleInputChange}
      />

      <Button type="submit" primary hoverZoom className={styles.loginBtn}>
        {t('Login now')}
      </Button>

      <p>
        {t("Don't have an account?")}
        <Link to={routesConfig.register} className={styles.navigateToSignUp}>
          {t('Sign up')}
        </Link>
      </p>
    </form>
  );
}

// <Link
//   to={routesConfig.forgotPassword}
//   className={styles.navigateToForgot}
// >
//   {t('Forgot password?')}
// </Link>
export default Login;
