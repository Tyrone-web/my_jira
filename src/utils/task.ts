import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "types/task";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAddConfig } from "./use-optimistic-options";

// 获取Task列表
export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  return useQuery<Task[]>(['tasks', param], () => client('tasks', { data: cleanObject(param || {}) }))
}

// 添加task
export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (param: Partial<Task>) => client(`tasks`, {
      data: param,
      method: 'POST'
    }),
    useAddConfig(queryKey)
  )
}