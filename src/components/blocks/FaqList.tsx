import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { faqs } from '../../data/faq'

export function FaqList() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div data-reveal-group className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = open === index
        const id = `faq-${index}`
        return (
          <div key={faq.question} className="rounded-2xl bg-secondary">
            <h3>
              <button
                type="button"
                id={`${id}-button`}
                aria-expanded={isOpen}
                aria-controls={`${id}-panel`}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left font-sans text-[1.02rem] font-medium tracking-normal"
              >
                {faq.question}
                <Plus size={20} aria-hidden="true" className={`shrink-0 transition-transform duration-500 ease-editorial ${isOpen ? 'rotate-45' : ''}`} />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${id}-panel`}
                  role="region"
                  aria-labelledby={`${id}-button`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 leading-relaxed text-ink/80">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
