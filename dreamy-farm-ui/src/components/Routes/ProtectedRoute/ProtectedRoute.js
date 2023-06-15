import { Outlet, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { routes as routesConfig } from '~/configs';

const ProtectedRoute = ({ isAllowed, redirectPath, children }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath || routesConfig.login} replace />;
  }

  return children ? children : <Outlet />;
};

ProtectedRoute.propTypes = {
  isAllowed: PropTypes.bool,
  redirectPath: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
