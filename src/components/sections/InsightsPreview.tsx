import { insights } from '../../data/insights'
import { InsightCard } from '../blocks/InsightCard'
import { Button } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'

export function InsightsPreview() {
  return (
    <section aria-labelledby="insights-title" className="section-y">
      <div className="container-x">
        <SectionHeading id="insights-title" title="Read, learn, grow." lead="Blogs on digital marketing, personal branding and content creation — with a tinge of positivity." />
        <ul data-reveal-group className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {insights.slice(0, 3).map((post, index) => (
            <li key={post.href} className={index === 2 ? 'sm:hidden lg:block' : ''}><InsightCard post={post} /></li>
          ))}
        </ul>
        <div data-reveal className="mt-12 flex justify-center">
          <Button to="/insights" icon>View all insights</Button>
        </div>
      </div>
    </section>
  )
}
