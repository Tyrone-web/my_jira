import { Dropdown, Menu, Button } from 'antd';
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
import { ProjectPopOver } from 'components/project-popOver';
import { useDispatch } from 'react-redux';
import { projectListActions } from 'screens/project-list/preject-list.slice';

export const AuthenticatedApp = () => {
  const dispatch = useDispatch();
  const handleCreateProject = () =>
    dispatch(projectListActions.openProjectModal());
  const createProject = (isPadding = false, isEdit = false) =>
    isPadding ? (
      <Button onClick={handleCreateProject}>创建项目</Button>
    ) : (
      <ButtonNoPadding onClick={handleCreateProject} type="link">
        {isEdit ? '编辑' : ' 创建项目'}
      </ButtonNoPadding>
    );

  return (
    <Container>
      <PageHeader createProject={createProject()} />
      <Main>
        <Router>
          <Routes>
            <Route
              path="/projects"
              element={
                <ProjectList
                  createProject={createProject()}
                  listCreateProject={createProject(false, true)}
                />
              }
            ></Route>
            <Route path="/projects/:projectId/*" element={<Project />}></Route>
            <Navigate to="/projects" />
          </Routes>
        </Router>
      </Main>
      <ProjectModal />
    </Container>
  );
};

const PageHeader = (props: { createProject: JSX.Element }) => {
  const { createProject } = props;
  const { logout, user } = useAuth();

  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type="link" onClick={resetRouter}>
          <Softwarelogo width="12rem" color="rgb(38, 132, 255)" />
        </ButtonNoPadding>
        <ProjectPopOver createProject={createProject} />
        <span>用户</span>
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
