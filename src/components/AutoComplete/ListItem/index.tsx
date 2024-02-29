import { useContext } from "react";
import { Option } from "../types";
import './style.css'
import { AutoCompleteContext } from "../Context";

interface ListItemProps {
    option: Option;
}


export function ListItem({ option}: ListItemProps) {
    const {value: inputValue , setValue: setUserInputValue} = useContext(AutoCompleteContext.UserInputContext)

    const highlightText = (suggestion: Option, userInputValue: string | undefined) => {
        if(userInputValue === undefined) return <span>{suggestion.value}</span>
        const suggestionValue = suggestion.value;
        const regex = new RegExp(userInputValue, 'gi');

        const highlightedValue = suggestionValue.replace(regex, (match) => `<mark>${match}</mark>`);

        return <span dangerouslySetInnerHTML={{ __html: highlightedValue }} />;
    };

    function selectOptionHandler(option: Option) {
        setUserInputValue(option.value)
    }


    return (
        <li className="list-item" onClick={() => selectOptionHandler(option)}>
            {highlightText(option, inputValue)}
        </li>
    )
}