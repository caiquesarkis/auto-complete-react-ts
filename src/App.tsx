import './App.css';
import { Option } from './components/AutoComplete/types';
import { data } from './services/mock';
import { AutoComplete } from './components/AutoComplete';


function App() {
  let options: Option[] = data.options;

  return (
    <div className="App">
      <AutoComplete.Root options={options}>
        <AutoComplete.InputWrapper>
          <AutoComplete.Input />
        </AutoComplete.InputWrapper>

        <AutoComplete.PortalWrapper>
          <AutoComplete.PortalList>
            <AutoComplete.ListItem />
            <AutoComplete.ListItem />
          </AutoComplete.PortalList>
        </AutoComplete.PortalWrapper>
      </AutoComplete.Root>
    </div>
  );
}

export default App;
