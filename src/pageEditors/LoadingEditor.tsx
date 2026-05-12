import type { PageAssetUploadHandler, PageContent, UpdatePage } from './types'

type LoadingEditorProps = {
  activeContent: PageContent
  updatePage: UpdatePage
  handlePageAssetUpload: PageAssetUploadHandler
}

export function LoadingEditor({
  activeContent,
  updatePage,
  handlePageAssetUpload,
}: LoadingEditorProps) {
  return (
    <section className="panel loading-editor-panel" id="loading">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Loading editor</p>
        </div>
      </div>

      <div className="loading-editor-layout">
        <section className="loading-editor-section">
          <h3>Өнгө</h3>
          <div className="loading-control-grid colors">
            <ColorControl
              label="Гадна bg"
              value={activeContent.background}
              onChange={(value) => updatePage('background', value)}
            />
            <ColorControl
              label="Card bg"
              value={activeContent.cardBackground}
              onChange={(value) => updatePage('cardBackground', value)}
            />
            <ColorControl
              label="Зурагны bg"
              value={activeContent.imageBackground}
              onChange={(value) => updatePage('imageBackground', value)}
            />
          </div>
        </section>

        <section className="loading-editor-section wide">
          <h3>Зураг / GIF</h3>
          <label className="field-control wide">
            <span>URL</span>
            <input
              type="text"
              value={activeContent.image}
              onChange={(event) => updatePage('image', event.target.value)}
            />
          </label>
          <label className="field-control wide">
            <span>Upload</span>
            <span className="upload-preview-row">
              <img src={activeContent.image} alt="" />
              <span className="file-button">
                Upload media
                <input
                  type="file"
                  accept="image/*,.gif"
                  onChange={(event) => handlePageAssetUpload(event, 'image')}
                />
              </span>
            </span>
          </label>
        </section>

        <section className="loading-editor-section">
          <h3>Хэлбэр</h3>
          <div className="loading-control-grid">
            <label className="field-control">
              <span>Card radius</span>
              <input
                type="number"
                min={8}
                max={56}
                value={activeContent.radius}
                onChange={(event) => updatePage('radius', Number(event.target.value))}
              />
            </label>
            <label className="field-control">
              <span>Shadow depth</span>
              <input
                type="number"
                min={0}
                max={100}
                value={activeContent.depth}
                onChange={(event) => updatePage('depth', Number(event.target.value))}
              />
            </label>
          </div>
        </section>
      </div>
    </section>
  )
}

function ColorControl({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="color-control">
      <span>{label}</span>
      <input
        type="color"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <code>{value}</code>
    </label>
  )
}
