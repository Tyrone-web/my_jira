import React, { ReactNode, useCallback } from 'react';
import * as auth from 'auth-provider';
import { User } from 'screens/project-list/search-panel';
import { http } from 'utils/http';
import { useMount } from 'utils';
import { useAsync } from 'utils/use-async';
import { FullPageFallBack, FullPageLoading } from 'components/lib';
import * as authStore from 'store/auth-slice';
import { useDispatch, useSelector } from 'react-redux';

export interface AuthForm {
  username: string;
  password: string;
}

export const bootStrapUser = async () => {
  let user = null;
  const token = auth.getToken();

  if (token) {
    const data = await http('me', { token });
    user = data.user;
  }

  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { run, isError, isLoading, error, isIdle } = useAsync<User | null>();

  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();

  useMount(() => {
    run(dispatch(authStore.bootstrap()));
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageFallBack error={error} />;
  }

  return <div>{children}</div>;
};

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const user = useSelector(authStore.selectUser);
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);

  // 自定义hook返回函数时需要把对应的函数用useCallback包装下
  return {
    user,
    login,
    register,
    logout,
  };
};
