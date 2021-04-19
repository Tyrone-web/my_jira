import { Row, ScreenContainer } from 'components/lib';
import { List, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { useProjectInUrl } from 'screens/Kanban/util';
import { useDeleteEpic, useEpics } from 'utils/epic';
import { useEpicSearchParams, useEpicsQueryKey } from './util';
import dayjs from 'dayjs';
import { useTasks } from 'utils/task';
import { Epic } from 'types/epic';
import { CreateEpic } from './create-epic';
import { useState } from 'react';

export const EpicScreen = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey());
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);

  const confirmDeleteEpic = (epic: Epic) => {
    Modal.confirm({
      title: `确定删除项目组： ${epic.name}`,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        deleteEpic({ id: epic.id });
      },
    });
  };

  return (
    <ScreenContainer>
      <Row between>
        <h1>{currentProject?.name}</h1>
        <Button onClick={() => setEpicCreateOpen(true)} type="link">
          创建任务组
        </Button>
      </Row>

      <List
        dataSource={epics}
        itemLayout="vertical"
        style={{ overflowY: 'scroll' }}
        renderItem={(epic) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row between>
                  <span>{epic.name}</span>
                  <Button onClick={() => confirmDeleteEpic(epic)} type="link">
                    删除
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>开始时间： {dayjs(epic.start).format('YYYY-MM-DD')}</div>
                  <div>结束时间： {dayjs(epic.end).format('YYYY-MM-DD')}</div>
                </div>
              }
            />
            <div>
              {tasks
                ?.filter((task) => task.epicId === epic.id)
                .map((task) => (
                  <Link
                    to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                    key={task.id}
                  >
                    {task.name}
                  </Link>
                ))}
            </div>
          </List.Item>
        )}
      />
      <CreateEpic
        onClose={() => setEpicCreateOpen(false)}
        visible={epicCreateOpen}
      />
    </ScreenContainer>
  );
};
