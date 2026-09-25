import { AppHeaderUI } from '@ui';

import { selectUser } from '../../services/selectors/authSelectors';
import { useSelector } from '../../services/store';

export const AppHeader = (): React.JSX.Element => {
  const user = useSelector(selectUser);

  return <AppHeaderUI userName={user?.name} />;
};
