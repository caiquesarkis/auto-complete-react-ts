import React from 'react';
import './App.css';
import AutoComplete from './components/AutoComplete';
import { Option } from './components/AutoComplete/types';

function App() {
    let options: Option[] = [
        {
            "id": 1,
            "value": "Blue Bookshelf"
        },
        {
            "id": 2,
            "value": "Blue Chair"
        },
        {
            "id": 3,
            "value": "Modern Lamp"
        },
        {
            "id": 4,
            "value": "Elegant Desk"
        },
        {
            "id": 5,
            "value": "Elegant Desk"
        },
        {
            "id": 6,
            "value": "Elegant Lamp"
        },
        {
            "id": 7,
            "value": "Modern Sofa"
        },
        {
            "id": 8,
            "value": "Green Lamp"
        },
        {
            "id": 9,
            "value": "Blue Sofa"
        },
        {
            "id": 10,
            "value": "Elegant Table"
        }
    ];
  return (
    <div className="App">
      <AutoComplete options={options}/>
    </div>
  );
}

export default App;
