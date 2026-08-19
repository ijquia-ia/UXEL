import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import * as React from 'react'
const variants = cva('inline-flex items-center justify-center gap-2 rounded-none px-5 py-3.5 text-sm font-medium transition duration-300 ease-out active:scale-[.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan disabled:opacity-50', { variants: { variant: { default: 'bg-cyan text-ink cyan-glow hover:-translate-y-0.5', outline: 'border border-ink/20 bg-primary text-ink hover:-translate-y-0.5 hover:border-ink hover:bg-secondary', ghost: 'text-ink hover:bg-secondary' } }, defaultVariants: { variant: 'default' } })
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof variants> {}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, ...props }, ref) => <button ref={ref} className={cn(variants({variant}),className)} {...props}/>)
Button.displayName = 'Button'
