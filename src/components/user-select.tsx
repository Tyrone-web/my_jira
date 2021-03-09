import React from 'react';
import { useUser } from 'utils/user';
import { IdSelect } from './id-select';

// 项目列表搜索的参数
export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUser();
  return <IdSelect {...props} options={users || []}></IdSelect>;
};
