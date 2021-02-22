import { Dropdown, Menu } from 'antd';
import styled from '@emotion/styled';
import { useAuth } from 'context/auth-context';
import { ProjectList } from 'screens/project-list';
import { Row } from 'components/lib';
import { ReactComponent as Softwarelogo } from 'assets/software-logo.svg';

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <Softwarelogo width="12rem" color="rgb(38, 132, 255)" />
          <h2>用户</h2>
          <h2>项目列表</h2>
        </HeaderLeft>
        <HeaderRigth>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="logout">
                  <a href="/#" onClick={logout}>
                    登出
                  </a>
                </Menu.Item>
              </Menu>
            }
          >
            <a href="/#" onClick={(e) => e.preventDefault()}>
              Hi,{user?.name}
            </a>
          </Dropdown>
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
  height: 100vh;
`;

// grid-area: 给grid子元素起名字
const Header = styled(Row)`
  padding: 2.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRigth = styled.div``;

const Main = styled.main``;
