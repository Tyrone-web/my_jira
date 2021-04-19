import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { Task } from "types/task";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig, useEditConfig, useReorderKanbanConfig } from "./use-optimistic-options";

// 获取kanban列表
export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>(['kanbans', param], () => client('kanbans', { data: cleanObject(param || {}) }))
}

// 添加看板
export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (param: Partial<Kanban>) => client(`kanbans`, {
      data: param,
      method: 'POST'
    }),
    useAddConfig(queryKey)
  )
}

// 编辑Task
export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (param: Partial<Task>) => client(`tasks/${param.id}`, {
      method: 'PATCH',
      data: param,
    }),
    useEditConfig(queryKey)
  )
}

// 获取task详情
export const useTask = (id?: number) => {
  const client = useHttp();

  return useQuery<Task>(
    ['task', { id }],
    () => client(`tasks/${id}`),
    {
      enabled: !!id // id有值时才执行useQuery
    }
  );
}

// 删除Kanban
export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) => client(`kanbans/${id}`, {
      method: 'DELETE'
    }),
    useDeleteConfig(queryKey)
  )
}

export interface SortProps {
  // 要重新排序的item
  fromId: number;
  // 目标item
  referenceId: number;
  // 放在目标item的前还是后
  type: 'before' | 'after';
  fromKanbanId?: number;
  toKanbanId?: number;
}

export const useReorderKanban = (querykey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (param: SortProps) => client('kanbans/reorder', {
      data: param,
      method: 'POST'
    }),
    useReorderKanbanConfig(querykey)
  )
}
