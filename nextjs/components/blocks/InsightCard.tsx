import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { articles } from '../../data/articles'
import type { Insight } from '../../data/insights'
import { Photo } from '../ui/Photo'

export function InsightCard({ post }: { post: Insight }) {
  return (
    <article className="group h-full">
      <Link href={`/insights/${post.slug}`} className="flex h-full flex-col">
        <div className="aspect-[16/9] overflow-hidden bg-surface">
          <Photo name={post.image} alt="" tone="color" sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" className="size-full object-cover opacity-90 transition-[opacity,scale] duration-700 ease-editorial group-hover:scale-[1.03] group-hover:opacity-100" />
        </div>
        <div className="flex flex-1 flex-col pt-5">
          <p className="text-[0.9rem] font-semibold text-brand-text">{post.category}</p>
          <h3 className="mt-2 font-primary text-[1.25rem] leading-[1.2] font-medium tracking-[-0.012em] decoration-brand-bright decoration-2 underline-offset-4 group-hover:underline">{post.title}</h3>
          <p className="mt-3 line-clamp-2 text-[0.93rem] leading-relaxed text-fg-2">{post.excerpt}</p>
          {(() => {
            const article = articles.find((item) => item.slug === post.slug)
            return article ? <p className="t-meta mt-3">{article.readingMinutes} min read</p> : null
          })()}
          <span className="mt-auto flex items-center gap-2 pt-5 text-[0.9rem] font-semibold text-fg-2">
            Read article
            <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </article>
  )
}
