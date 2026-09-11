import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useScrollAnimations } from '../animation/useScrollAnimations'
import { InsightCard } from '../components/blocks/InsightCard'
import { NewsletterForm } from '../components/blocks/NewsletterForm'
import { PageHero } from '../components/sections/PageHero'
import { Eyebrow } from '../components/ui/Eyebrow'
import { type InsightTopic, insights, insightTopics } from '../data/insights'

type Filter = InsightTopic | 'All'

export default function InsightsPage() {
  const ref = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState<Filter>('All')
  useScrollAnimations(ref)

  const visible = filter === 'All' ? insights : insights.filter((post) => post.topic === filter)

  return (
    <div ref={ref}>
      <title>Insights — Tarun Makhija</title>
      <PageHero
        eyebrow="Insights"
        title={<>Read, learn, <em>grow.</em></>}
        lead="The most powerful blogs on digital marketing, personal branding and content creation — with a tinge of positivity."
      />

      <section aria-labelledby="articles-title" className="pb-[clamp(5rem,11vw,9rem)]">
        <div className="container-x">
          <h2 id="articles-title" className="sr-only">Articles</h2>
          <div role="group" aria-label="Filter articles by topic" data-reveal className="flex flex-wrap gap-2">
            {(['All', ...insightTopics] as Filter[]).map((topic) => (
              <button
                key={topic}
                type="button"
                aria-pressed={filter === topic}
                onClick={() => setFilter(topic)}
                className={`min-h-11 rounded-full px-5 text-[0.92rem] transition-colors duration-300 ${filter === topic ? 'bg-dark text-light' : 'border border-line hover:border-ink'}`}
              >
                {topic}
              </button>
            ))}
          </div>
          <p aria-live="polite" className="sr-only">Showing {visible.length} articles</p>

          <motion.ul layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((post) => (
                <motion.li
                  key={post.href}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <InsightCard post={post} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      </section>

      <section aria-labelledby="newsletter-title" className="pb-[clamp(5rem,11vw,9rem)]">
        <div className="container-x">
          <div className="grid gap-10 rounded-[2rem] bg-secondary p-7 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
            <div>
              <div data-reveal><Eyebrow tone="accent-ink" className="mb-6">Stay curious</Eyebrow></div>
              <h2 id="newsletter-title" data-split className="display-md">Newsletter <em>signup!</em></h2>
              <p data-reveal className="mt-5 max-w-md leading-relaxed text-ink/80">
                Join the waitlist for a powerful newsletter on digital marketing, personal branding and content creation — with a tinge of positivity.
              </p>
            </div>
            <div data-reveal className="self-center"><NewsletterForm variant="full" /></div>
          </div>
        </div>
      </section>
    </div>
  )
}
