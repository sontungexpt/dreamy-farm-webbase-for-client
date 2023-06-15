import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { routes as routesConfig } from '~/configs';

const ErroredRoute = ({ isErrored, redirectPath, children }) => {
  if (isErrored) {
    return <Navigate to={redirectPath || routesConfig.e404} replace />;
  }

  return children;
};

ErroredRoute.propTypes = {
  isAllowed: PropTypes.bool,
  redirectPath: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default ErroredRoute;
