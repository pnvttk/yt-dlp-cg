import React from 'react'

type ButtonProps = {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
    size?: 'sm' | 'md' | 'lg'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}: ButtonProps) {
    const baseStyles =
        'inline-flex items-center justify-center rounded-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 font-mono'

    const variants = {
        primary:
            'bg-primary text-black hover:bg-primary-hover shadow-[0_0_8px_rgba(0,255,65,0.2)]',
        secondary: 'bg-secondary text-white hover:bg-secondary/90',
        ghost: 'text-text hover:bg-surface hover:text-white',
        outline:
            'border border-border bg-transparent hover:bg-surface text-text',
    }

    const sizes = {
        sm: 'h-6 px-2 text-sm',
        md: 'h-7 px-3 text-sm',
        lg: 'h-9 px-4 text-sm',
    }

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}
