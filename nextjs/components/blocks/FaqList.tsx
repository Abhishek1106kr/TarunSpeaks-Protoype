import { Plus } from 'lucide-react'

// Native <details> accordion: keyboard and screen-reader support for free, works without JS.
export function FaqList({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="border-t border-line">
      {items.map((item) => (
        <details key={item.question} className="group border-b border-line">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-[1.12rem] font-semibold tracking-[-0.01em] transition-colors hover:text-brand-text [&::-webkit-details-marker]:hidden">
            {item.question}
            <Plus aria-hidden="true" size={20} className="shrink-0 text-brand-text transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <p className="t-body max-w-3xl pb-6">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
