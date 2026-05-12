import type { PageAssetUploadHandler, PageContent, UpdatePage } from './types'

type SuccessEditorProps = {
  activeContent: PageContent
  fontOptions: string[]
  updatePage: UpdatePage
  handlePageAssetUpload: PageAssetUploadHandler
}

export function SuccessEditor({
  activeContent,
  fontOptions,
  updatePage,
  handlePageAssetUpload,
}: SuccessEditorProps) {
  return (
    <section className="panel success-editor-panel" id="success">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Success editor</p>
          <h2>Success дэлгэцийн хэсгүүд</h2>
        </div>
      </div>

      <div className="success-editor-grid">
        <ColorControl
          label="Гадна bg"
          value={activeContent.background}
          onChange={(value) => updatePage('background', value)}
        />
        <ColorControl
          label="Цагаан card bg"
          value={activeContent.cardBackground}
          onChange={(value) => updatePage('cardBackground', value)}
        />
        <ColorControl
          label="Зураг/GIF арын bg"
          value={activeContent.imageBackground}
          onChange={(value) => updatePage('imageBackground', value)}
        />

        <TextControl
          wide
          label="Лого URL"
          value={activeContent.logo}
          onChange={(value) => updatePage('logo', value)}
        />
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

        <TextControl
          wide
          label="Зураг/GIF URL"
          value={activeContent.image}
          onChange={(value) => updatePage('image', value)}
        />
        <label className="field-control wide">
          <span>Зураг/GIF upload</span>
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

        <TextControl
          wide
          label="Гарчиг"
          value={activeContent.title}
          onChange={(value) => updatePage('title', value)}
        />
        <label className="field-control wide">
          <span>Тайлбар</span>
          <textarea
            value={activeContent.subtitle}
            onChange={(event) => updatePage('subtitle', event.target.value)}
          />
        </label>

        <SelectControl
          label="Гарчгийн font"
          value={activeContent.titleFont}
          options={fontOptions}
          onChange={(value) => updatePage('titleFont', value)}
        />
        <SelectControl
          label="Тайлбар font"
          value={activeContent.bodyFont}
          options={fontOptions}
          onChange={(value) => updatePage('bodyFont', value)}
        />
        <SelectControl
          label="Товчны font"
          value={activeContent.actionFont}
          options={fontOptions}
          onChange={(value) => updatePage('actionFont', value)}
        />

        <TextControl
          label="Эхний товч текст"
          value={activeContent.action}
          onChange={(value) => updatePage('action', value)}
        />
        <ColorControl
          label="Эхний товч өнгө"
          value={activeContent.buttonColor}
          onChange={(value) => updatePage('buttonColor', value)}
        />
        <TextControl
          label="Хоёр дахь товч текст"
          value={activeContent.secondaryAction}
          onChange={(value) => updatePage('secondaryAction', value)}
        />
        <ColorControl
          label="Хоёр дахь товч өнгө"
          value={activeContent.secondaryButtonColor}
          onChange={(value) => updatePage('secondaryButtonColor', value)}
        />
      </div>
    </section>
  )
}

function TextControl({
  label,
  value,
  onChange,
  wide = false,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  wide?: boolean
}) {
  return (
    <label className={`field-control ${wide ? 'wide' : ''}`}>
      <span>{label}</span>
      <input type="text" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
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

function SelectControl({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
  return (
    <label className="field-control">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}
