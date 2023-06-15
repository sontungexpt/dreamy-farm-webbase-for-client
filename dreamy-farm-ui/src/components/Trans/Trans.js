import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

function Trans({ children, set = 'translations' }) {
  const { t } = useTranslation(set);
  return t(children);
}

PropTypes.Trans = {
  children: PropTypes.string.isRequired,
  set: PropTypes.string,
};

export default Trans;
