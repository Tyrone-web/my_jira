import { Dropdown, Menu, Modal, Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Pin } from 'components/pin';
import { useDeleteProject, useEditProject } from 'utils/project';
import { ButtonNoPadding } from 'components/lib';
import { useProjectModal, useProjectQueryKey } from './utils';
import { Project } from 'types/Project';

interface User {
  name: string;
  id: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
  // retry: () => void;
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject(useProjectQueryKey());
  // const { open } = useProjectModal();
  // const pinPorject = (id: number) => (pin: boolean) =>
  //   mutate({ id, pin }).then(retry);
  const pinPorject = (id: number) => (pin: boolean) => mutate({ id, pin });

  return (
    <Table
      rowKey="id"
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinPorject(project.id)} // point free(函数颗粒化)
              />
            );
          },
        },
        {
          title: '名称',
          // dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: '部门',
          dataIndex: 'organization',
        },
        {
          title: '负责人',
          render(value, project) {
            return (
              <span>
                {users.find(
                  (user: { id: number }) => Number(user.id) === project.personId
                )?.name || '未知'}
              </span>
            );
          },
        },
        {
          title: '创建时间',
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format('YYYY-MM-DD')
                  : '无'}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return <More project={project} />;
          },
        },
      ]}
      {...props}
    />
  );
};

const More = ({ project }: { project: Project }): JSX.Element => {
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => {
    console.log(id, 'id');
    startEdit(id);
  };
  const { mutate: delteProject } = useDeleteProject(useProjectQueryKey());
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: '确认删除此项目吗？',
      content: '点击确定删除',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        delteProject({ id });
      },
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="edit">
            <ButtonNoPadding onClick={editProject(project.id)} type="link">
              编辑
            </ButtonNoPadding>
          </Menu.Item>
          <Menu.Item key="delete">
            {/* <ButtonNoPadding onClick={open} type="link">
          编辑
        </ButtonNoPadding> */}
            <ButtonNoPadding
              type="link"
              onClick={() => confirmDeleteProject(project.id)}
            >
              删除
            </ButtonNoPadding>
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type="link">...</ButtonNoPadding>
      {/* <Button type="link">...</Button> */}
    </Dropdown>
  );
};
