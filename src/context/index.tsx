import { ReactNode } from 'react';
import { AuthProvider } from 'context/auth-context';
import { QueryClient, QueryClientProvider } from 'react-query';

// TODOLIST： 引入 react-query

export const AppProviders = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};
