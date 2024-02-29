import { useContext } from 'react';
import './style.css'
import { AutoCompleteContext } from '../Context';

interface ClearInputButtonProps {
    text?: string;
}

export default function ClearInputButton({text}: ClearInputButtonProps) {
    const {setValue: setUserInputValue} = useContext(AutoCompleteContext.UserInputContext)
    const { setValue: setSuggestions } = useContext(AutoCompleteContext.SuggestionContext)
    const options = useContext(AutoCompleteContext.OptionsContext)



    function clearOptionHandler(e: any) {
        setUserInputValue('')
        setSuggestions(options)
    }
    return (
        <button className="auto-complete-clear-button" onClick={clearOptionHandler}>{text || "x"}</button>
    )
}