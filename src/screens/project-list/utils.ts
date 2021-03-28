import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useProject } from "utils/project";
import { useSetUrlSearchParm, useUrlQueryParam } from "utils/url";

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

export const useProjectQueryKey = () => {
  const [params] = useSearchParams();
  return ['projects', params];
}

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    'projectCreate'
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    'editingProjectId'
  ]);

  const setUrlParams = useSetUrlSearchParm();
  const { data: editingProject, isLoading } = useProject(Number(editingProjectId))

  const open = () => {
    setProjectCreate({ projectCreate: true })
  };
  const close = () => setUrlParams({ projectCreate: '', editingProjectId: '' })
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