import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '~/redux/slices/userSlice';

import inputStyles from '~/pages/Accounts/styles/InputStyles.module.scss';
import styles from './Register.module.scss';
import { routes as routesConfig } from '~/configs';

import Button from '~/components/Button/Button';
import Input from '~/components/Input';
import { useValidation } from '~/hooks';
import { userSampleRules } from '~/hooks/useValidation';

function Register() {
  const [account, setAccount] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { errors, handleSubmit, handleFocus, handleBlur } = useValidation(
    account,
    userSampleRules,
  );

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleRegister = (e) => {
    e.preventDefault();
    handleSubmit(() => {
      dispatch(register(account));
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
    <form onSubmit={handleRegister} className={styles.wrapper}>
      <h1 className={styles.header}>{t('Create an account')}</h1>

      <Input
        required
        labelClassName={inputStyles.label}
        box
        label={t('Name')}
        id="name-register"
        type="text"
        name="name"
        value={account.name}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        errorMessage={errors.name}
      />
      <Input
        required
        labelClassName={inputStyles.label}
        box
        label={t('Email')}
        id="email-register"
        type="text"
        name="email"
        value={account.email}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        errorMessage={errors.email}
      />
      <Input
        required
        labelClassName={inputStyles.label}
        box
        label={t('Password')}
        id="password-register"
        type="password"
        name="password"
        value={account.password}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        errorMessage={errors.password}
      />
      <Input
        required
        labelClassName={inputStyles.label}
        box
        label={t('Confirm password')}
        id="confirm-password-register"
        type="password"
        name="confirmPassword"
        value={account.confirmPassword}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        errorMessage={errors.confirmPassword}
      />

      <Button primary hoverZoom className={styles.loginBtn} type="submit">
        {t('Create account')}
      </Button>
      <span className={styles.loginText}>
        {t('Already have an account?')}
        <Link to={routesConfig.login} className={styles.loginLink}>
          {t('Login')}
        </Link>
      </span>
    </form>
  );
}

export default Register;
