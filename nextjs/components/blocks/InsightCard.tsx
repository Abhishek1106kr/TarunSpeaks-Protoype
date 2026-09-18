import { ArrowUpRight } from 'lucide-react'
import type { Insight } from '../../data/insights'
import { Img } from '../ui/Img'

export function InsightCard({ post }: { post: Insight }) {
  return (
    <article className="group h-full overflow-hidden rounded-card border border-line bg-light transition-shadow duration-500 hover:shadow-[0_28px_60px_-34px_rgba(23,23,23,0.4)]">
      <a href={post.href} target="_blank" rel="noreferrer" className="flex h-full flex-col">
        <div className="aspect-[16/10] overflow-hidden bg-secondary">
          <Img name={post.image} alt="" sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="size-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-105" />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="eyebrow text-accent">{post.category}</p>
          <h3 className="mt-4 text-[1.65rem] leading-[1.1]">{post.title}</h3>
          <p className="mt-3 line-clamp-2 text-[0.95rem] leading-relaxed text-muted">{post.excerpt}</p>
          <span className="mt-auto flex items-center gap-2 pt-6 text-[0.92rem] font-medium">
            Read article
            <ArrowUpRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="sr-only">(opens in a new tab)</span>
          </span>
        </div>
      </a>
    </article>
  )
}
