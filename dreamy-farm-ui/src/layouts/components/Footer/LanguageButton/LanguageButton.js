import styles from './LanguageButton.module.scss';
import Button from '~/components/Button';
import { Language as LanguageIcon } from '~/assets/images/icons/SvgIcons';
import { languagesConfigs as configs } from '~/configs';
import Selector from '~/components/Selector';
import { Modal } from '~/components/ModalButton';
import { useTranslation } from 'react-i18next';
import { useCallback, useState, useRef } from 'react';

function LanguageButton() {
  const [langCode, setLangCode] = useState(() => {
    const currentLangCode = localStorage.getItem('DreamyFarmLanguage');
    if (currentLangCode) {
      return currentLangCode;
    }
    return configs.en.i18nType;
  }); // ['en', 'vn']

  const { t, i18n } = useTranslation('translations');
  const modalRef = useRef(null);

  const handleActiveChange = useCallback(
    (item) => {
      localStorage.setItem('DreamyFarmLanguage', item.i18nType);
      i18n.changeLanguage(item.i18nType);
      setLangCode(item.i18nType);
    },
    [i18n],
  );

  const handleModalClose = useCallback(() => {
    modalRef.current.close();
  }, []);

  return (
    <div className={styles.button}>
      <Button
        onClick={() => modalRef.current.open()}
        className={styles.language}
        childrenClassName={styles.languageTitle}
        alignLeft
        whiteOutline
        whiteText
        leftIcon={<LanguageIcon className={styles.languageIcon} />}
      >
        {t(configs[langCode].title)}
      </Button>
      <Modal ref={modalRef} className={styles.innerModal}>
        <h3 className={styles.modalTitle}>{t('Choose a language')}</h3>
        <Selector
          className={styles.languageList}
          data={configs}
          itemClassName={styles.languageElement}
          itemActiveClassName={styles.active}
          itemInactiveClassName={styles.inactive}
          initialActiveIndex={langCode}
          onInactiveItemClick={handleActiveChange}
          onItemClick={handleModalClose}
          renderItem={(item) => t(item.title)}
        />
      </Modal>
    </div>
  );
}

export default LanguageButton;
