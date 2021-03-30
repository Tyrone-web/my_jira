import { QueryKey, useMutation, useQuery } from 'react-query';
import { Project } from "types/project";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAddConfig, useEditConfig, useDeleteConfig } from './use-optimistic-options';

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[]>(['projects', param], () => client('projects', { data: cleanObject(param || {}) }))
}

// 编辑Project
export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (param: Partial<Project>) => client(`projects/${param.id}`, {
      method: 'PATCH',
      data: param,
    }),
    useEditConfig(queryKey)
  )
}

// 添加Project
export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (param: Partial<Project>) => client(`projects`, {
      data: param,
      method: 'POST'
    }),
    useAddConfig(queryKey)
  )
}

// 删除Project
export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) => client(`projects/${id}`, {
      method: 'DELETE'
    }),
    useDeleteConfig(queryKey)
  )
}

// 获取project详情
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

