import { useEffect, useState } from 'react';
import './App.css';
import AutoComplete from './components/AutoComplete';
import { Option } from './components/AutoComplete/types';
import { data } from './services/mock';

function App() {
  let options: Option[] = data.options;

  const [selectedOption, setSelectedOption] = useState<Option>();

  useEffect(() => {
    console.log('Selected value updated in parent:', selectedOption)
  }, [selectedOption])

  return (
    <div className="App">
      <AutoComplete options={options} getValue={(option) => {
        setSelectedOption(option)
      }} />
    </div>
  );
}

export default App;
