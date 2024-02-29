import './style.css';

import { Option } from "../types";
import { AutoCompleteContext } from '../Context';
import { useContext } from 'react';

interface PortalListProps {
    render: (suggestions: Option[]) => React.ReactNode;
}

export default function PortalList({ render }: PortalListProps) {
    const { value: suggestions } = useContext(AutoCompleteContext.SuggestionContext)

    return (
        <ul className='suggestion-list'>
            {suggestions && render(suggestions)}

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