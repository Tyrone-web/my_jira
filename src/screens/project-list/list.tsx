import { Table } from 'antd';
import dayjs from 'dayjs';

interface User {
  name: string;
  id: string;
}

interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps {
  list: Project[];
  users: User[];
}

export const List = (props: ListProps) => {
  const { list, users } = props;
  return (
    <Table
      rowKey="id"
      pagination={false}
      dataSource={list}
      columns={[
        {
          title: '名称',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
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
                  (user: { id: string }) => Number(user.id) === project.personId
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
      ]}
    />
  );
};
