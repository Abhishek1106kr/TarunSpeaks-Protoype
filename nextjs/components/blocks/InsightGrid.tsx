'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { articles } from '../../data/articles'
import { type InsightTopic, insights, insightTopics } from '../../data/insights'
import { InsightCard } from './InsightCard'
import { Photo } from '../ui/Photo'

type Filter = InsightTopic | 'All'

export function InsightGrid() {
  const [filter, setFilter] = useState<Filter>('All')
  const reduceMotion = useReducedMotion()
  const newestArticle = articles.reduce((newest, article) => article.publishedAt > newest.publishedAt ? article : newest)
  const featuredInsight = insights.find((post) => post.slug === newestArticle.slug)
  const visible = (filter === 'All' ? insights : insights.filter((post) => post.topic === filter))
    .filter((post) => filter !== 'All' || post.slug !== newestArticle.slug)

  return (
    <>
      {filter === 'All' && featuredInsight && (
        <Link href={`/insights/${featuredInsight.slug}`} className="group grid gap-6 lg:grid-cols-12 lg:items-center">
          <div className="aspect-[16/9] overflow-hidden bg-surface lg:col-span-7">
            <Photo name={featuredInsight.image} alt="" tone="color" sizes="(min-width: 1024px) 58vw, 92vw" className="size-full object-cover opacity-90 transition-[opacity,scale] duration-700 ease-editorial group-hover:scale-[1.03] group-hover:opacity-100" />
          </div>
          <div className="lg:col-span-5">
            <p className="text-[0.9rem] font-semibold text-brand-text">{featuredInsight.category}</p>
            <h3 className="t-h2 mt-2 decoration-brand-bright decoration-2 underline-offset-4 group-hover:underline">{featuredInsight.title}</h3>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-fg-2">{featuredInsight.excerpt}</p>
            <p className="t-meta mt-3">{newestArticle.readingMinutes} min read</p>
            <span className="mt-5 flex items-center gap-2 text-[0.9rem] font-semibold text-fg-2">
              Read article
              <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      )}
      <div className={`${filter === 'All' && featuredInsight ? 'mt-10' : ''} flex flex-wrap gap-2`} role="group" aria-label="Filter articles by topic">
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
              key={post.slug}
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
