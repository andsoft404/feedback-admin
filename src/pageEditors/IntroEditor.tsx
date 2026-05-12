import type { PageAssetUploadHandler, PageContent, UpdatePage } from './types'

type IntroEditorProps = {
  activeContent: PageContent
  fontOptions: string[]
  updatePage: UpdatePage
  handlePageAssetUpload: PageAssetUploadHandler
}

export function IntroEditor({
  activeContent,
  fontOptions,
  updatePage,
  handlePageAssetUpload,
}: IntroEditorProps) {
  return (
    <section className="panel intro-editor-panel" id="intro">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Intro editor</p>
          <h2>Intro дэлгэцийн хэсгүүд</h2>
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
          <span>Цагаан card background</span>
          <input
            type="color"
            value={activeContent.cardBackground}
            onChange={(event) =>
              updatePage('cardBackground', event.target.value)
            }
          />
          <code>{activeContent.cardBackground}</code>
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
          <span>Гарчиг</span>
          <input
            type="text"
            value={activeContent.title}
            onChange={(event) => updatePage('title', event.target.value)}
          />
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
        <label className="field-control wide">
          <span>Зураг / GIF URL</span>
          <input
            type="text"
            value={activeContent.image}
            onChange={(event) => updatePage('image', event.target.value)}
          />
        </label>
        <label className="field-control wide">
          <span>Зураг / GIF upload</span>
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
        <label className="field-control wide">
          <span>Доод текст</span>
          <input
            type="text"
            value={activeContent.promptText}
            onChange={(event) => updatePage('promptText', event.target.value)}
          />
        </label>
        <label className="field-control wide">
          <span>Voice URL</span>
          <input
            type="text"
            value={activeContent.voice}
            onChange={(event) => updatePage('voice', event.target.value)}
          />
        </label>
        <label className="field-control wide">
          <span>Voice upload</span>
          <span className="upload-preview-row audio-upload-row">
            <audio src={activeContent.voice} controls />
            <span className="file-button">
              Upload voice
              <input
                type="file"
                accept="audio/*,.mp3,.wav,.m4a,.ogg"
                onChange={(event) => handlePageAssetUpload(event, 'voice')}
              />
            </span>
          </span>
        </label>
      </div>
    </section>
  )
}
