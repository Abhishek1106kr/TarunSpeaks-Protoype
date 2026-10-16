import { type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes, useId } from 'react'

const control = 'w-full rounded-[0.3rem] border bg-canvas px-4 text-[0.98rem] text-fg transition-colors placeholder:text-fg-3 hover:border-fg-3 focus-visible:border-brand-bright aria-[invalid=true]:border-error'
const labelClass = 'text-[0.85rem] font-semibold text-fg'

type Base = { label: string; hint?: string; error?: string; className?: string; optional?: boolean }

function Wrapper({ id, label, hint, error, optional, className, children }: Base & { id: string; children: ReactNode }) {
  return (
    <div className={`flex flex-col gap-2 ${className ?? ''}`}>
      <label htmlFor={id} className={labelClass}>
        {label}
        {optional && <span className="ml-1.5 font-normal text-fg-3">(optional)</span>}
      </label>
      {hint && <p id={`${id}-hint`} className="-mt-1 text-[0.82rem] text-fg-3">{hint}</p>}
      {children}
      {error && <p id={`${id}-error`} className="text-[0.85rem] text-error"><span aria-hidden="true">⚠ </span>{error}</p>}
    </div>
  )
}

const describedBy = (id: string, hint?: string, error?: string) => [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined

export function Field({ label, hint, error, optional, className, ...input }: Base & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId()
  return (
    <Wrapper id={id} label={label} hint={hint} error={error} optional={optional} className={className}>
      <input id={id} aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, hint, error)} className={`${control} h-12 ${error ? 'border-error' : 'border-line'}`} {...input} />
    </Wrapper>
  )
}

export function SelectField({ label, hint, error, optional, className, options, placeholder = 'Select…', ...select }: Base & { options: readonly { value: string; label: string }[]; placeholder?: string } & SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId()
  return (
    <Wrapper id={id} label={label} hint={hint} error={error} optional={optional} className={className}>
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={`${control} h-12 appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='none'%20stroke='%23AAB5C7'%20stroke-width='1.6'%3E%3Cpath%20d='m4%206%204%204%204-4'/%3E%3C/svg%3E")] bg-[position:right_1rem_center] bg-no-repeat pr-11 ${error ? 'border-error' : 'border-line'}`}
        {...select}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </Wrapper>
  )
}

export function TextareaField({ label, hint, error, optional, className, ...textarea }: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId()
  return (
    <Wrapper id={id} label={label} hint={hint} error={error} optional={optional} className={className}>
      <textarea id={id} rows={5} aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, hint, error)} className={`${control} resize-y py-3 ${error ? 'border-error' : 'border-line'}`} {...textarea} />
    </Wrapper>
  )
}
