import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { useEffect } from 'react';

import {
  selectFeedError,
  selectFeedLoading,
  selectFeedOrders,
} from '../../services/selectors/feedSelectors';
import { getFeed } from '../../services/slices/feedSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const orders = useSelector(selectFeedOrders);
  const isLoading = useSelector(selectFeedLoading);
  const error = useSelector(selectFeedError);

  useEffect(() => {
    void dispatch(getFeed());
  }, [dispatch]);

  const handleGetFeeds = (): void => {
    void dispatch(getFeed());
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <p className="text text_type_main-medium">Ошибка загрузки ленты: {error}</p>;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
