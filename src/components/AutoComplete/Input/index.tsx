import React, { useContext, useEffect, useRef } from "react";
import { AutoCompleteContext } from "../Context";
import { Option } from "../types";
import './style.css'

interface InputWrapperProps extends React.InputHTMLAttributes<HTMLInputElement> {
  userInputValue?: string;
  type?: string;
}
export default function Input({
  userInputValue,
  type,
  ...rest
}: InputWrapperProps) {


  const inputRef = useRef<HTMLInputElement>(null);
  const { value: inputValue, setValue: setUserInputValue } = useContext(AutoCompleteContext.UserInputContext)
  const { setValue: setSuggestions } = useContext(AutoCompleteContext.SuggestionContext)
  const options = useContext(AutoCompleteContext.OptionsContext)

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

    newSuggestions = await filterData(userInput, options);
    console.log(newSuggestions)

    if (newSuggestions) setSuggestions(newSuggestions);
  }

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.value = inputValue
    }
  }, [inputValue])

  console.log("Input value", inputValue);
  return (
    <input
      {...rest}
      ref={inputRef}
      className="auto-complete-input"
      type={type || "text"}
      onChange={handleInput}
      value={inputValue || undefined}
      placeholder="Pesquisar"
    />
  );
}
