import { Input, Button } from 'antd';
import { TaskTypeSelect } from 'components/task-type-select';
import { UserSelect } from 'components/user-select';
import { useSetUrlSearchParm } from 'utils/url';
import { useTaskSearchParams } from './util';
import { Row } from 'components/lib';

export const SearchPanel = () => {
  const searchParams = useTaskSearchParams();
  const setSearchParams = useSetUrlSearchParm();

  const reset = () => {
    setSearchParams({
      typeId: undefined,
      proccessorId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };

  return (
    <Row gap={true} marginBottom={1}>
      <Input
        style={{ width: '20rem' }}
        placeholder="任务名"
        value={searchParams.name}
        onChange={(evt) => setSearchParams({ name: evt.target.value })}
      />
      <UserSelect
        defaultOptionName="经办人"
        value={searchParams.proccessorId}
        onChange={(value) => setSearchParams({ proccessorId: value })}
      />
      <TaskTypeSelect
        defaultOptionName="类型"
        value={searchParams.typeId}
        onChange={(value) => setSearchParams({ typeId: value })}
      />
      <Button onClick={reset}>清楚筛选器</Button>
    </Row>
  );
};
