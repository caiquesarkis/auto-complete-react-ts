import './style.css';

interface AutoCompletePortalProps {
    children: React.ReactNode;
}

export default function AutoCompletePortal({ children }: AutoCompletePortalProps) {
    return (
        <div className='auto-complete-portal'>
        { children }
        </div>
    )
};