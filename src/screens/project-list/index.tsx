import styled from '@emotion/styled';
import { useDebounce, useDocumentTitle } from 'utils/index';
import { List } from './list';
import { SearchPanel } from './search-panel';
import { useUser } from 'utils/user';
import { useProject } from 'utils/project';
import { Typography } from 'antd';
import { useProjectModal, useProjectSearchParma } from './utils';
import { ButtonNoPadding, Row } from 'components/lib';

export const ProjectList = () => {
  const { open } = useProjectModal();
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
        <ButtonNoPadding type="link" onClick={open}>
          创建项目
        </ButtonNoPadding>
      </Row>

      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List
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
