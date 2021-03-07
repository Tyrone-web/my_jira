import { Link } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router';
import { KanbanScreen } from '../KanbanScreen';
import { EpicScreen } from '../EpicScreen';

const Project = () => {
  return (
    <div>
      <h1>Project</h1>
      <Link to="kanban">看板</Link>
      <Link to="epic">任务组</Link>
      <Routes>
        <Route path="/kanban" element={<KanbanScreen />}></Route>
        <Route path="/epic" element={<EpicScreen />}></Route>
        <Navigate to={window.location.pathname + '/kanban'} />
      </Routes>
    </div>
  );
};

export default Project;
