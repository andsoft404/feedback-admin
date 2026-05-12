import { useState } from 'react'
import type { AdminStudioState } from '../hooks/useAdminStudio'
import { PageStrip } from './PageStrip'

type AdminHeaderProps = {
  studio: AdminStudioState
  onSignOut?: () => void
}

export function AdminHeader({
  studio,
  onSignOut,
}: AdminHeaderProps) {
  const {
    config,
    handleMediaAssetUpload,
    saveDraft,
    saved,
    updateMedia,
  } = studio
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isWarningOpen, setIsWarningOpen] = useState(false)

  return (
    <header className="studio-header">
      <div className="brand-block">
        <img src={config.media.logo} alt="Bichil Globus" />
      </div>

      <PageStrip studio={studio} />

      <div className="profile-menu">
        <span className="profile-name-inline">{config.media.profileName}</span>

        <button
          type="button"
          className="profile-trigger"
          aria-label="Профайл цэс"
          aria-expanded={isProfileOpen}
          onClick={() => {
            setIsProfileOpen((open) => !open)
            setIsWarningOpen(false)
          }}
        >
          <img src={config.media.avatar} alt="Профайл" />
        </button>

        <button
          type="button"
          className="profile-warning-trigger"
          aria-label="Гарах анхааруулга"
          aria-expanded={isWarningOpen}
          onClick={() => {
            setIsWarningOpen((open) => !open)
            setIsProfileOpen(false)
          }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M10 3H6.8C5.25 3 4 4.25 4 5.8v12.4C4 19.75 5.25 21 6.8 21H10" />
            <path d="M10 12h9" />
            <path d="m15 7 5 5-5 5" />
          </svg>
        </button>

        {isWarningOpen && (
          <div className="profile-warning-popover" role="alert">
            {onSignOut && (
              <button
                type="button"
                className="warning-logout-button"
                onClick={onSignOut}
              >
                Гарах
              </button>
            )}
            <strong>Анхааруулга</strong>
            <p>Өөрчлөлтөө шалгаад дууссаны дараа Хадгалах товч дарж баталгаажуулна уу.</p>
          </div>
        )}

        {isProfileOpen && (
          <div className="profile-dropdown">
            <div className="profile-dropdown-head">
              <img src={config.media.avatar} alt="" />
              <strong>{config.media.profileName}</strong>
            </div>

            <label className="profile-upload-button">
              Профайл зураг солих
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleMediaAssetUpload(event, 'avatar')}
              />
            </label>

            <label className="profile-name-control">
              <span>Нэр солих</span>
              <input
                type="text"
                value={config.media.profileName}
                onChange={(event) => updateMedia('profileName', event.target.value)}
              />
            </label>

            <button
              type="button"
              className="primary-button header-save-button"
              onClick={saveDraft}
            >
              {saved ? 'Хадгаллаа' : 'Хадгалах'}
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
