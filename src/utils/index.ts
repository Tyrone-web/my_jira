import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => value === 0 ? false : !value

export const isVoid = (value: unknown) => value === undefined || value === null || value === '';


// 清楚对象中属性值为空的属性
export const cleanObject = (object: { [property: string]: unknown }) => {
  const result = { ...object }; // 重新生成一个对象，不直接改变传入的对象
  Object.keys(result).forEach((item: string) => {
    const value = result[item];
    if (isVoid(value)) {
      delete result[item]
    }
  })
  return result
}

// custom Hook 
export const useDebounce = <T>(value: T, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export const useArray = <T>(param: T[]) => {
  const [result, setResult] = useState(param);
  const add = (item: T) => setResult([...result, item]);
  const clear = () => setResult([]);
  const removeIndex = (index: number) => {
    const res = [...result];
    res.splice(index, 1);
    setResult(res);
  }

  return {
    value: result,
    clear,
    removeIndex,
    add
  }
}