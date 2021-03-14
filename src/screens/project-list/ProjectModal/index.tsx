import { Button, Drawer } from 'antd';

interface ProjectModalProps {
  isShowModal: boolean;
  onClose: () => void;
}

export const ProjectModal = (props: ProjectModalProps) => {
  const { isShowModal, onClose } = props;

  return (
    <Drawer width="100%" visible={isShowModal} onClose={onClose}>
      <h1>ProjectModal</h1>
      <Button onClick={onClose}>关闭</Button>
    </Drawer>
  );
};
