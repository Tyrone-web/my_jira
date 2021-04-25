import React from 'react';
import { useAuth } from 'context/auth-context';
import { FullPageLoading } from 'components/lib';

const AuthenticatedApp = React.lazy(() => import('authenticated-app'));
const UnauthenticatedApp = React.lazy(() => import('unauthenticated-app'));

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {/* React.suspence还在实验阶段 */}
      <React.Suspense fallback={<FullPageLoading />}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </React.Suspense>
    </div>
  );
}

export default App;
