import { QueryKey, useQueryClient } from 'react-query';
import { Task } from 'types/task';
import { reorder } from './reorder';

export const useConfig = (queryKey: QueryKey, callback: (target: any, old?: any[]) => any[]) => {
  const queryClient = useQueryClient();

  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    // 以下onMutate、onError为实现乐观更新的代码
    async onMutate(target: any) {

      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old);
      });
      return { previousItems }
    },
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, context.previousItems)
    }
  }
}

export const useDeleteConfig = (querykey: QueryKey) => useConfig(querykey, (target, old) => old?.filter(item => item.id !== target.id) || []);
export const useAddConfig = (querykey: QueryKey) => useConfig(querykey, (target, old) => old ? [...old, target] : [target]);
export const useEditConfig = (querykey: QueryKey) => useConfig(querykey, (target, old) => old?.map(item => item.id === target.id ? { ...item, ...target } : item) || []);

export const useReorderKanbanConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => reorder({ list: old, ...target }));

export const useReorderTaskConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    const orderedList = reorder({ list: old, ...target }) as Task[];
    return orderedList.map((item) =>
      item.id === target.fromId
        ? { ...item, kanbanId: target.toKanbanId }
        : item
    );
  });