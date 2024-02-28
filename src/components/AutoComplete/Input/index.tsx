import React from "react";

interface InputWrapperProps extends React.InputHTMLAttributes<HTMLInputElement> {
  handleInput?: () => void;
  userInputValue?: string;
  type?: string;
}
export default function Input({
  handleInput,
  userInputValue,
  type,
  ...rest
}: InputWrapperProps) {
  return (
    <input
      {...rest}
      className="auto-complete-input"
      type={type || "text"}
      onChange={handleInput}
      value={userInputValue || undefined}
      placeholder="Pesquisar"
    />
  );
}
