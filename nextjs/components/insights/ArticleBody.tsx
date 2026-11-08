import type { Block, Inline } from '../../data/articles'
import { ArticleImage } from './ArticleImage'
import { YouTubeLite } from './YouTubeLite'

function InlineContent({ content }: { content: Inline[] }) {
  return (
    <>
      {content.map((segment, index) => {
        const text = segment.bold ? <strong className="font-semibold text-fg">{segment.text}</strong> : segment.text
        if (!segment.href) return <span key={`${segment.text}-${index}`}>{text}</span>

        const external = !segment.href.startsWith('/')
        return (
          <a
            key={`${segment.text}-${index}`}
            href={segment.href}
            className="text-fg underline decoration-brand-bright underline-offset-4 hover:text-brand-text"
            {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
          >
            {text}
          </a>
        )
      })}
    </>
  )
}

const textClass = 't-body text-fg-2 text-[1.0625rem] leading-[1.8] sm:text-[1.125rem]'

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div>
      {blocks.map((block, index) => {
        if (block.type === 'h2') return <h2 key={`${block.id}-${index}`} id={block.id} className="t-h2 mt-14 scroll-mt-28">{block.text}</h2>
        if (block.type === 'h3') return <h3 key={`${block.id}-${index}`} id={block.id} className="t-h3 mt-10 scroll-mt-28">{block.text}</h3>
        if (block.type === 'p') return <p key={`p-${index}`} className={`${textClass} mt-5 max-w-[68ch]`}><InlineContent content={block.content} /></p>
        if (block.type === 'list') {
          const List = block.ordered ? 'ol' : 'ul'
          return (
            <List key={`list-${index}`} className={`${textClass} mt-5 max-w-[68ch] space-y-2 pl-5 ${block.ordered ? 'list-decimal' : 'list-disc'}`}>
              {block.items.map((item, itemIndex) => <li key={`item-${itemIndex}`}><InlineContent content={item} /></li>)}
            </List>
          )
        }
        if (block.type === 'image') return <ArticleImage key={`image-${index}`} {...block} />
        return <YouTubeLite key={`video-${index}`} id={block.youtubeId} title={block.title} />
      })}
    </div>
  )
}
