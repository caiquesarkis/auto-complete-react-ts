import './style.css';

import { Option } from "../types";

interface PortalListProps {
    suggestions?: Option[];
    // userInputValue: string;
    // selectOptionHandler: (option: Option) => void;
    children?: React.ReactNode;
}

export default function PortalList({ children }: PortalListProps) {
    console.log("children",children)

    return (
        <ul className='suggestion-list'>
            {children}

            {/* {suggestions && suggestions.length > 0 ? (
                suggestions.map((option, i) => (
                    <SuggestionItem key={i} option={option} userInputValue={userInputValue} selectOptionHandler={selectOptionHandler} />
                ))
            ) : (
                <SuggestionItem key={0} option={{ id: 0, value: 'No options' }} userInputValue={userInputValue} selectOptionHandler={selectOptionHandler} />
            )} */}
        </ul>
    );

}