/* @jsxImportSource @emotion/react */
import { Form, Input } from 'antd';
import { UserSelect } from 'components/user-select';
import { Project } from './list';

export interface User {
  name: string;
  id: number;
  token: string;
}

interface SearchPanelProps {
  param: Partial<Pick<Project, 'name' | 'personId'>>;
  users: User[];
  setParam: (param: SearchPanelProps['param']) => void;
}

export const SearchPanel = (props: SearchPanelProps) => {
  const { param, setParam } = props;
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
        <UserSelect
          defaultOptionName="负责人"
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        />
        {/* <Select
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
            <Select.Option key={user.id} value={String(user.id)}>
              {user.name}
            </Select.Option>
          ))}
        </Select> */}
      </Form.Item>
    </Form>
  );
};
