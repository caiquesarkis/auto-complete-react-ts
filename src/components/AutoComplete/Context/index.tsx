import React from "react";
import { Option } from "../types";



interface UserInputContextType {
    value: string;
    setValue: (value: string) => void;
}

interface SuggestionsContextType {
    value: Option[] | undefined;
    setValue: (options: Option[]) => void;
}

const OptionsContext = React.createContext<Option[]>([]);
const SuggestionContext = React.createContext<SuggestionsContextType>({value: [], setValue: ()=>{}});
const UserInputContext = React.createContext<UserInputContextType>({value: '', setValue: ()=> {}});
const IsActiveContext = React.createContext<boolean>(false);


export const AutoCompleteContext = {
    OptionsContext: OptionsContext,
    SuggestionContext: SuggestionContext,
    UserInputContext: UserInputContext,
    IsActiveContext: IsActiveContext
}