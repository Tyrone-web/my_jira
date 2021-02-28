import { ReactNode } from 'react';
import { AuthProvider } from 'context/auth-context';
// import {} from 'react-query';

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
