import { Kanban } from 'types/kanban';
import { useTasks } from 'utils/task';
import { Dropdown, Button, Menu, Modal } from 'antd';
import { useTaskTypes } from 'utils/task-type';
import { useKanbansQueryKey, useTaskSearchParams, useTasksModal } from './util';
import taskIcon from 'assets/task.svg';
import bugIcon from 'assets/bug.svg';
import styled from '@emotion/styled';
import { Card } from 'antd';
import { CreateTaskt } from './create-task';
import { Task } from 'types/task';
import { Mark } from 'components/mark';
import { useDeleteKanban } from 'utils/kanban';
import { Row } from 'components/lib';

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTaskSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

  return (
    <Container>
      <Row between>
        <h3>{kanban.name}</h3>
        <More kanban={kanban} />
      </Row>
      <TasksContainer>
        {tasks?.map((task) => (
          <TaskCard task={task} />
        ))}
        <CreateTaskt kanbanId={kanban.id} />
      </TasksContainer>
    </Container>
  );
};

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTasksModal();
  const { name: keyword } = useTaskSearchParams();

  const edit = (id: number) => () => startEdit(id); // 函数柯里化
  return (
    <Card
      onClick={edit(task.id)}
      style={{ marginBottom: '0.5rem', cursor: 'pointer' }}
      key={task.id}
    >
      <p>
        <Mark keyword={keyword} name={task.name} />
      </p>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync } = useDeleteKanban(useKanbansQueryKey());
  const startDelete = () => {
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定删除看板吗？',
      onOk() {
        mutateAsync({ id: kanban.id });
      },
    });
  };

  const overlay = (
    <Menu>
      <Menu.Item>
        <Button type="link" onClick={startDelete}>
          删除
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={overlay}>
      <Button type="link">...</Button>
    </Dropdown>
  );
};

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;

  if (!name) {
    return null;
  }

  return <img src={name === 'task' ? taskIcon : bugIcon} alt="taskOrBug" />;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 18rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
