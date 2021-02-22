/* @jsxImportSource @emotion/react */
import { Form, Input, Select } from 'antd';

export interface User {
  name: string;
  id: string;
  token: string;
}

interface SearchPanelProps {
  param: { name: string; personId: string };
  users: User[];
  setParam: (param: SearchPanelProps['param']) => void;
  setUsers: (user: User[]) => void;
}

export const SearchPanel = (props: SearchPanelProps) => {
  const { param, setParam, users } = props;
  return (
    <Form css={{ marginBottom: '2rem' }} layout="inline">
      <Form.Item>
        <Input
          type="text"
          placeholder="项目名"
          value={param.name}
          onChange={(e) =>
            setParam({
              ...param,
              name: e.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value="">负责人</Select.Option>
          {users?.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
