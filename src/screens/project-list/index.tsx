import { useState, useEffect } from 'react';
import * as qs from 'qs';
import { cleanObject, useDebounce, useMount } from 'utils/index';
import { List } from './list';
import { SearchPanel } from './search-panel';

const apiUrl = process.env.REACT_APP_API_URL;

interface User {
  name: string;
  id: string;
}

export const ProjectList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [param, setParam] = useState({
    name: '',
    id: '',
  });
  const [list, setList] = useState([]);

  const debouncedValue = useDebounce(param, 1000);

  useMount(() => {
    fetch(`${apiUrl}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  });

  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedValue))}`
    ).then(async (responce) => {
      if (responce.ok) {
        setList(await responce.json());
      }
    });
  }, [debouncedValue]);

  return (
    <>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users}
        setUsers={setUsers}
      />
      <List list={list} users={users} />
    </>
  );
};
