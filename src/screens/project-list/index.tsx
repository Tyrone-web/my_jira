import { useState, useEffect } from 'react';
import { cleanObject, useDebounce, useMount } from 'utils/index';
import { List } from './list';
import { SearchPanel } from './search-panel';
import { useHttp } from 'utils/http';

interface User {
  name: string;
  id: string;
  token: string;
}

export const ProjectList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const [list, setList] = useState([]);
  const debouncedValue = useDebounce(param, 1000);
  const client = useHttp();

  useMount(() => {
    client('users').then(setUsers); // point Free
  });

  useEffect(() => {
    client('projects', {
      data: cleanObject(debouncedValue),
    }).then((response) => setList(response));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
