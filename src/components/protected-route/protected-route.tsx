import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

import { selectIsAuthChecked, selectUser } from '../../services/selectors/authSelectors';
import { useSelector } from '../../services/store';

import type { ReactElement } from 'react';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children,
}: TProtectedRouteProps): ReactElement => {
  const user = useSelector(selectUser);
  const isAuthChecked = useSelector(selectIsAuthChecked);

  const location = useLocation();

  type TLocationState = {
    from?: ReturnType<typeof useLocation>;
  };

  const locationState = location.state as TLocationState | null;

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (onlyUnAuth && user) {
    const from = locationState?.from?.pathname ?? '/';

    return <Navigate to={from} replace />;
  }

  return children;
};
