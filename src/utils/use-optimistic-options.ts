import { QueryKey, useQueryClient } from 'react-query';

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