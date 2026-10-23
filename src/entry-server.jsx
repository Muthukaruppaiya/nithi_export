import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App, { ROUTES } from './App'
import { SeoContext, headToHtml } from './seo/Seo'

export { ROUTES }

export function render(url) {
  const collector = {}
  const html = renderToString(
    <StrictMode>
      <SeoContext.Provider value={collector}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </SeoContext.Provider>
    </StrictMode>,
  )
  return { html, head: headToHtml(collector.head) }
}
