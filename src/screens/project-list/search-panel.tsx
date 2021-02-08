
interface User {
  name: string;
  id: string;
}

interface SearchPanelProps {
  param: {name: string, id: string};
  users: User[];
  setParam: (param: SearchPanelProps["param"]) => void;
  setUsers: (user: User[]) => void;
}

export const SearchPanel = (props: SearchPanelProps) => {
  const { param, setParam, users } = props;
  return (
    <form>
      <input
        type="text"
        value={param.name}
        onChange={(e) =>
          setParam({
            ...param,
            name: e.target.value,
          })
        }
      />
      <select
        value={param.id}
        onChange={(e) =>
          setParam({
            ...param,
            id: e.target.value,
          })
        }
      >
        <option value="">负责人</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </form>
  );
};
