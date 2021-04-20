import { Dropdown, Menu } from 'antd';
import styled from '@emotion/styled';
import { Route, Routes, Navigate } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from 'context/auth-context';
import { ProjectList } from 'screens/project-list';
import { ButtonNoPadding, Row } from 'components/lib';
import { ReactComponent as Softwarelogo } from 'assets/software-logo.svg';
import Project from 'screens/Project';
import { resetRouter } from 'utils';
import { ProjectModal } from 'screens/project-list/ProjectModal';
import { ProjectPopOver } from 'components/project-pop-over';
import { UserPopOver } from 'components/user-pop-over';

export const AuthenticatedApp = () => {
  return (
    <Container>
      <Router>
        <PageHeader />
        <Main>
          <Routes>
            <Route path="/projects" element={<ProjectList />}></Route>
            <Route path="/projects/:projectId/*" element={<Project />}></Route>
            <Navigate to="/projects" />
          </Routes>
        </Main>
        <ProjectModal />
      </Router>
    </Container>
  );
};

const PageHeader = () => {
  const { logout, user } = useAuth();

  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type="link" onClick={resetRouter}>
          <Softwarelogo width="12rem" color="rgb(38, 132, 255)" />
        </ButtonNoPadding>
        <ProjectPopOver />
        <UserPopOver />
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
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 5rem 1fr;
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

const Main = styled.main`
  display: flex;
  overflow: hidden;
`;
