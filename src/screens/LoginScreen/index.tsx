import { FormEvent } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
  const login = (param: { userName: string; password: string }) => {
    fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param),
    }).then(async (responce) => {
      if (responce.ok) {
        // console.log(data)
      }
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 阻止表单默认提交
    const userName = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    login({ userName, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="userName">用户名：</label>
      <input type="text" />
      <label htmlFor="password"></label>
      <input type="password" />
      <button type={'submit'}>登录</button>
    </form>
  );
};
