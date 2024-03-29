import { useMemo } from 'react';
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from 'utils';

// 返回页面url中，指定键的参数值
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParm();
  return [
    useMemo(() => {
      return keys.reduce((prev, key: K) => {
        return { ...prev, [key]: searchParams.get(key) || '' }
      }, {} as { [key in K]: string })
    }, [searchParams, keys]),
    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(params)
    }
  ] as const;
};

export const useSetUrlSearchParm = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (params: { [k in string]: unknown }) => {
    const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit;
    return setSearchParams(o)
  }
}




