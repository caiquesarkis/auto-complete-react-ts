import './style.css';

import { Option } from "../../types";

interface AutoCompleteSuggestionListProps {
    suggestions?: Option[];
    userInputValue: string;
    selectOptionHandler: (option: Option) => void;
}

export default function AutoCompleteSuggestionList({ suggestions, userInputValue, selectOptionHandler }: AutoCompleteSuggestionListProps) {

    const highlightText = (suggestion: Option, userInputValue: string) => {
        const suggestionValue = suggestion.value;
        const regex = new RegExp(userInputValue, 'gi');
        const highlightedValue = suggestionValue.replace(regex, (match) => `<mark>${match}</mark>`);
        return <span dangerouslySetInnerHTML={{ __html: highlightedValue }} />;
    };

    return (
        <ul className='suggestion-list'>
            {
                suggestions && suggestions.length > 0 ?
                    suggestions.map((option, i) => {
                        return <li key={i} onClick={()=> selectOptionHandler(option)}>
                            {highlightText(option, userInputValue)}
                        </li>
                    }) :
                    <li>
                        No options
                    </li>
            }
        </ul>
    )
}