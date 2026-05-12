import type { PageContent } from '../pageEditors/types'

type SuccessPreviewProps = {
  activeContent: PageContent
}

export function SuccessPreview({ activeContent }: SuccessPreviewProps) {
  return (
    <section className="success-preview-screen">
      <div className="success-preview-card">
        <div className="success-preview-visual">
          <img className="success-preview-logo" src={activeContent.logo} alt="Success logo" />
          <div
            className="success-preview-media"
            style={{ backgroundColor: activeContent.imageBackground }}
          >
            <img src={activeContent.image} alt="" />
          </div>
        </div>

        <div className="success-preview-copy">
          <h3>{activeContent.title}</h3>
          <p>{activeContent.subtitle}</p>
          <div className="success-preview-actions">
            <button
              type="button"
              style={{ backgroundColor: activeContent.buttonColor }}
            >
              {activeContent.action}
            </button>
            <button
              type="button"
              style={{ backgroundColor: activeContent.secondaryButtonColor }}
            >
              {activeContent.secondaryAction}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
