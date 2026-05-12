import type { PageContent } from '../pageEditors/types'

type AvatarPreviewProps = {
  activeContent: PageContent
}

export function AvatarPreview({ activeContent }: AvatarPreviewProps) {
  return (
    <section className="avatar-preview-screen">
      <img
        className="avatar-preview-logo"
        src={activeContent.logo}
        alt="Avatar logo"
      />
      <div className="avatar-preview-panel">
        <div className="avatar-preview-copy">
          <h3>{activeContent.title}</h3>
          <button type="button">{activeContent.action}</button>
        </div>

        <div className="avatar-preview-carousel">
          <button type="button" aria-label="Previous avatar">
            ‹
          </button>
          <div className="avatar-preview-card">
            <img
              src={activeContent.avatars[0] ?? activeContent.image}
              alt=""
            />
          </div>
          <button type="button" aria-label="Next avatar">
            ›
          </button>
          <p>
            <span>!</span>
            {activeContent.promptText}
          </p>
        </div>
      </div>
    </section>
  )
}
