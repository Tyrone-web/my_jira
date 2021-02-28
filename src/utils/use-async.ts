import { useState } from 'react';

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

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  });

  const setData = (data: D) => setState({
    data,
    status: 'success',
    error: null
  });

  const setError = (error: Error) => setState({
    data: null,
    status: 'error',
    error
  })

  // 触发异步请求
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error('请传入Promise类型的函数')
    }
    setState({ ...state, status: 'loading' });
    return promise.then((data: D) => {
      setData(data);
      return data; // 是否可以不返回
    }).catch(error => {
      // catch会消化异常，如果不主动抛出异常，外面是接受不到异常信息的
      setError(error);
      if (config.throwOnError) return Promise.reject(error); // 主动抛出异常
      return error;
    });
  }

  return {
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
    run,
    setData,
    setError,
    ...state
  }
}