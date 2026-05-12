import type { AdItem, FieldItem, MediaConfig, PageContent, PageKey } from '../types'

type GenericPreviewProps = {
  activeContent: PageContent
  activeFields: FieldItem[]
  activePage: PageKey
  activePageLabel: string
  ads: AdItem[]
  media: MediaConfig
  showsAdPreview: boolean
  showsFormFields: boolean
}

export function GenericPreview({
  activeContent,
  activeFields,
  activePage,
  activePageLabel,
  ads,
  media,
  showsAdPreview,
  showsFormFields,
}: GenericPreviewProps) {
  return (
    <>
    <header className="form-header">
      <img src={media.logo} alt="Logo" />
      <div className="avatar-box">
        <img src={media.avatar} alt="Avatar" />
      </div>
    </header>

    {showsAdPreview ? (
      <section className="ad-preview">
        <img src={ads[0]?.image} alt="" />
        <div>
          <span>{ads[0]?.label}</span>
          <strong>{ads[0]?.title}</strong>
          <small>{ads[0]?.range}</small>
        </div>
      </section>
    ) : (
      <section className="cover-preview">
        <img src={activeContent.image} alt="" />
        <div>
          <span>{activePageLabel}</span>
          <strong>{activeContent.title}</strong>
        </div>
      </section>
    )}

    <section className="phone-form">
      <h3>{activeContent.title}</h3>
      <p>{activeContent.subtitle}</p>

      {activePage === 'success' && (
        <div className="success-mark" aria-hidden="true">
          ✓
        </div>
      )}

      {showsFormFields &&
        activeFields.slice(0, 3).map((field) =>
          field.type === 'textarea' ? (
            <div className="sunken-input textarea" key={field.id}>
              {field.placeholder}
            </div>
          ) : (
            <div className="pill-input" key={field.id}>
              <span>{field.label}</span>
              <small>{field.placeholder}</small>
            </div>
          ),
        )}

      <button type="button">{activeContent.action}</button>
    </section>
    </>
  )
}
