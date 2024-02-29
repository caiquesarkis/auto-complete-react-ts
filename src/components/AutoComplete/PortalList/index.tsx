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
        <>
            {suggestions &&
                <ul className='portal-list'>
                    {render(suggestions)}
                </ul>
            }
        </>
    )
}