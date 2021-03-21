import { ReactNode } from 'react';
import { AuthProvider } from 'context/auth-context';
import { Provider } from 'react-redux';
import { store } from 'store';

// TODOLIST： 引入 react-query

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
};
