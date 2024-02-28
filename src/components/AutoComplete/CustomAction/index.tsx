import './style.css'

interface CustomActionProps {
    clearOptionHandler: () => void;
    text: string;
}

export default function CustomAction({clearOptionHandler, text}: CustomActionProps) {
    return (
        <button className="auto-complete-clear-button" onClick={clearOptionHandler}>{text || "x"}</button>
    )
}