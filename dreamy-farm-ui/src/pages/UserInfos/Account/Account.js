import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '~/redux/slices/userSlice';

import styles from './Account.module.scss';

import Input from '~/components/Input';
import Avatar from './Avatar';
import Button from '~/components/Button/Button';
import {
  Pencil as PencilIcon,
  NoFilledUser as NoFilledUserIcon,
  Gender as GenderIcon,
} from '~/assets/images/icons/SvgIcons';

function Account() {
  const { t } = useTranslation('translations');
  const {
    email,
    name: nameUser,
    sex,
    avatar,
  } = useSelector((state) => state.user);
  const [nameUpdate, setNameUpdate] = useState(nameUser || '');
  const [genderUpdate, setGenderUpdate] = useState(sex || '');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProfile({
        email,
        name: nameUpdate,
        sex: genderUpdate,
      }),
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={clsx(['grid', styles.wrapper])}>
        <div className={styles.header}>
          <h2>{t('Account Informations')}</h2>
          <Button
            type="submit"
            leftIcon={<PencilIcon className={styles.pencilIcon} />}
            className={styles.updateBtn}
            primaryText
          >
            {t('Update')}
          </Button>
        </div>
        <div className={clsx([styles.content])}>
          <div className={clsx(['row', styles.row])}>
            <div className={clsx(['col', 'l-4', 'm-4', 'c-12', styles.avatar])}>
              <Avatar src={avatar} />
            </div>
            <div className={clsx(['col l-8 m-8 c-12', styles.info])}>
              <Input
                labelIcon={<NoFilledUserIcon color="var(--blue-color)" />}
                className={styles.input}
                label={t('Name')}
                id="name"
                type="text"
                name="name"
                value={nameUpdate}
                onChange={(e) => setNameUpdate(e.target.value)}
              />
              <Input
                labelIcon={<GenderIcon color="var(--green-color)" />}
                className={styles.input}
                label={t('Gender')}
                type="text"
                id="gender"
                name="gender"
                value={genderUpdate}
                onChange={(e) => setGenderUpdate(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Account;
