import { Button, Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  projectListActions,
  selectProjectModalOpen,
} from '../preject-list.slice';

export const ProjectModal = () => {
  const dispatch = useDispatch();
  const isShowModal = useSelector(selectProjectModalOpen);
  const onClose = () => dispatch(projectListActions.closeProjectModal());
  return (
    <Drawer width="100%" visible={isShowModal} onClose={onClose}>
      <h1>ProjectModal</h1>
      <Button onClick={onClose}>关闭</Button>
    </Drawer>
  );
};
