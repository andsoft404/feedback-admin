import {
  AvatarPreview,
  ComplaintPreview,
  GenericPreview,
  IntroPreview,
  LoadingPreview,
  MenuPreview,
  RequestPreview,
  SettingsPreview,
  SuccessPreview,
  ThanksPreview,
} from '../pagePreviews'
import { renderRequestIcon } from '../icons'
import type { AdminStudioState, PreviewMode } from '../hooks/useAdminStudio'

type PreviewPanelProps = {
  studio: AdminStudioState
}

const previewModes: PreviewMode[] = ['desktop', 'tablet', 'phone']

export function PreviewPanel({ studio }: PreviewPanelProps) {
  const {
    activeContent,
    activeFields,
    activePage,
    activePageMeta,
    complaintMode,
    config,
    formScreenClass,
    previewMode,
    requestMessageField,
    requestNameField,
    requestPhoneField,
    setComplaintMode,
    setPreviewMode,
    showsAdPreview,
    showsFormFields,
  } = studio

  return (
    <aside className="preview-column" aria-label="Live preview">
      <div className="preview-toolbar">
        <div>
          <p className="eyebrow">Live preview</p>
          <h2>{activePageMeta.label}</h2>
        </div>
        <div className="segmented compact">
          {previewModes.map((mode) => (
            <button
              type="button"
              key={mode}
              className={previewMode === mode ? 'selected' : ''}
              onClick={() => setPreviewMode(mode)}
            >
              {mode[0].toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className={`device-preview ${previewMode}`}>
        <div className={formScreenClass}>
          {activePage === 'settings' ? (
            <SettingsPreview config={config} />
          ) : activePage === 'loading' ? (
            <LoadingPreview activeContent={activeContent} />
          ) : activePage === 'intro' ? (
            <IntroPreview activeContent={activeContent} />
          ) : activePage === 'avatar' ? (
            <AvatarPreview activeContent={activeContent} />
          ) : activePage === 'menu' ? (
            <MenuPreview
              activeContent={activeContent}
              avatarImage={config.pages.avatar.avatars[0]}
            />
          ) : activePage === 'request' ? (
            <RequestPreview
              activeContent={activeContent}
              avatarImage={config.pages.avatar.avatars[0]}
              requestNameField={requestNameField}
              requestPhoneField={requestPhoneField}
              requestMessageField={requestMessageField}
              renderRequestIcon={renderRequestIcon}
            />
          ) : activePage === 'complaint' ? (
            <ComplaintPreview
              activeContent={activeContent}
              avatarImage={config.pages.avatar.avatars[0]}
              complaintMode={complaintMode}
              setComplaintMode={setComplaintMode}
              renderRequestIcon={renderRequestIcon}
            />
          ) : activePage === 'thanks' ? (
            <ThanksPreview
              activeContent={activeContent}
              avatarImage={config.pages.avatar.avatars[0]}
              thanksMode={complaintMode}
              setThanksMode={setComplaintMode}
              renderRequestIcon={renderRequestIcon}
            />
          ) : activePage === 'success' ? (
            <SuccessPreview activeContent={activeContent} />
          ) : (
            <GenericPreview
              activeContent={activeContent}
              activeFields={activeFields}
              activePage={activePage}
              activePageLabel={activePageMeta.label}
              ads={config.ads}
              media={config.media}
              showsAdPreview={showsAdPreview}
              showsFormFields={showsFormFields}
            />
          )}
        </div>
      </div>
    </aside>
  )
}
