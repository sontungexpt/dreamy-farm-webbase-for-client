import PropTypes from 'prop-types';
import Header from '~/layouts/components/Header';
import styles from './CenterContentLayout.module.scss';
import { useRef, useEffect } from 'react';

function CenterContentLayout({ children }) {
  const mainRef = useRef(null);

  useEffect(() => {
    const windowHeight = window.innerHeight;
    const mainRefOffsetTop = mainRef.current.offsetTop;

    mainRef.current.style.height = windowHeight - mainRefOffsetTop + 'px';
  }, []);
  return (
    <div className="layoutWrapper">
      <Header />
      <div ref={mainRef} className={styles.main}>
        {children}
      </div>
    </div>
  );
}

CenterContentLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CenterContentLayout;
