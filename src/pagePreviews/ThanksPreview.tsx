import type { ReactNode } from 'react'
import type { ComplaintMode, PageContent } from '../pageEditors/types'

type ThanksPreviewProps = {
  activeContent: PageContent
  avatarImage: string
  thanksMode: ComplaintMode
  setThanksMode: (mode: ComplaintMode) => void
  renderRequestIcon: (icon: string) => ReactNode
}

const stars = [1, 2, 3, 4, 5]
const filledStarColor = '#FFD84D'
const emptyStarColor = '#6FA0DD'

export function ThanksPreview({
  activeContent,
  avatarImage,
  thanksMode,
  setThanksMode,
  renderRequestIcon,
}: ThanksPreviewProps) {
  return (
    <section className="complaint-preview-screen thanks-preview-screen">
      <header className="request-preview-header">
        <button type="button" aria-label="Back">
          ←
        </button>
        <img src={activeContent.logo} alt="Thanks logo" />
        <div className="request-preview-avatar">
          <img src={avatarImage} alt="" />
        </div>
      </header>

      <div className="complaint-preview-body">
        <aside className="complaint-preview-left">
          <section className="request-preview-ad complaint-preview-ad">
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

          <h3 className="complaint-choice-title">{activeContent.title}</h3>
          <section className="complaint-choice-grid">
            <article
              className={`complaint-choice-card ${
                thanksMode === 'organization' ? 'selected' : ''
              }`}
            >
              <img src={activeContent.organizationImage} alt="" />
              <button
                type="button"
                onClick={() => setThanksMode('organization')}
                style={{ backgroundColor: activeContent.organizationButtonColor }}
              >
                {activeContent.organizationButtonText}
              </button>
            </article>
            <article
              className={`complaint-choice-card ${
                thanksMode === 'employee' ? 'selected' : ''
              }`}
            >
              <img src={activeContent.employeeImage} alt="" />
              <button
                type="button"
                onClick={() => setThanksMode('employee')}
                style={{ backgroundColor: activeContent.employeeButtonColor }}
              >
                {activeContent.employeeButtonText}
              </button>
            </article>
          </section>
        </aside>

        {thanksMode === 'organization' ? (
          <section className="complaint-form-panel thanks-form-panel">
            <div className="request-textarea-card">
              <strong>{activeContent.messageTitle}</strong>
              <div className="request-textarea-box">
                {activeContent.messagePlaceholder}
              </div>
            </div>
            <RatingPreview activeContent={activeContent} />
            <button className="request-submit complaint-submit" type="button">
              {activeContent.action}
            </button>
          </section>
        ) : (
          <section className="complaint-form-panel thanks-form-panel employee">
            <div className="complaint-branch-panel">
              <strong>{activeContent.employeeBranchTitle}</strong>
              <div className="complaint-branch-tabs">
                <button
                  type="button"
                  style={{ backgroundColor: activeContent.centralBranchButtonColor }}
                >
                  {activeContent.centralBranchText}
                </button>
                <button
                  type="button"
                  style={{ backgroundColor: activeContent.unitBranchButtonColor }}
                >
                  {activeContent.unitBranchText}
                </button>
              </div>
              <div className="complaint-branch-carousel">
                <button type="button" aria-label="Previous branch">
                  ‹
                </button>
                <div className="complaint-branch-card">
                  <img src={activeContent.branchImage} alt="" />
                  <button
                    type="button"
                    style={{ backgroundColor: activeContent.chooseButtonColor }}
                  >
                    {activeContent.chooseButtonText}
                  </button>
                </div>
                <button type="button" aria-label="Next branch">
                  ›
                </button>
              </div>
              <span>{activeContent.branchName}</span>
            </div>

            <div className="request-field-row">
              <span className="request-field-icon">
                {renderRequestIcon(activeContent.nameIcon)}
              </span>
              <span className="request-input-pill">
                {activeContent.employeeNameText}
              </span>
            </div>

            <label className="complaint-select-preview">
              <span>{activeContent.positionTitle}</span>
              <strong>{activeContent.positionPlaceholder}</strong>
            </label>

            <div className="request-textarea-card">
              <strong>{activeContent.detailTitle}</strong>
              <div className="request-textarea-box">
                {activeContent.detailPlaceholder}
              </div>
            </div>

            <RatingPreview activeContent={activeContent} />
            <button className="request-submit complaint-submit" type="button">
              {activeContent.action}
            </button>
          </section>
        )}
      </div>
    </section>
  )
}

function RatingPreview({ activeContent }: { activeContent: PageContent }) {
  return (
    <div className="thanks-rating-row" aria-label="Rating preview">
      {stars.map((star) => {
        const isFilled = star <= activeContent.ratingValue

        return (
          <span
            key={star}
            style={{
              color: isFilled ? filledStarColor : emptyStarColor,
            }}
          >
            {isFilled ? '★' : '☆'}
          </span>
        )
      })}
    </div>
  )
}
