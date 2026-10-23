import { Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import Seo from '../seo/Seo'
import PageHero from '../components/ui/PageHero'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="The page you are looking for does not exist." path="/404" noindex />
      <PageHero eyebrow="404" title="This page has wandered off the trade route" intro="The page you are looking for does not exist or has moved." crumbs={['Not found']}>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/" className="btn-primary">
            <ArrowLeft className="size-4" /> Back to home
          </Link>
          <Link to="/products" className="btn-ghost text-cream-50">
            View products
          </Link>
        </div>
      </PageHero>
    </>
  )
}
