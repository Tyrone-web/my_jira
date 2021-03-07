import { ReactNode } from 'react';
import { AuthProvider } from 'context/auth-context';

// TODOLIST： 引入 react-query

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
