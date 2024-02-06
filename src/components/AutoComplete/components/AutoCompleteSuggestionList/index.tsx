import './style.css';

import { Option } from "../../types";

interface AutoCompleteSuggestionListProps {
    suggestions?: Option[];
    userInputValue: string;
    selectOptionHandler: (option: Option) => void;
}

export default function AutoCompleteSuggestionList({ suggestions, userInputValue, selectOptionHandler }: AutoCompleteSuggestionListProps) {

    const highlightText = (suggestion: Option) => {
        let suggestionValue = suggestion.value.toLowerCase();
        let suggestionHighlight = userInputValue.toLowerCase();

        let firstWordIndex = suggestionValue.indexOf(suggestionHighlight);

        let splittedSuggestion = [
            suggestion.value.slice(0, firstWordIndex),
            suggestion.value.slice(firstWordIndex, firstWordIndex + userInputValue.length),
            suggestion.value.slice(firstWordIndex + userInputValue.length)
        ];

        return (
            <span>
                {splittedSuggestion[0]}
                <mark>{splittedSuggestion[1]}</mark>
                {splittedSuggestion[2]}
            </span>
        );
    }
    
    return (
        <ul className='suggestion-list'>
            {
                suggestions && suggestions.length > 0 ?
                    suggestions.map((option, i) => {
                        return <li key={i} onClick={()=> selectOptionHandler(option)}>
                            {highlightText(option)}
                        </li>
                    }) :
                    <li>
                        No options
                    </li>
            }
        </ul>
    )
}