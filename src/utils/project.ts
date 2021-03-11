import { useCallback, useEffect } from 'react';
import { Project } from 'screens/project-list/list';
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProject = (param?: Partial<Project>) => {

  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  const fetchProjects = useCallback(
    () => client('projects', { data: cleanObject(param || {}) }), [client, param]
  )

  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects
    });
  }, [param, fetchProjects, run]);

  return result;
}

// 编辑Project
export const useEditProject = () => {
  const { run, ...resultAsync } = useAsync();
  const client = useHttp();
  const mutate = (param: Partial<Project>) => {
    return run(client(`projects/${param.id}`, {
      data: param,
      method: 'PATCH'
    }))
  }

  return {
    mutate,
    ...resultAsync
  }
}

// 添加Project
export const useAddProject = () => {
  const { run, ...resultAsync } = useAsync();
  const client = useHttp();
  const mutate = (param: Partial<Project>) => {
    return run(client(`projects/${param.id}`, {
      data: param,
      method: 'POST'
    }))
  }

  return {
    mutate,
    ...resultAsync
  }
}

