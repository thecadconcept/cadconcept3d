import { ButtonHTMLAttributes, forwardRef } from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]',
                    {
                        // Variants
                        'bg-primary text-black hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]':
                            variant === 'primary',
                        'bg-secondary text-white border border-gray-800 hover:bg-gray-900':
                            variant === 'secondary',
                        'border-2 border-primary text-primary hover:bg-primary/10':
                            variant === 'outline',
                        'text-gray-400 hover:text-white hover:bg-white/5': variant === 'ghost',

                        // Sizes
                        'h-9 px-4 text-sm': size === 'sm',
                        'h-11 px-6 text-base': size === 'md',
                        'h-14 px-8 text-lg': size === 'lg',
                    },
                    className
                )}
                {...props}
            />
        )
    }
)

Button.displayName = 'Button'

export { Button, cn }
