import styled from '@emotion/styled';
import { Button, Drawer, Spin, Form, Input } from 'antd';
import { ErrorBox } from 'components/lib';
import { UserSelect } from 'components/user-select';
import { useEffect } from 'react';
import { useAddProject, useEditProject } from 'utils/project';
import { useProjectModal, useProjectQueryKey } from '../utils';

export const ProjectModal = () => {
  const {
    projectModalOpen,
    close,
    editingProject,
    isLoading,
  } = useProjectModal();
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject(
    useProjectQueryKey()
  );
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  const onClose = () => {
    form.resetFields();
    close();
  };

  const title = editingProject ? '编辑项目' : '新建项目';

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  return (
    <Drawer
      forceRender={true}
      width="100%"
      visible={projectModalOpen}
      onClose={onClose}
    >
      <Container>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout="vertical"
              style={{ width: '40rem' }}
              onFinish={onFinish}
            >
              <Form.Item
                label="名称"
                name="name"
                rules={[{ required: true, message: '请输入项目名称' }]}
              >
                <Input placeholder="请输入项目名称" />
              </Form.Item>
              <Form.Item
                label="部门"
                name="organization"
                rules={[{ required: true, message: '请输入部门名' }]}
              >
                <Input placeholder="请输入部门名" />
              </Form.Item>
              <Form.Item label="负责人" name="personId">
                <UserSelect defaultOptionName="负责人" />
              </Form.Item>
              <Form.Item style={{ textAlign: 'right' }}>
                <Button
                  loading={mutateLoading}
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: 12 }}
                >
                  提交
                </Button>
                <Button onClick={onClose}>取消</Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  justify-content: center;
  align-items: center;
`;
