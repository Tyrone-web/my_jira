import { QueryKey, useMutation, useQuery } from "react-query";
import { Epic } from "types/epic";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";

// 获取epic列表
export const useEpics = (param?: Partial<Epic>) => {
  const client = useHttp();

  return useQuery<Epic[]>(['epics', param], () => client('epics', { data: cleanObject(param || {}) }))
}

// 添加epic
export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (param: Partial<Epic>) => client(`epics`, {
      data: param,
      method: 'POST'
    }),
    useAddConfig(queryKey)
  )
}

// 删除epic
export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) => client(`epics/${id}`, {
      method: 'DELETE'
    }),
    useDeleteConfig(queryKey)
  )
}
