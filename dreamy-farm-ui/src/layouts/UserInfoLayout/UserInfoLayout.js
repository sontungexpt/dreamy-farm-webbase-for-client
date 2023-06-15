import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './UserInfoLayout.module.scss';

import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';
import Sidebar from './Sidebar';

function UserInfoLayout({ children }) {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.background}>
        <div className={clsx(['grid', 'wide', styles.content])}>
          <div className="row">
            <Sidebar className="col l-3 m-3 c-12" />
            <div className="col l-9 m-9 c-12">{children}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

UserInfoLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserInfoLayout;
