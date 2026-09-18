import { type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes, useId } from 'react'

const control = 'w-full rounded-xl border border-line bg-light px-4 text-[0.97rem] text-ink transition-colors placeholder:text-muted hover:border-ink/30'
const labelClass = 'text-[0.7rem] font-medium tracking-[0.16em] text-ink/75 uppercase'

type Base = { label: string; className?: string }

function Label({ htmlFor, label, required }: { htmlFor: string; label: string; required?: boolean }) {
  return <label htmlFor={htmlFor} className={labelClass}>{label}{required && <span aria-hidden="true"> *</span>}</label>
}

export function Field({ label, className = '', ...input }: Base & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId()
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label htmlFor={id} label={label} required={input.required} />
      <input id={id} className={`${control} h-12`} {...input} />
    </div>
  )
}

export function SelectField({ label, options, placeholder = 'Select…', className = '', ...select }: Base & { options: string[]; placeholder?: string } & SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId()
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label htmlFor={id} label={label} required={select.required} />
      <select
        id={id}
        defaultValue=""
        className={`${control} h-12 appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='none'%20stroke='%23171717'%20stroke-width='1.6'%3E%3Cpath%20d='m4%206%204%204%204-4'/%3E%3C/svg%3E")] bg-[position:right_1rem_center] bg-no-repeat pr-11 [&:has(option[value='']:checked)]:text-muted`}
        {...select}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </div>
  )
}

export function TextareaField({ label, className = '', ...textarea }: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId()
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label htmlFor={id} label={label} required={textarea.required} />
      <textarea id={id} rows={5} className={`${control} resize-y py-3`} {...textarea} />
    </div>
  )
}
