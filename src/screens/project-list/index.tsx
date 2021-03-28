import styled from '@emotion/styled';
import { useDebounce, useDocumentTitle } from 'utils/index';
import { List } from './list';
import { SearchPanel } from './search-panel';
import { useUser } from 'utils/user';
import { useProjects } from 'utils/project';
import { useProjectModal, useProjectSearchParma } from './utils';
import {
  ButtonNoPadding,
  ErrorBox,
  Row,
  ScreenContainer,
} from 'components/lib';

export const ProjectList = () => {
  const { open } = useProjectModal();
  useDocumentTitle('项目列表', false);
  const [param, setParam] = useProjectSearchParma();
  const { data: users } = useUser();
  const { isLoading, error, data: list } = useProjects(
    useDebounce(param, 1000)
  );

  return (
    <ScreenContainer>
      <Row between={true}>
        <h2>项目列表</h2>
        <ButtonNoPadding type="link" onClick={open}>
          创建项目
        </ButtonNoPadding>
      </Row>

      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <ErrorBox error={error} />
      <List
        // retry={retry}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      />
    </ScreenContainer>
  );
};
