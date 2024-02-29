import { useContext } from "react";
import { Option } from "../types";
import './style.css'
import { AutoCompleteContext } from "../Context";

interface ListItemProps {
    option: Option;
}


export function ListItem({ option}: ListItemProps) {

    const highlightText = (suggestion: Option, userInputValue: string) => {
        const suggestionValue = suggestion.value;
        const regex = new RegExp(userInputValue, 'gi');

        const highlightedValue = suggestionValue.replace(regex, (match) => `<mark>${match}</mark>`);

        return <span dangerouslySetInnerHTML={{ __html: highlightedValue }} />;
    };

    function selectOptionHandler(option: Option) {
        if(option.value === 'No options') return;

        setUserInputValue(option.value)
    }


    const {value: inputValue , setValue: setUserInputValue} = useContext(AutoCompleteContext.UserInputContext)
    return (
        <li className="list-item" onClick={() => selectOptionHandler(option)}>
            {highlightText(option, inputValue)}
        </li>
    )
}