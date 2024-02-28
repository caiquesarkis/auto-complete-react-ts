import AutoCompleteRoot from "./AutoCompleteRoot";
import CustomAction from "./CustomAction";
import Input from "./Input";
import InputWrapper from "./InputWrapper";
import { ListItem } from "./ListItem";
import SuggestionList from "./PortalList";
import PortalList from "./PortalList";

export const AutoComplete = {
    Root: AutoCompleteRoot,
    InputWrapper: InputWrapper,
    Input: Input,
    PortalWrapper: SuggestionList,
    PortalList: PortalList,
    ListItem: ListItem,
    CustomAction: CustomAction
}