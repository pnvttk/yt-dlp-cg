import { useState, type ReactNode } from 'react'

type CardProps = {
    children: ReactNode
    className?: string
    title?: string
    defaultCollapsed?: boolean
    onClick?: () => void
}

export function CardV2(props: CardProps) {
    const {
        children,
        className = '',
        title,
        defaultCollapsed = false,
        onClick,
    } = props

    const [collapsed, setCollapsed] = useState(defaultCollapsed)

    return (
        <div className={`glass-panel p-4 ${className}`}>
            {title && (
                <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => {
                        setCollapsed((v) => !v)
                        onClick?.()
                    }}
                >
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <h3 className="text-base font-semibold text-primary">
                            {title}
                        </h3>
                    </label>

                    <span>{collapsed ? '▶' : '▼'}</span>
                </div>
            )}

            {!collapsed && <div className="mt-3">{children}</div>}
        </div>
    )
}
