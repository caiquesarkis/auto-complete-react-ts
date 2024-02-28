import { ReactNode } from "react"

interface InputWrapperProps {
    children: ReactNode
}
export default function InputWrapper({ children }: InputWrapperProps){
    return(
        <div>
            {children}
        </div>
    )
}