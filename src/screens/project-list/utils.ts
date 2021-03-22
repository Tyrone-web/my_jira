import { useMemo } from "react";
import { useProject } from "utils/project";
import { useUrlQueryParam } from "utils/url";

export const useProjectSearchParma = () => {
  const [param, setParam] = useUrlQueryParam(useMemo(() => (['name', 'personId']), [])); // 使用useMomo。将对象僵化
  return [
    useMemo(() => {
      return {
        ...param,
        personId: Number(param.personId) || undefined,
      }
    }, [param]),
    setParam
  ] as const;
}

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    'projectCreate'
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    'editingProjectId'
  ]);

  console.log(editingProjectId, 'editingProjectId');
  const { data: editingProject, isLoading } = useProject(Number(editingProjectId))

  const open = () => {
    console.log('open');
    setProjectCreate({ projectCreate: true })
  };
  const close = () => {
    console.log('test');
    setProjectCreate({ projectCreate: undefined });
    setEditingProjectId({ editingProjectId: undefined });
  };
  // const close = () => setProjectCreate({ projectCreate: undefined });
  const startEdit = (id: number) => setEditingProjectId({ editingProjectId: id });

  return {
    projectModalOpen: projectCreate === 'true' || !!editingProjectId, // 视屏里这是editingProject？？
    open,
    close,
    startEdit,
    editingProject,
    isLoading
  }
}