import './style.css';

import { Option } from "../../types";
import { SuggestionItem } from '../SuggestionItem';

interface AutoCompleteSuggestionListProps {
    suggestions?: Option[];
    userInputValue: string;
    selectOptionHandler: (option: Option) => void;
}

export default function AutoCompleteSuggestionList({ suggestions, userInputValue, selectOptionHandler }: AutoCompleteSuggestionListProps) {

    return (
        <ul className='suggestion-list'>
            {suggestions && suggestions.length > 0 ? (
                suggestions.map((option, i) => (
                    <SuggestionItem key={i} option={option} userInputValue={userInputValue} selectOptionHandler={selectOptionHandler} />
                ))
            ) : (
                <SuggestionItem key={0} option={{ id: 0, value: 'No options' }} userInputValue={userInputValue} selectOptionHandler={selectOptionHandler} />
            )}
        </ul>
    );

}