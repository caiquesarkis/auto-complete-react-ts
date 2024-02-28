import { Option } from "../types";
import './style.css'

interface ListItemProps {
    option?: Option;
    userInputValue?: string;
    selectOptionHandler?: (option: Option) => void
}


export function ListItem({ option = { id: 0, value: "Nothing"}, userInputValue = "o", selectOptionHandler = (option: Option) => null }: ListItemProps) {

    const highlightText = (suggestion: Option, userInputValue: string) => {
        const suggestionValue = suggestion.value;
        const regex = new RegExp(userInputValue, 'gi');

        const highlightedValue = suggestionValue.replace(regex, (match) => `<mark>${match}</mark>`);

        return <span dangerouslySetInnerHTML={{ __html: highlightedValue }} />;
    };

    return (
        <li className="list-item" onClick={() => selectOptionHandler(option)}>
            {highlightText(option, userInputValue)}
        </li>
    )
}