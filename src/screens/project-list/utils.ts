import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";

export const useProjectSearchParma = () => {
  const [param, setParam] = useUrlQueryParam(useMemo(() => (['name', 'personId']), [])); // 使用useMomo。将对象僵化
  return [
    useMemo(() => {
      return {
        ...param,
        personId: Number(param.personId) || undefined,
      }
    }, [param]),
    setParam
  ] as const;
}