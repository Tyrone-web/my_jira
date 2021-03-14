import styled from '@emotion/styled';
import { useDebounce, useDocumentTitle } from 'utils/index';
import { List } from './list';
import { SearchPanel } from './search-panel';
import { useUser } from 'utils/user';
import { useProject } from 'utils/project';
import { Typography } from 'antd';
import { useProjectSearchParma } from './utils';
import { Row } from 'components/lib';

export const ProjectList = (props: {
  createProject: JSX.Element;
  listCreateProject: JSX.Element;
}) => {
  const { createProject, listCreateProject } = props;
  useDocumentTitle('项目列表', false);
  const [param, setParam] = useProjectSearchParma();
  const { data: users } = useUser();
  const { isLoading, error, data: list, retry } = useProject(
    useDebounce(param, 1000)
  );

  return (
    <Container>
      <Row between={true}>
        <h2>项目列表</h2>
        {createProject}
      </Row>

      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List
        listCreateProject={listCreateProject}
        retry={retry}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 2.2rem;
`;
