import { Option } from '../../types';
import './style.css';

interface AutoCompleteInputProps{
    onChange: (e: any) => Promise<void>;
    selectedOption: Option | undefined;
}

export default function AutoCompleteInput ({onChange, selectedOption} : AutoCompleteInputProps){
    return(
        <div>
            <input onChange={onChange} type="text" value={selectedOption?.value}/>
            <button>x</button>
        </div>
    )
}