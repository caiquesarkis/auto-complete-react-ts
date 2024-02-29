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
          <AutoComplete.ClearInput />
        </AutoComplete.InputWrapper>

        <AutoComplete.PortalWrapper>
          <AutoComplete.PortalList
            render={(suggestions) => {
              if(suggestions.length > 0){
                return suggestions.map((suggestion) => (
                  <AutoComplete.ListItem option={suggestion} />
                ));
 
              }else{
                return <AutoComplete.ListItem option = {{id: 0, value: 'No matches'}} />;
              }
          }}
          />
        </AutoComplete.PortalWrapper>
      </AutoComplete.Root>
    </div>
  );
}

export default App;
