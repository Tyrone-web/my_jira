import { useState } from 'react';
import styled from '@emotion/styled';
import { useDebounce, useDocumentTitle } from 'utils/index';
import { List } from './list';
import { SearchPanel } from './search-panel';
import { useUser } from 'utils/user';
import { useProject } from 'utils/project';
import { Typography } from 'antd';

export const ProjectList = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const debouncedValue = useDebounce(param, 1000);

  const { data: users } = useUser();
  const { isLoading, error, data: list } = useProject(debouncedValue);
  useDocumentTitle('项目列表', false);

  return (
    <Container>
      <h2>项目列表</h2>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 2.2rem;
`;
