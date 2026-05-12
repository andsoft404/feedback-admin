import type { AdItem, FieldItem, PageAssetUploadHandler, PageContent, UpdatePage } from '../types'

type GenericEditorProps = {
  activeContent: PageContent
  activeFields: FieldItem[]
  activePageLabel: string
  ads: AdItem[]
  configJson: string
  copied: boolean
  fieldTypes: FieldItem['type'][]
  fontOptions: string[]
  showsAdPreview: boolean
  showsFormFields: boolean
  updatePage: UpdatePage
  updateAd: <Key extends keyof AdItem>(id: number, key: Key, value: AdItem[Key]) => void
  updateField: <Key extends keyof FieldItem>(
    id: number,
    key: Key,
    value: FieldItem[Key],
  ) => void
  addAd: () => void
  removeAd: (id: number) => void
  addField: () => void
  removeField: (id: number) => void
  copyConfig: () => void
  handlePageAssetUpload: PageAssetUploadHandler
}

export function GenericEditor({
  activeContent,
  activeFields,
  activePageLabel,
  ads,
  configJson,
  copied,
  fieldTypes,
  fontOptions,
  showsAdPreview,
  showsFormFields,
  updatePage,
  updateAd,
  updateField,
  addAd,
  removeAd,
  addField,
  removeField,
  copyConfig,
  handlePageAssetUpload,
}: GenericEditorProps) {
  return (
    <>
    <section className="panel content-panel" id="content">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Content</p>
          <h2>{activePageLabel} хуудасны текст</h2>
        </div>
      </div>

      <div className="page-editor-note">
        <strong>{activePageLabel}</strong>
        <span>{activeContent.helper}</span>
      </div>

      <div className="content-editor">
        <label className="field-control wide">
          <span>Гарчиг</span>
          <input
            type="text"
            value={activeContent.title}
            onChange={(event) => updatePage('title', event.target.value)}
          />
        </label>
        <label className="field-control wide">
          <span>Тайлбар</span>
          <textarea
            rows={3}
            value={activeContent.subtitle}
            onChange={(event) => updatePage('subtitle', event.target.value)}
          />
        </label>
        <label className="field-control">
          <span>Button text</span>
          <input
            type="text"
            value={activeContent.action}
            onChange={(event) => updatePage('action', event.target.value)}
          />
        </label>
        <label className="field-control">
          <span>Admin note</span>
          <input
            type="text"
            value={activeContent.helper}
            onChange={(event) => updatePage('helper', event.target.value)}
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
          <span>Тайлбарын font</span>
          <select
            value={activeContent.bodyFont}
            onChange={(event) => updatePage('bodyFont', event.target.value)}
          >
            {fontOptions.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </label>
        <label className="field-control">
          <span>Button font</span>
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
      </div>
    </section>

    <section className="panel" id="appearance">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Appearance</p>
          <h2>{activePageLabel} хуудасны дизайн</h2>
        </div>
        <div className="segmented density-control">
          <button
            type="button"
            className={activeContent.density === 'compact' ? 'selected' : ''}
            onClick={() => updatePage('density', 'compact')}
          >
            Compact
          </button>
          <button
            type="button"
            className={
              activeContent.density === 'comfortable' ? 'selected' : ''
            }
            onClick={() => updatePage('density', 'comfortable')}
          >
            Comfort
          </button>
        </div>
      </div>

      <div className="control-grid colors">
        <label className="color-control">
          <span>Background</span>
          <input
            type="color"
            value={activeContent.background}
            onChange={(event) => updatePage('background', event.target.value)}
          />
          <code>{activeContent.background}</code>
        </label>
        <label className="color-control">
          <span>Accent</span>
          <input
            type="color"
            value={activeContent.accent}
            onChange={(event) => updatePage('accent', event.target.value)}
          />
          <code>{activeContent.accent}</code>
        </label>
        <label className="color-control">
          <span>Surface</span>
          <input
            type="color"
            value={activeContent.surface}
            onChange={(event) => updatePage('surface', event.target.value)}
          />
          <code>{activeContent.surface}</code>
        </label>
        <label className="color-control">
          <span>Text</span>
          <input
            type="color"
            value={activeContent.text}
            onChange={(event) => updatePage('text', event.target.value)}
          />
          <code>{activeContent.text}</code>
        </label>
      </div>

      <div className="control-grid">
        <label className="field-control">
          <span>Font</span>
          <select
            value={activeContent.font}
            onChange={(event) => updatePage('font', event.target.value)}
          >
            {fontOptions.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </label>
        <label className="field-control">
          <span>Page image URL</span>
          <input
            type="text"
            value={activeContent.image}
            onChange={(event) => updatePage('image', event.target.value)}
          />
        </label>
        <label className="range-control">
          <span>Radius {activeContent.radius}px</span>
          <input
            type="range"
            min="12"
            max="36"
            value={activeContent.radius}
            onChange={(event) =>
              updatePage('radius', Number(event.target.value))
            }
          />
        </label>
        <label className="range-control">
          <span>Depth {activeContent.depth}%</span>
          <input
            type="range"
            min="20"
            max="100"
            value={activeContent.depth}
            onChange={(event) =>
              updatePage('depth', Number(event.target.value))
            }
          />
        </label>
      </div>
    </section>

    <section className="panel" id="media">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Media</p>
          <h2>{activePageLabel} хуудасны зураг</h2>
        </div>
      </div>

      <div className="media-grid single">
        <div className="media-tile page-media-tile">
          <img src={activeContent.image} alt={`${activePageLabel} preview`} />
          <div>
            <strong>{activePageLabel} image</strong>
            <label className="file-button">
              Upload
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handlePageAssetUpload(event, 'image')}
              />
            </label>
          </div>
          <input
            type="text"
            value={activeContent.image}
            onChange={(event) => updatePage('image', event.target.value)}
            aria-label={`${activePageLabel} image URL`}
          />
        </div>
      </div>
    </section>

    {showsAdPreview && (
    <section className="panel" id="ads">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Ads</p>
          <h2>Зарын carousel засах</h2>
        </div>
        <button type="button" className="icon-button text" onClick={addAd}>
          + Add
        </button>
      </div>

      <div className="ad-list">
        {ads.map((ad) => (
          <article className="ad-editor" key={ad.id}>
            <img src={ad.image} alt="" />
            <div className="ad-fields">
              <input
                value={ad.label}
                onChange={(event) =>
                  updateAd(ad.id, 'label', event.target.value)
                }
                aria-label="Ad label"
              />
              <input
                value={ad.title}
                onChange={(event) =>
                  updateAd(ad.id, 'title', event.target.value)
                }
                aria-label="Ad title"
              />
              <input
                value={ad.range}
                onChange={(event) =>
                  updateAd(ad.id, 'range', event.target.value)
                }
                aria-label="Ad range"
              />
              <input
                value={ad.image}
                onChange={(event) =>
                  updateAd(ad.id, 'image', event.target.value)
                }
                aria-label="Ad image"
              />
            </div>
            <button
              type="button"
              className="icon-button danger"
              onClick={() => removeAd(ad.id)}
              aria-label="Remove ad"
              title="Remove ad"
            >
              ×
            </button>
          </article>
        ))}
      </div>
    </section>
    )}

    {showsFormFields && (
    <section className="panel" id="forms">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Forms</p>
          <h2>Талбарууд засах</h2>
        </div>
        <button type="button" className="icon-button text" onClick={addField}>
          + Add
        </button>
      </div>

      <div className="field-table">
        {activeFields.map((field) => (
          <div className="field-row" key={field.id}>
            <input
              value={field.label}
              onChange={(event) =>
                updateField(field.id, 'label', event.target.value)
              }
              aria-label="Field label"
            />
            <input
              value={field.placeholder}
              onChange={(event) =>
                updateField(field.id, 'placeholder', event.target.value)
              }
              aria-label="Field placeholder"
            />
            <select
              value={field.type}
              onChange={(event) =>
                updateField(
                  field.id,
                  'type',
                  event.target.value as FieldItem['type'],
                )
              }
              aria-label="Field type"
            >
              {fieldTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <label className="toggle">
              <input
                type="checkbox"
                checked={field.required}
                onChange={(event) =>
                  updateField(field.id, 'required', event.target.checked)
                }
              />
              <span />
              Required
            </label>
            <button
              type="button"
              className="icon-button danger"
              onClick={() => removeField(field.id)}
              aria-label="Remove field"
              title="Remove field"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </section>
    )}

    <section className="panel export-panel" id="export">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Export</p>
          <h2>Config JSON</h2>
        </div>
        <button type="button" className="icon-button text" onClick={copyConfig}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre>{configJson}</pre>
    </section>
    </>
  )
}
