import type { ReactNode } from 'react'
import type { FieldItem, PageContent } from '../pageEditors/types'

type RequestPreviewProps = {
  activeContent: PageContent
  avatarImage: string
  requestNameField?: FieldItem
  requestPhoneField?: FieldItem
  requestMessageField?: FieldItem
  renderRequestIcon: (icon: string) => ReactNode
}

export function RequestPreview({
  activeContent,
  avatarImage,
  requestNameField,
  requestPhoneField,
  requestMessageField,
  renderRequestIcon,
}: RequestPreviewProps) {
  return (
    <section className="request-preview-screen">
      <header className="request-preview-header">
        <button type="button" aria-label="Back">
          ←
        </button>
        <img src={activeContent.logo} alt="Request logo" />
        <div className="request-preview-avatar">
          <img src={avatarImage} alt="" />
        </div>
      </header>

      <div className="request-preview-body">
        <section className="request-preview-ad">
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

        <section className="request-form-preview">
          <h3>{activeContent.title}</h3>

          <div className="request-field-row">
            <span className="request-field-icon">
              {renderRequestIcon(activeContent.nameIcon)}
            </span>
            <span className="request-input-pill">
              {requestNameField?.label ?? 'Таны нэр'} ...
            </span>
          </div>

          <div className="request-field-row">
            <span className="request-field-icon">
              {renderRequestIcon(activeContent.phoneIcon)}
            </span>
            <span className="request-input-pill">
              {requestPhoneField?.label ?? 'Холбогдох утас'} ...
            </span>
          </div>

          <div className="request-textarea-card">
            <strong>{requestMessageField?.label ?? 'Хүсэлт бичих'}</strong>
            <div className="request-textarea-box">
              {requestMessageField?.placeholder ?? 'Хүсэлтээ бичнэ үү ...'}
            </div>
          </div>

          <button className="request-submit" type="button">
            {activeContent.action}
          </button>
        </section>
      </div>
    </section>
  )
}
