import type { ReactNode } from 'react'
import type { ComplaintMode, PageContent } from '../pageEditors/types'

type ComplaintPreviewProps = {
  activeContent: PageContent
  avatarImage: string
  complaintMode: ComplaintMode
  setComplaintMode: (mode: ComplaintMode) => void
  renderRequestIcon: (icon: string) => ReactNode
}

export function ComplaintPreview({
  activeContent,
  avatarImage,
  complaintMode,
  setComplaintMode,
  renderRequestIcon,
}: ComplaintPreviewProps) {
  return (
    <section className="complaint-preview-screen">
      <header className="request-preview-header">
        <button type="button" aria-label="Back">
          ←
        </button>
        <img src={activeContent.logo} alt="Complaint logo" />
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
                complaintMode === 'organization' ? 'selected' : ''
              }`}
            >
              <img src={activeContent.organizationImage} alt="" />
              <button
                type="button"
                onClick={() => setComplaintMode('organization')}
                style={{ backgroundColor: activeContent.organizationButtonColor }}
              >
                {activeContent.organizationButtonText}
              </button>
            </article>
            <article
              className={`complaint-choice-card ${
                complaintMode === 'employee' ? 'selected' : ''
              }`}
            >
              <img src={activeContent.employeeImage} alt="" />
              <button
                type="button"
                onClick={() => setComplaintMode('employee')}
                style={{ backgroundColor: activeContent.employeeButtonColor }}
              >
                {activeContent.employeeButtonText}
              </button>
            </article>
          </section>
        </aside>

        {complaintMode === 'organization' ? (
          <section className="complaint-form-panel">
            <div className="request-field-row">
              <span className="request-field-icon">
                {renderRequestIcon(activeContent.nameIcon)}
              </span>
              <span className="request-input-pill">
                {activeContent.organizationNameText} ...
              </span>
            </div>
            <div className="request-field-row">
              <span className="request-field-icon">
                {renderRequestIcon(activeContent.phoneIcon)}
              </span>
              <span className="request-input-pill">
                {activeContent.organizationPhoneText} ...
              </span>
            </div>

            <div className="request-textarea-card">
              <strong>{activeContent.messageTitle}</strong>
              <div className="request-textarea-box">
                {activeContent.messagePlaceholder}
              </div>
            </div>

            <strong className="complaint-attach-label">
              {activeContent.attachmentLabel}
            </strong>
            <span className="complaint-attach-pill">
              {activeContent.attachText}
            </span>
            <button className="request-submit complaint-submit" type="button">
              {activeContent.action}
            </button>
          </section>
        ) : (
          <section className="complaint-form-panel employee">
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
            <div className="request-field-row">
              <span className="request-field-icon">
                {renderRequestIcon(activeContent.phoneIcon)}
              </span>
              <span className="request-input-pill">
                {activeContent.employeePhoneText} ...
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

            <strong className="complaint-attach-label">
              {activeContent.attachmentLabel}
            </strong>
            <span className="complaint-attach-pill">
              {activeContent.attachText}
            </span>
            <button className="request-submit complaint-submit" type="button">
              {activeContent.action}
            </button>
          </section>
        )}
      </div>
    </section>
  )
}
