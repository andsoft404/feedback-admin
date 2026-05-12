import type { ChangeEvent } from 'react'
import type { PageAssetUploadHandler, PageContent, UpdatePage } from './types'

type AvatarEditorProps = {
  activeContent: PageContent
  fontOptions: string[]
  updatePage: UpdatePage
  handlePageAssetUpload: PageAssetUploadHandler
  handleAvatarUpload: (event: ChangeEvent<HTMLInputElement>) => void
  updateAvatar: (index: number, value: string) => void
  removeAvatar: (index: number) => void
}

export function AvatarEditor({
  activeContent,
  fontOptions,
  updatePage,
  handlePageAssetUpload,
  handleAvatarUpload,
  updateAvatar,
  removeAvatar,
}: AvatarEditorProps) {
  return (
    <section className="panel avatar-editor-panel" id="avatar">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Avatar editor</p>
          <h2>Avatar дэлгэцийн хэсгүүд</h2>
        </div>
      </div>

      <div className="intro-editor-grid">
        <label className="color-control">
          <span>Гадна background</span>
          <input
            type="color"
            value={activeContent.background}
            onChange={(event) => updatePage('background', event.target.value)}
          />
          <code>{activeContent.background}</code>
        </label>
        <label className="color-control">
          <span>Ногоон panel background</span>
          <input
            type="color"
            value={activeContent.cardBackground}
            onChange={(event) =>
              updatePage('cardBackground', event.target.value)
            }
          />
          <code>{activeContent.cardBackground}</code>
        </label>
        <label className="color-control">
          <span>Товч өнгө</span>
          <input
            type="color"
            value={activeContent.buttonColor}
            onChange={(event) => updatePage('buttonColor', event.target.value)}
          />
          <code>{activeContent.buttonColor}</code>
        </label>
        <label className="field-control">
          <span>Гарчгийн font</span>
          <select
            value={activeContent.titleFont}
            onChange={(event) => updatePage('titleFont', event.target.value)}
          >
            {fontOptions.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </label>
        <label className="field-control wide">
          <span>Лого URL</span>
          <input
            type="text"
            value={activeContent.logo}
            onChange={(event) => updatePage('logo', event.target.value)}
          />
        </label>
        <label className="field-control wide">
          <span>Лого upload</span>
          <span className="upload-preview-row">
            <img src={activeContent.logo} alt="" />
            <span className="file-button">
              Upload logo
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handlePageAssetUpload(event, 'logo')}
              />
            </span>
          </span>
        </label>
        <label className="field-control wide">
          <span>Гарчиг текст</span>
          <input
            type="text"
            value={activeContent.title}
            onChange={(event) => updatePage('title', event.target.value)}
          />
        </label>
        <label className="field-control">
          <span>Товч текст</span>
          <input
            type="text"
            value={activeContent.action}
            onChange={(event) => updatePage('action', event.target.value)}
          />
        </label>
        <label className="field-control">
          <span>Товчны font</span>
          <select
            value={activeContent.actionFont}
            onChange={(event) => updatePage('actionFont', event.target.value)}
          >
            {fontOptions.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </label>
        <label className="field-control wide">
          <span>Доод текст</span>
          <input
            type="text"
            value={activeContent.promptText}
            onChange={(event) => updatePage('promptText', event.target.value)}
          />
        </label>
        <label className="field-control">
          <span>Доод текстийн font</span>
          <select
            value={activeContent.promptFont}
            onChange={(event) => updatePage('promptFont', event.target.value)}
          >
            {fontOptions.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </label>
        <label className="field-control">
          <span>Avatar upload</span>
          <span className="file-button">
            Upload avatar
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
            />
          </span>
        </label>
      </div>

      <div className="avatar-list-editor">
        {activeContent.avatars.map((avatar, index) => (
          <div className="avatar-editor-row" key={`${avatar}-${index}`}>
            <img src={avatar} alt="" />
            <input
              type="text"
              value={avatar}
              onChange={(event) => updateAvatar(index, event.target.value)}
              aria-label={`Avatar ${index + 1} URL`}
            />
            <button
              type="button"
              className="icon-button danger"
              onClick={() => removeAvatar(index)}
              aria-label="Remove avatar"
              title="Remove avatar"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
