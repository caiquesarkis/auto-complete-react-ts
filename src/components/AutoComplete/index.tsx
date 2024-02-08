import { CSSProperties, ReactElement, useCallback, useRef, useState } from "react";
import { Option } from "./types";
import './style.css';
import AutoCompleteSuggestionList from "./components/AutoCompleteSuggestionList";

interface Customizations {
    options: Option[];
    customFilter?: (userInput: string, options: Option[]) => Promise<Option[]>;
    InputSlot?: () => ReactElement;
    SuggestionSlot?: (suggestions: Option[]) => ReactElement;
}

interface AutoCompleteProps {
    customizations: Customizations;
    getValue: (option: Option | undefined) => void;
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
    const [selectedOption, setSelectedOption] = useState<Option>();
    const [isActive, setIsActive] = useState<boolean>();

    const autoCompletePortalRef = useRef(null);

    useCallback(() => {
        getValue(selectedOption)
    }, [selectedOption, getValue])


    async function filterData(userInput: string, data: Option[]): Promise<Option[]> {
        let userValue = userInput.toLowerCase();
        const result = data.filter((option) => {
            let suggestionValue = option.value.toLowerCase();

            return suggestionValue.includes(userValue);
        })
        console.log(userValue, result)
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
        setSelectedOption(option);
        setUserInputValue(option.value)
    }


    function clearOptionHandler(e: any) {
        setUserInputValue('')
        setSuggestions([])
    }

    function onFocusHandler(e: any) {
        setIsActive(true);
    }

    return (
        <div ref={autoCompletePortalRef} className='auto-complete-portal' onFocus={onFocusHandler} >
            {renderInput() ||
                <div>
                    <input onChange={handleInput} type="text" value={userInputValue} placeholder="Pesquisar" />
                    <button className="auto-complete-clear-button" onClick={clearOptionHandler}>x</button>
                </div>
            }
            {isActive ?

                (renderSuggestions(suggestions) || <AutoCompleteSuggestionList suggestions={suggestions} userInputValue={userInputValue} selectOptionHandler={selectOptionHandler} />)
                :
                null
            }
        </div>
    )
}