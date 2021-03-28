import { useMemo } from "react";
import { useLocation } from "react-router"
import { useProject } from "utils/project";
import { useUrlQueryParam } from "utils/url";

// 从url中获取project对应的id
export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1]

  return Number(id);
}

// 根据id获取对应的project
export const useProjectInUrl = () => useProject(useProjectIdInUrl())

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()];

export const useTaskSearchParams = () => {
  const [param, setParam] = useUrlQueryParam([
    'name',
    'typeId',
    'proccessorId',
    'tagId'
  ]);
  const projectId = useProjectIdInUrl();

  return useMemo(() => ({
    projectId,
    typeId: Number(param.typeId) || undefined,
    proccessorId: Number(param.proccessorId) || undefined,
    tagId: Number(param.tagId) || undefined,
    name: param.name
  }), [projectId, param])
};

export const useTasksQueryKey = () => ['tasks', useTaskSearchParams()];
