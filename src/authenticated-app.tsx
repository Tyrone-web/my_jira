import { Button } from 'antd';
import { useAuth } from 'context/auth-context';
import { ProjectList } from 'screens/project-list';

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <Button type="primary" onClick={logout}>
        登出
      </Button>
      <ProjectList />
    </div>
  );
};
