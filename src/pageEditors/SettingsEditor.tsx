import type { AdminConfig, MediaAssetTarget, MediaConfig, ThemeConfig } from './types'
import type { ChangeEvent } from 'react'
import { pageOrder } from '../config'
import type { PageKey } from '../types'

type SettingsEditorProps = {
  config: AdminConfig
  updateMedia: <Key extends keyof MediaConfig>(key: Key, value: MediaConfig[Key]) => void
  updateNavigation: (key: PageKey, value: string) => void
  updateTheme: <Key extends keyof ThemeConfig>(key: Key, value: ThemeConfig[Key]) => void
  handleMediaAssetUpload: (
    event: ChangeEvent<HTMLInputElement>,
    target: MediaAssetTarget,
  ) => void
}

export function SettingsEditor({
  config,
  updateMedia,
  updateNavigation,
  updateTheme,
  handleMediaAssetUpload,
}: SettingsEditorProps) {
  return (
    <section className="panel settings-editor-panel" id="settings">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Settings</p>
          <h2>Админы ерөнхий тохиргоо</h2>
        </div>
      </div>

      <div className="settings-editor-grid">
        <div className="settings-menu-title wide">
          <p className="eyebrow">Navigation</p>
          <h3>Цэсийн гарчиг</h3>
        </div>
        {pageOrder.map((page) => (
          <label className="field-control" key={page.key}>
            <span>{page.label}</span>
            <input
              type="text"
              value={config.navigation[page.key] ?? page.label}
              onChange={(event) => updateNavigation(page.key, event.target.value)}
            />
          </label>
        ))}

        <div className="settings-menu-title wide">
          <p className="eyebrow">General</p>
          <h3>Ерөнхий тохиргоо</h3>
        </div>
        <label className="color-control">
          <span>Сайтын bg өнгө</span>
          <input
            type="color"
            value={config.theme.siteBackground}
            onChange={(event) => updateTheme('siteBackground', event.target.value)}
          />
          <code>{config.theme.siteBackground}</code>
        </label>
        <label className="color-control">
          <span>Гол өнгө</span>
          <input
            type="color"
            value={config.theme.primary}
            onChange={(event) => updateTheme('primary', event.target.value)}
          />
          <code>{config.theme.primary}</code>
        </label>

        <label className="field-control wide">
          <span>Лого URL</span>
          <input
            type="text"
            value={config.media.logo}
            onChange={(event) => updateMedia('logo', event.target.value)}
          />
        </label>
        <label className="field-control wide">
          <span>Лого upload</span>
          <span className="upload-preview-row">
            <img src={config.media.logo} alt="" />
            <span className="file-button">
              Upload logo
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleMediaAssetUpload(event, 'logo')}
              />
            </span>
          </span>
        </label>
      </div>
    </section>
  )
}
