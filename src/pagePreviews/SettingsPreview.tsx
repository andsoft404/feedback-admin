import type { AdminConfig } from '../types'

type SettingsPreviewProps = {
  config: AdminConfig
}

export function SettingsPreview({ config }: SettingsPreviewProps) {
  return (
    <section className="settings-preview-screen">
      <div className="settings-preview-card">
        <img className="settings-preview-logo" src={config.media.logo} alt="Admin logo" />

        <div className="settings-color-preview">
          <span>Сайтын bg өнгө</span>
          <strong>{config.theme.siteBackground}</strong>
          <div style={{ backgroundColor: config.theme.siteBackground }} />
        </div>
      </div>
    </section>
  )
}
