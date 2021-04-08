import { useForm } from 'antd/es/form/Form';
import { Button, Form, Input, Modal } from 'antd';
import { useEditTask } from 'utils/kanban';
import { useTasksModal, useTasksQueryKey } from './util';
import { useEffect } from 'react';
import { UserSelect } from 'components/user-select';
import { TaskTypeSelect } from 'components/task-type-select';
import { useDeleteTask } from 'utils/task';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const TaskModal = () => {
  const [form] = useForm();
  const { editingTaskId, editingTask, close } = useTasksModal();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );

  const { mutate: deletTask } = useDeleteTask(useTasksQueryKey());

  const startDelte = () => {
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定此任务吗？',
      onOk() {
        deletTask({ id: Number(editingTaskId) });
        close();
      },
    });
  };

  const onCancel = () => {
    close();
    form.resetFields();
  };

  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  return (
    <Modal
      forceRender={true}
      okText="确认"
      cancelText="取消"
      confirmLoading={editLoading}
      title="编辑任务"
      visible={!!editingTaskId}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form {...layout} form={form} initialValues={editingTask}>
        <Form.Item
          label="任务名"
          name="name"
          rules={[{ required: true, message: '请输入任务名' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="经办人" name="proccessorId">
          <UserSelect defaultOptionName="经办人" />
        </Form.Item>

        <Form.Item label="类型" name="typeId">
          <TaskTypeSelect />
        </Form.Item>
      </Form>
      <div style={{ textAlign: 'right' }}>
        <Button onClick={startDelte} style={{ fontSize: 14 }} size="small">
          删除
        </Button>
      </div>
    </Modal>
  );
};
