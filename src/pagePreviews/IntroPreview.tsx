import type { PageContent } from '../pageEditors/types'

type IntroPreviewProps = {
  activeContent: PageContent
}

export function IntroPreview({ activeContent }: IntroPreviewProps) {
  return (
    <section className="intro-preview-screen">
      <div className="intro-preview-card">
        <div className="intro-preview-copy">
          <img src={activeContent.logo} alt="Intro logo" />
          <h3>{activeContent.title}</h3>
        </div>

        <div className="intro-preview-media">
          <img src={activeContent.image} alt="" />
          <p>
            <span />
            {activeContent.promptText}
          </p>
        </div>
      </div>
    </section>
  )
}
