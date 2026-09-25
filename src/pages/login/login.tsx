import { LoginUI } from '@ui-pages';
import { type SyntheticEvent, useState } from 'react';

import {
  selectAuthError,
  selectAuthLoading,
} from '../../services/selectors/authSelectors';
import { login } from '../../services/slices/authSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Login = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const error = useSelector(selectAuthError);
  const isLoading = useSelector(selectAuthLoading);

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();

    if (isLoading) {
      return;
    }

    void dispatch(
      login({
        email,
        password,
      })
    );
  };

  return (
    <LoginUI
      errorText={error ?? ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
