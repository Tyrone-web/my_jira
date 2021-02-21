import { Button } from 'antd';
import styled from '@emotion/styled';
import { useAuth } from 'context/auth-context';
import { ProjectList } from 'screens/project-list';

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <h3>Logo</h3>
          <h3>用户</h3>
          <h3>项目列表</h3>
        </HeaderLeft>
        <HeaderRigth>
          <Button type="primary" onClick={logout}>
            登出
          </Button>
        </HeaderRigth>
      </Header>
      <Main>
        <ProjectList />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 5rem 1fr 5rem;
  grid-template-columns: 0rem 1fr 0rem;
  grid-template-areas:
    'header header header'
    'nav main aside'
    'footer footer footer';
  height: 100vh;
`;

// grid-area: 给grid子元素起名字
const Header = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderRigth = styled.div``;

const Main = styled.main`
  grid-area: main;
`;
