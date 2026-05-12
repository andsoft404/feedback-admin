import { fieldTypes, fontOptions } from '../config'
import type { AdminStudioState } from '../hooks/useAdminStudio'
import { requestIconOptions } from '../icons'
import {
  AvatarEditor,
  ComplaintEditor,
  GenericEditor,
  IntroEditor,
  LoadingEditor,
  MenuEditor,
  RequestEditor,
  SettingsEditor,
  SuccessEditor,
  ThanksEditor,
} from '../pageEditors'

type EditorPanelProps = {
  studio: AdminStudioState
}

export function EditorPanel({ studio }: EditorPanelProps) {
  const {
    activeContent,
    activeFields,
    activePage,
    activePageMeta,
    activePageNumber,
    addAd,
    addField,
    complaintMode,
    config,
    configJson,
    copied,
    copyConfig,
    handleAvatarUpload,
    handleMediaAssetUpload,
    handleMenuCardImageUpload,
    handlePageAssetUpload,
    removeAd,
    removeAvatar,
    removeField,
    requestMessageField,
    requestNameField,
    requestPhoneField,
    setComplaintMode,
    showsAdPreview,
    showsFormFields,
    updateActiveFieldByIndex,
    updateAd,
    updateAvatar,
    updateField,
    updateMedia,
    updateMenuCard,
    updateNavigation,
    updatePage,
    updateTheme,
  } = studio

  return (
    <section className="editor-column">
      <section className="active-page-banner">
        <div className="active-page-number">{String(activePageNumber).padStart(2, '0')}</div>
        <div>
          <p className="eyebrow">Selected page</p>
          <h2>{activeContent.title}</h2>
          <p>{activeContent.helper}</p>
        </div>
      </section>

      <SummaryGrid studio={studio} />

      <div className="editor-grid">
        {activePage === 'settings' ? (
          <SettingsEditor
            config={config}
            updateMedia={updateMedia}
            updateNavigation={updateNavigation}
            updateTheme={updateTheme}
            handleMediaAssetUpload={handleMediaAssetUpload}
          />
        ) : activePage === 'loading' ? (
          <LoadingEditor
            activeContent={activeContent}
            updatePage={updatePage}
            handlePageAssetUpload={handlePageAssetUpload}
          />
        ) : activePage === 'intro' ? (
          <IntroEditor
            activeContent={activeContent}
            fontOptions={fontOptions}
            updatePage={updatePage}
            handlePageAssetUpload={handlePageAssetUpload}
          />
        ) : activePage === 'avatar' ? (
          <AvatarEditor
            activeContent={activeContent}
            fontOptions={fontOptions}
            updatePage={updatePage}
            handlePageAssetUpload={handlePageAssetUpload}
            handleAvatarUpload={handleAvatarUpload}
            updateAvatar={updateAvatar}
            removeAvatar={removeAvatar}
          />
        ) : activePage === 'menu' ? (
          <MenuEditor
            activeContent={activeContent}
            fontOptions={fontOptions}
            updatePage={updatePage}
            updateMenuCard={updateMenuCard}
            handlePageAssetUpload={handlePageAssetUpload}
            handleMenuCardImageUpload={handleMenuCardImageUpload}
          />
        ) : activePage === 'request' ? (
          <RequestEditor
            activeContent={activeContent}
            fontOptions={fontOptions}
            requestIconOptions={requestIconOptions}
            requestNameField={requestNameField}
            requestPhoneField={requestPhoneField}
            requestMessageField={requestMessageField}
            updatePage={updatePage}
            updateActiveFieldByIndex={updateActiveFieldByIndex}
            handlePageAssetUpload={handlePageAssetUpload}
          />
        ) : activePage === 'complaint' ? (
          <ComplaintEditor
            activeContent={activeContent}
            complaintMode={complaintMode}
            requestIconOptions={requestIconOptions}
            setComplaintMode={setComplaintMode}
            updatePage={updatePage}
            handlePageAssetUpload={handlePageAssetUpload}
          />
        ) : activePage === 'thanks' ? (
          <ThanksEditor
            activeContent={activeContent}
            fontOptions={fontOptions}
            requestIconOptions={requestIconOptions}
            thanksMode={complaintMode}
            setThanksMode={setComplaintMode}
            updatePage={updatePage}
            handlePageAssetUpload={handlePageAssetUpload}
          />
        ) : activePage === 'success' ? (
          <SuccessEditor
            activeContent={activeContent}
            fontOptions={fontOptions}
            updatePage={updatePage}
            handlePageAssetUpload={handlePageAssetUpload}
          />
        ) : (
          <GenericEditor
            activeContent={activeContent}
            activeFields={activeFields}
            activePageLabel={activePageMeta.label}
            ads={config.ads}
            configJson={configJson}
            copied={copied}
            fieldTypes={fieldTypes}
            fontOptions={fontOptions}
            showsAdPreview={showsAdPreview}
            showsFormFields={showsFormFields}
            updatePage={updatePage}
            updateAd={updateAd}
            updateField={updateField}
            addAd={addAd}
            removeAd={removeAd}
            addField={addField}
            removeField={removeField}
            copyConfig={copyConfig}
            handlePageAssetUpload={handlePageAssetUpload}
          />
        )}
      </div>
    </section>
  )
}

function SummaryGrid({ studio }: EditorPanelProps) {
  const { activeContent, activeFields, activePage, config, showsAdPreview, showsFormFields } =
    studio
  const mediaCount =
    activePage === 'settings'
      ? 2
      : activePage === 'loading'
      ? 1
      : activePage === 'intro'
      ? 2
      : activePage === 'avatar'
        ? activeContent.avatars.length
        : activePage === 'menu'
          ? activeContent.menuCards.length + 1
          : showsAdPreview
            ? config.ads.length
            : 1
  const mediaLabel =
    activePage === 'settings'
      ? 'logo and profile'
      : activePage === 'loading'
      ? 'loading gif'
      : activePage === 'intro'
      ? 'logo and gif'
      : activePage === 'avatar'
        ? 'avatar images'
        : activePage === 'menu'
          ? 'banner and menu cards'
          : showsAdPreview
            ? 'ads carousel'
            : 'page image'

  return (
    <section className="summary-grid" aria-label="Overview">
      <div className="metric-panel">
        <span>Media</span>
        <strong>{mediaCount}</strong>
        <small>{mediaLabel}</small>
      </div>
      <div className="metric-panel">
        <span>Fields</span>
        <strong>{activeFields.length}</strong>
        <small>{showsFormFields ? 'editable controls' : 'no form here'}</small>
      </div>
      <div className="metric-panel accent">
        <span>Style</span>
        <strong>{activeContent.font}</strong>
        <small>{activeContent.density}</small>
      </div>
    </section>
  )
}
