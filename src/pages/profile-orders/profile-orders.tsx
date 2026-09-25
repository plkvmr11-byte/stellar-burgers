import { ProfileOrdersUI } from '@ui-pages';
import { useEffect } from 'react';

import { selectProfileOrders } from '../../services/selectors/feedSelectors';
import { getProfileOrders } from '../../services/slices/feedSlice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const orders = useSelector(selectProfileOrders);

  useEffect(() => {
    void dispatch(getProfileOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
