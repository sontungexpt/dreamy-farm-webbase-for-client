//librabry
import { lazy, Fragment, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// routes
import { publicRoutes, privateRoutes } from '~/routes';

//components
import Loader from '~/components/Loader';
import ProtectedRoute from '~/components/Routes/ProtectedRoute';
import ErroredRoute from '~/components/Routes/ErroredRoute';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import GlobalNavigate from './components/GlobalNavigate';

//layouts
const DefaultLayout = lazy(() =>
  import('~/layouts').then((module) => ({
    default: module.DefaultLayout,
  })),
);

function App() {
  // enable navigate outside of react components

  // logic for routes
  const { loggedIn } = useSelector((state) => state.user);

  function handleRoutes(routes, isBlocked = false) {
    return routes.map((route, index) => {
      let Layout = DefaultLayout;
      if (route.layout) {
        Layout = route.layout;
      } else if (route.layout === null) {
        Layout = Fragment;
      }

      const Page = route.element;

      return (
        <Route
          key={index}
          path={route.path}
          element={
            <ErroredRoute>
              <ProtectedRoute
                isAllowed={!isBlocked}
                redirectPath={route.redirectPath}
              >
                <GlobalNavigate>
                  <Layout>
                    <Page />
                  </Layout>
                </GlobalNavigate>
              </ProtectedRoute>
            </ErroredRoute>
          }
        />
      );
    });
  }

  return (
    <Router>
      <div className="App">
        <Suspense
          fallback={
            <Loader
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          }
        >
          <Routes>
            {handleRoutes(publicRoutes)}
            {handleRoutes(privateRoutes, !loggedIn)}
          </Routes>
        </Suspense>
        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </Router>
  );
}

export default App;
