import PropTypes from 'prop-types';
import Header from '~/layouts/components/Header';

function HeaderOnly({ children }) {
  return (
    <div className="layout">
      <Header />
      <div className="main">{children}</div>
    </div>
  );
}

HeaderOnly.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderOnly;
