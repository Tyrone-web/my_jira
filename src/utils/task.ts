import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "types/task";
import { cleanObject, useDebounce } from "utils";
import { useHttp } from "./http";
import { SortProps } from "./kanban";
import { useAddConfig, useDeleteConfig, useReorderTaskConfig } from "./use-optimistic-options";

// 获取Task列表
export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  const debouncedParam = { ...param, name: useDebounce(param?.name, 400) };

  return useQuery<Task[]>(['tasks', debouncedParam], () => client('tasks', { data: cleanObject(debouncedParam || {}) }))
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

// 删除Task
export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) => client(`tasks/${id}`, {
      method: 'DELETE'
    }),
    useDeleteConfig(queryKey)
  )
}

export const useReorderTask = (querykey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (param: SortProps) => client('tasks/reorder', {
      data: param,
      method: 'POST'
    }),
    useReorderTaskConfig(querykey)
  )
}