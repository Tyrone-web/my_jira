import * as qs from 'qs';
import * as auth from 'auth-provider';
import { useAuth } from 'context/auth-context';
import { useCallback } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;
interface MyRequestInit extends RequestInit {
  data?: object;
  token?: string
}
// 封装fetch 当参数有默认值时该参数为可选参数
export const http = async (endPoint: string, { data, token, headers, ...customConfig }: MyRequestInit = {}) => {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': data ? 'application/json' : '',
      Authorization: token ? `Bearer ${token}` : '',
    },
    ...customConfig
  }

  if (config.method.toUpperCase() === 'GET') {
    endPoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }


  return fetch(`${apiUrl}/${endPoint}`, config).then(async response => {
    if (response.status === 401) {
      await auth.logout(); // 这里用useAuth中封装的logout有何不同
      window.location.reload();
      return Promise.reject({ message: '请重新登录' });
    }

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data); // 这里需要手动的抛出异常
    }
  })
}
// 在fetch请求参数中加入token
export const useHttp = () => {
  const { user } = useAuth();

  return useCallback((...[endPoint, customConfig]: Parameters<typeof http>) => http(endPoint, { ...customConfig, token: user?.token }), [user?.token]);
}


// utility type的使用
// interface Person {
//   name: string;
//   age: number;
// }

// const p1: Person = { name: 'zhang', age: 12 };
// const p2: Partial<Person> = { name: 'x' }; // ParTtial使得Person中的属性是可选的
// const p3: Omit<Person, 'name'> = { age: 12 }; // Omit去除Person中的name属性，只保留age属性