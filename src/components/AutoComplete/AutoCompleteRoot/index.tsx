import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import './style.css';
import { Option } from "../types";
import { AutoCompleteContext } from "../Context";

interface AutoCompleteProps {
    style?: CSSProperties;
    options: Option[];
    children: ReactNode;
}

export default function AutoCompleteRoot({ options, style, children }: AutoCompleteProps) {
    const [suggestions, setSuggestions] = useState<Option[]>();
    const [userInputValue, setUserInputValue] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(false);

    const autoCompletePortalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [autoCompletePortalRef]);


    // function clearOptionHandler(e: any) {
    //     setUserInputValue('')
    //     setSuggestions(options);
    // }

    function onFocusHandler(e: any) {
        setIsActive(true);
    }

    function handleClickOutside(e: MouseEvent) {
        if (autoCompletePortalRef.current && !autoCompletePortalRef.current.contains(e.target as Node)) {
            setIsActive(false);
        }
    }




    return (
        <AutoCompleteContext.OptionsContext.Provider value={options}>
            <AutoCompleteContext.UserInputContext.Provider value={{ value: userInputValue, setValue: setUserInputValue }}>
                <AutoCompleteContext.SuggestionContext.Provider value={{ value: suggestions, setValue: setSuggestions }}>
                    <AutoCompleteContext.IsActiveContext.Provider value={isActive}>
                        <div ref={autoCompletePortalRef} className='auto-complete-root' style={style} onFocus={onFocusHandler} >
                            {children}
                        </div>
                    </AutoCompleteContext.IsActiveContext.Provider>
                </AutoCompleteContext.SuggestionContext.Provider>
            </AutoCompleteContext.UserInputContext.Provider>
        </AutoCompleteContext.OptionsContext.Provider>
    )
}