interface User {
  name: string;
  id: string;
}

interface Project {
  id: number, name: string;
  personId: number
}

interface ListProps {
  list: Project[];
  users: User[];
}

export const List = (props: ListProps) => {
  const {list, users} = props;
  return (
    <table>
      <thead>
        <tr>
          <td>名称</td>
          <td>负责人</td>
        </tr>
      </thead>
      <tbody>
        {list.map((item: Project) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>
              {users.find((user: {id: string}) => Number(user.id) === item.personId)?.name || '未知'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
