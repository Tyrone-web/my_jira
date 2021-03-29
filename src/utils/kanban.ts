import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAddConfig } from "./use-optimistic-options";

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
