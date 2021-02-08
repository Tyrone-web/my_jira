import { useArray } from 'utils/index';


const personList = ['jone', 'jake', 'ma'];

export const TsTest = () => {  
  const {value, add, clear, removeIndex} = useArray(personList);
  return (
    <>
      <button onClick={() => add('jone')}>addJone</button>
      <button onClick={() => removeIndex(0)}>removeFirst</button>
      <button onClick={clear}>clear</button>
      <ul>
        {
          value.map((person, index) => <li key={index}>{index} {person}</li>)
        }
      </ul>
    </>
  )
}