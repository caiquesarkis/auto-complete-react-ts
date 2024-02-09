import { CSSProperties, ReactElement, useEffect, useRef, useState } from "react";
import { Option } from "./types";
import './style.css';
import SuggestionList from "./SuggestionList";

interface Customizations {
    options: Option[];
    customFilter?: (userInput: string, options: Option[]) => Promise<Option[]>;
    InputSlot?: () => ReactElement;
    SuggestionSlot?: (suggestions: Option[]) => ReactElement;
}

interface AutoCompleteProps {
    customizations: Customizations;
    getValue: (option: Option | undefined) => any;
    style?: CSSProperties;
}

export default function AutoComplete({ customizations, getValue, style }: AutoCompleteProps) {
    const {
        options,
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
            setSuggestions([]);
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
        getValue(option)
    }

    function clearOptionHandler(e: any) {
        setUserInputValue('')
        setSuggestions([])
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
        <div ref={autoCompletePortalRef} className='auto-complete-portal' style={style} onFocus={onFocusHandler} >
            {renderInput() ||
                <div>
                    <input  className="auto-complete-input" type="text" onChange={handleInput} value={userInputValue} placeholder="Pesquisar" />
                    <button className="auto-complete-clear-button" onClick={clearOptionHandler}>x</button>
                </div>
            }
            
            {isActive ?

                (renderSuggestions(suggestions) || <SuggestionList suggestions={suggestions} userInputValue={userInputValue} selectOptionHandler={selectOptionHandler} />)
                :
                null
            }
        </div>
    )
}