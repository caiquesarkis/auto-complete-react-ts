import { useState } from "react";
import { Option, Suggestion } from "./types";
import './style.css';

interface AutoCompleteProps {
    options: Option[];
}

export default function AutoComplete(props: AutoCompleteProps) {
    const [suggestions, setSuggestions] = useState<Suggestion[]>();

    async function filterData(userInput: string, data: Option[]): Promise<Suggestion[]> {
        let userValue = userInput.toLowerCase();
        const result = data.filter((option) => {
            let suggestionValue = option.value.toLowerCase();


            return suggestionValue.includes(userValue);
        })
        const suggestionsResult = result.map((option) => {
            return {
                ...option,
                highlightText: userValue
            }
        })
        return suggestionsResult;
    }

    async function handleInput(e: any) {
        const userInput = e.target.value;
        if (!userInput) {
            setSuggestions([]);
            return;
        }

        const newSuggestions = await filterData(userInput, props.options);
        setSuggestions(newSuggestions);
    }

    function highlightText(suggestion: Suggestion) {
        let suggestionValue = suggestion.value.toLowerCase();
        let suggestionHighlight = suggestion.highlightText.toLowerCase();

        let firstWordIndex = suggestionValue.indexOf(suggestionHighlight);

        let splittedSuggestion = [
            suggestion.value.slice(0, firstWordIndex),
            suggestion.value.slice(firstWordIndex, firstWordIndex + suggestion.highlightText.length),
            suggestion.value.slice(firstWordIndex + suggestion.highlightText.length)
        ];
        
        console.log(splittedSuggestion)
        return (
            <span>
                {splittedSuggestion[0]}
                <mark>{splittedSuggestion[1]}</mark>
                {splittedSuggestion[2]}
            </span>
        );
    }
    return (
        <div className="AutoCompleteContainer">
            <input onChange={handleInput} type="text" />
            <ul>
                {
                    suggestions?.map((suggestion, i) => {
                        return <li key={i}>
                            {highlightText(suggestion)}
                        </li>
                    })
                }
            </ul>
        </div>
    )
}