import type { RootState } from '../store';
import type { TUser } from '@utils-types';

export const selectUser = (state: RootState): TUser | null => state.auth.user;

export const selectIsAuthenticated = (state: RootState): boolean =>
  state.auth.user !== null;

export const selectIsAuthChecked = (state: RootState): boolean =>
  state.auth.isAuthChecked;

export const selectAuthLoading = (state: RootState): boolean => state.auth.isLoading;

export const selectAuthError = (state: RootState): string | null => state.auth.error;
