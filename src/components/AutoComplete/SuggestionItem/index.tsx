import { Option } from "../types";

interface SuggestionItemProps {
    option: Option;
    userInputValue: string;
    selectOptionHandler: (option: Option) => void
}


export function SuggestionItem({ option, userInputValue, selectOptionHandler }: SuggestionItemProps) {

    const highlightText = (suggestion: Option, userInputValue: string) => {
        const suggestionValue = suggestion.value;
        const regex = new RegExp(userInputValue, 'gi');

        const highlightedValue = suggestionValue.replace(regex, (match) => `<mark>${match}</mark>`);

        return <span dangerouslySetInnerHTML={{ __html: highlightedValue }} />;
    };

    return (
        <li onClick={() => selectOptionHandler(option)}>
            {highlightText(option, userInputValue)}
        </li>
    )
}