import React, { CSSProperties, ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import './style.css';
import { Option } from "../types";

interface Customizations {
    customFilter?: (userInput: string, options: Option[]) => Promise<Option[]>;
    InputSlot?: () => ReactElement;
    SuggestionSlot?: (suggestions: Option[]) => ReactElement;
}

interface AutoCompleteProps {
    customizations?: Customizations;
    style?: CSSProperties;
    options: Option[];
    children: ReactNode;
}

export default function AutoCompleteRoot({ options, customizations={}, style, children }: AutoCompleteProps) {
    const {
        customFilter,
        InputSlot,
        SuggestionSlot,
    } = customizations;

    const [suggestions, setSuggestions] = useState<Option[]>();
    const [userInputValue, setUserInputValue] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>();

    const autoCompletePortalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [autoCompletePortalRef]);

    async function filterData(userInput: string, data: Option[]): Promise<Option[]> {
        let userValue = userInput;
        const regex = new RegExp(`${userValue}`, 'i');

        const result = data.filter((option) => {
            return regex.test(option.value);
        });
        return result;
    }

    async function handleInput(e: any) {
        const userInput = e.target.value;
        setUserInputValue(userInput);

        if (!userInput) {
            setSuggestions(options);
            return;
        }

        let newSuggestions: Option[];

        if (customFilter) {
            newSuggestions = await customFilter(userInput, options);
        } else {
            newSuggestions = await filterData(userInput, options);
        }

        if (newSuggestions) setSuggestions(newSuggestions);

    }

    function renderSuggestions(suggestions: Option[] | undefined) {
        if (!suggestions) return;

        if (SuggestionSlot) return (
            <SuggestionSlot {...suggestions} />
        )

        return null;
    }

    function renderInput() {
        if (InputSlot) return (
            <InputSlot />
        )

        return null;
    }

    function selectOptionHandler(option: Option) {
        if(option.value === 'No options') return;

        setUserInputValue(option.value)
    }

    function clearOptionHandler(e: any) {
        setUserInputValue('')
        setSuggestions(options);
    }

    function onFocusHandler(e: any) {
        setIsActive(true);
    }

    function handleClickOutside(e: MouseEvent) {
        if (autoCompletePortalRef.current && !autoCompletePortalRef.current.contains(e.target as Node)) {
            setIsActive(false);
        }
    }




    return (
        <div ref={autoCompletePortalRef} className='auto-complete-root' style={style} onFocus={onFocusHandler} >
            {children}          
        </div>
    )
}