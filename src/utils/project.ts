import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Project } from 'screens/project-list/list';
import { cleanObject } from "utils";
import { useHttp } from "./http";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[]>(['projects', param], () => client('projects', { data: cleanObject(param || {}) }))
}

// 编辑Project
export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (param: Partial<Project>) => client(`projects/${param.id}`, {
      method: 'PATCH',
      data: param,
    }), {
    onSuccess: () => queryClient.invalidateQueries('projects')
  });
}

// 添加Project
export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (param: Partial<Project>) => client(`projects`, {
      data: param,
      method: 'POST'
    }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects')
    }
  )
}

export const useProject = (id?: number) => {
  const client = useHttp();

  return useQuery<Project>(
    ['project', { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id // id有值时才执行useQuery
    }
  );
}

