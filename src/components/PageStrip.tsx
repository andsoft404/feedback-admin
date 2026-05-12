import { pageOrder } from '../config'
import type { AdminStudioState } from '../hooks/useAdminStudio'

type PageStripProps = {
  studio: AdminStudioState
}

export function PageStrip({ studio }: PageStripProps) {
  const { activePage, config, setActivePage } = studio

  return (
    <nav className="page-strip" aria-label="Editable pages">
      {pageOrder.map((page, index) => (
        <button
          type="button"
          key={page.key}
          className={activePage === page.key ? 'selected' : ''}
          onClick={() => setActivePage(page.key)}
        >
          <span className="page-number">{String(index + 1).padStart(2, '0')}</span>
          <span className="page-nav-copy">
            <strong>{config.navigation[page.key] ?? page.label}</strong>
          </span>
        </button>
      ))}
    </nav>
  )
}
