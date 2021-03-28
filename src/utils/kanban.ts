import { useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { cleanObject } from "utils";
import { useHttp } from "./http";

// 获取kanban列表
export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>(['kanbans', param], () => client('kanbans', { data: cleanObject(param || {}) }))
}