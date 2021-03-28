import { useTaskTypes } from 'utils/task-type';
import { IdSelect } from './id-select';

// taskType
export const TaskTypeSelect = (
  props: React.ComponentProps<typeof IdSelect>
) => {
  const { data: taskType } = useTaskTypes();
  return <IdSelect {...props} options={taskType || []}></IdSelect>;
};
