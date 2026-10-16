'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { type InsightTopic, insights, insightTopics } from '../../data/insights'
import { InsightCard } from './InsightCard'

type Filter = InsightTopic | 'All'

export function InsightGrid() {
  const [filter, setFilter] = useState<Filter>('All')
  const reduceMotion = useReducedMotion()
  const visible = filter === 'All' ? insights : insights.filter((post) => post.topic === filter)

  return (
    <>
      <div role="group" aria-label="Filter articles by topic" className="flex flex-wrap gap-2">
        {(['All', ...insightTopics] as Filter[]).map((topic) => (
          <button
            key={topic}
            type="button"
            aria-pressed={filter === topic}
            onClick={() => setFilter(topic)}
            className={`min-h-11 rounded-[0.3rem] px-4 text-[0.9rem] font-medium transition-colors ${filter === topic ? 'bg-brand text-fg' : 'border border-line text-fg-2 hover:border-fg-3 hover:text-fg'}`}
          >
            {topic}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="sr-only">Showing {visible.length} articles</p>
      <motion.ul layout={!reduceMotion} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((post) => (
            <motion.li
              key={post.href}
              layout={!reduceMotion}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <InsightCard post={post} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  )
}
