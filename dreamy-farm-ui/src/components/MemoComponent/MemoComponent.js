import { memo } from 'react';
import PropTypes from 'prop-types';

function MemoComponent({ children }) {
  return <>{children}</>;
}

MemoComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(MemoComponent);
