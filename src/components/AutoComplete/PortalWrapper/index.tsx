import './style.css';

interface PortalWrapperProps {
    children?: React.ReactNode;
}

export default function PortalWrapper({ children }: PortalWrapperProps) {

    return (
        <div className='portal-wrapper'>
            {children}
        </div>
    );
}