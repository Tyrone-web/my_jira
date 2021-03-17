import { useCallback, useReducer, useState } from 'react';
import { useMountedRef } from 'utils';

interface State<D> {
  error: Error | null;
  data: D | null;
  status: 'idle' | 'loading' | 'error' | 'success';
}

const defaultInitialState: State<null> = {
  error: null,
  data: null,
  status: 'idle' // 初始状态
}

const defaultConfig = {
  throwOnError: false
}

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();

  return useCallback((...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0), [dispatch, mountedRef])
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }), {
    ...defaultInitialState,
    ...initialState
  });
  const safeDispatch = useSafeDispatch(dispatch);

  const [retry, setRetry] = useState(() => () => { }) //使用useState保存函数
  const setData = useCallback(
    (data: D) => safeDispatch({
      data,
      status: 'success',
      error: null
    }), [safeDispatch]
  );
  const setError = useCallback(
    (error: Error) => safeDispatch({
      data: null,
      status: 'error',
      error
    }), [safeDispatch]
  )

  // 触发异步请求
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error('请传入Promise类型的函数')
      }
      safeDispatch({ status: 'loading' });
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig.retry(), runConfig)
        }
      });
      return promise.then((data: D) => {
        setData(data);
        return data; // 是否可以不返回
      }).catch(error => {
        // catch会消化异常，如果不主动抛出异常，外面是接受不到异常信息的
        setError(error);
        if (config.throwOnError) return Promise.reject(error); // 主动抛出异常
        return error;
      });
    }, [config.throwOnError, safeDispatch, setData, setError]
  )

  return {
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
    run,
    setData,
    setError,
    retry,
    ...state
  }
}