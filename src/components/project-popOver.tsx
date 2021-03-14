import styled from '@emotion/styled';
import { Popover, Typography, List, Divider } from 'antd';
import { useProject } from 'utils/project';

export const ProjectPopOver = (props: { createProject: JSX.Element }) => {
  const { createProject } = props;
  const { data: project } = useProject();
  //收藏项目
  const pinProjects = project?.filter((project) => project.pin);
  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinProjects?.map((project) => (
          <List.Item>
            <List.Item.Meta title={project.name}></List.Item.Meta>
          </List.Item>
        ))}
      </List>
      <Divider />
      {createProject}
    </ContentContainer>
  );

  return (
    <Popover placement="bottom" content={content}>
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 20rem;
`;
