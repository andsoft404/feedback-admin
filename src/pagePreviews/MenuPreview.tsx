import type { PageContent } from '../pageEditors/types'

type MenuPreviewProps = {
  activeContent: PageContent
  avatarImage: string
}

export function MenuPreview({ activeContent, avatarImage }: MenuPreviewProps) {
  return (
    <section className="menu-preview-screen">
      <header className="menu-preview-header">
        <button type="button" aria-label="Back">
          ←
        </button>
        <img src={activeContent.logo} alt="Menu logo" />
        <div className="menu-preview-avatar">
          <img src={avatarImage} alt="" />
        </div>
      </header>

      <section className="menu-preview-ad">
        <img src={activeContent.image} alt="" />
        <button type="button" aria-label="Previous ad">
          ‹
        </button>
        <div>
          <strong>{activeContent.adTitle}</strong>
          <span>{activeContent.adSubtitle}</span>
        </div>
        <button type="button" aria-label="Next ad">
          ›
        </button>
      </section>

      <h3 className="menu-preview-prompt">{activeContent.promptText}</h3>

      <section className="menu-preview-cards">
        {activeContent.menuCards.map((card) => (
          <article className="menu-preview-card" key={card.id}>
            <img src={card.image} alt="" />
            <button
              type="button"
              style={{
                backgroundColor: card.buttonColor,
                color: card.textColor,
                fontFamily: `'${card.font}', system-ui, sans-serif`,
              }}
            >
              {card.buttonText}
            </button>
          </article>
        ))}
      </section>
    </section>
  )
}
