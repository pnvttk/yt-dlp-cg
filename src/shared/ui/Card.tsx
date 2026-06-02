import type { ReactNode } from 'react'

type CardProps = {
    children: ReactNode
    className?: string
    title?: string
    onClick?: () => void
}

export function Card({ children, className = '', title, onClick }: CardProps) {
    return (
        <div
            className={`glass-panel rounded-md p-4 ${className}`}
            onClick={onClick}
        >
            {title && (
                <div className="mb-3">
                    <h3 className="text-base font-semibold text-primary">
                        {title}
                    </h3>
                </div>
            )}
            {children}
        </div>
    )
}
