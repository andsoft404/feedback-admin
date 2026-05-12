import type { PageContent } from '../pageEditors/types'

type LoadingPreviewProps = {
  activeContent: PageContent
}

export function LoadingPreview({ activeContent }: LoadingPreviewProps) {
  return (
    <section className="loading-preview-screen">
      <div className="loading-preview-card">
        <div
          className="loading-preview-media"
          style={{ backgroundColor: activeContent.imageBackground }}
        >
          <img src={activeContent.image} alt="Loading" />
        </div>
      </div>
    </section>
  )
}
