import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated, Role } from 'util/auth';

type Props = {
  children: React.ReactNode;
  path: string;
  roles?: Role[];
};

const PrivateRoute = ({ children, path, roles = [] }: Props) => {
  return (
    <Route
      path={path}
      render={({location}) =>
        isAuthenticated() ? children : 
          <Redirect
            to={{
              pathname: '/admin/auth/login',
              state: { from: location },
            }}
          />
        }
    />
  );
};

export default PrivateRoute;
