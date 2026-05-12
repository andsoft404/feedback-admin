import type { FieldItem, PageAssetUploadHandler, PageContent, SelectOption, UpdateFieldByIndex, UpdatePage } from './types'

type RequestEditorProps = {
  activeContent: PageContent
  fontOptions: string[]
  requestIconOptions: SelectOption[]
  requestNameField?: FieldItem
  requestPhoneField?: FieldItem
  requestMessageField?: FieldItem
  updatePage: UpdatePage
  updateActiveFieldByIndex: UpdateFieldByIndex
  handlePageAssetUpload: PageAssetUploadHandler
}

export function RequestEditor({
  activeContent,
  fontOptions,
  requestIconOptions,
  requestNameField,
  requestPhoneField,
  requestMessageField,
  updatePage,
  updateActiveFieldByIndex,
  handlePageAssetUpload,
}: RequestEditorProps) {
  return (
    <section className="panel request-editor-panel" id="request">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Request editor</p>
          <h2>Хүсэлт хэсгийн засвар</h2>
        </div>
      </div>

      <div className="request-editor-grid">
        <label className="color-control">
          <span>BG өнгө</span>
          <input
            type="color"
            value={activeContent.background}
            onChange={(event) => updatePage('background', event.target.value)}
          />
          <code>{activeContent.background}</code>
        </label>
        <label className="color-control">
          <span>Icon арын bg өнгө</span>
          <input
            type="color"
            value={activeContent.iconBackground}
            onChange={(event) =>
              updatePage('iconBackground', event.target.value)
            }
          />
          <code>{activeContent.iconBackground}</code>
        </label>
        <label className="field-control">
          <span>Нэр icon</span>
          <select
            value={activeContent.nameIcon}
            onChange={(event) => updatePage('nameIcon', event.target.value)}
          >
            {requestIconOptions.map((icon) => (
              <option key={icon.value} value={icon.value}>
                {icon.label}
              </option>
            ))}
          </select>
        </label>
        <label className="field-control">
          <span>Утас icon</span>
          <select
            value={activeContent.phoneIcon}
            onChange={(event) => updatePage('phoneIcon', event.target.value)}
          >
            {requestIconOptions.map((icon) => (
              <option key={icon.value} value={icon.value}>
                {icon.label}
              </option>
            ))}
          </select>
        </label>

        <label className="field-control wide">
          <span>Зарын зураг URL</span>
          <input
            type="text"
            value={activeContent.image}
            onChange={(event) => updatePage('image', event.target.value)}
          />
        </label>
        <label className="field-control wide">
          <span>Зарын зураг upload</span>
          <span className="upload-preview-row">
            <img src={activeContent.image} alt="" />
            <span className="file-button">
              Upload banner
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handlePageAssetUpload(event, 'image')}
              />
            </span>
          </span>
        </label>
        <label className="field-control">
          <span>Зарын гарчиг</span>
          <input
            type="text"
            value={activeContent.adTitle}
            onChange={(event) => updatePage('adTitle', event.target.value)}
          />
        </label>
        <label className="field-control">
          <span>Зарын тайлбар</span>
          <input
            type="text"
            value={activeContent.adSubtitle}
            onChange={(event) => updatePage('adSubtitle', event.target.value)}
          />
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

        <label className="field-control">
          <span>Таны нэр текст</span>
          <input
            type="text"
            value={requestNameField?.label ?? ''}
            onChange={(event) =>
              updateActiveFieldByIndex(0, 'label', event.target.value)
            }
          />
        </label>
        <label className="field-control">
          <span>Холбогдох утас текст</span>
          <input
            type="text"
            value={requestPhoneField?.label ?? ''}
            onChange={(event) =>
              updateActiveFieldByIndex(1, 'label', event.target.value)
            }
          />
        </label>
        <label className="color-control">
          <span>Нэр/утас bg өнгө</span>
          <input
            type="color"
            value={activeContent.inputBackground}
            onChange={(event) =>
              updatePage('inputBackground', event.target.value)
            }
          />
          <code>{activeContent.inputBackground}</code>
        </label>
        <label className="field-control">
          <span>Input font</span>
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
          <span>Хүсэлт бичих текст</span>
          <input
            type="text"
            value={requestMessageField?.label ?? ''}
            onChange={(event) =>
              updateActiveFieldByIndex(2, 'label', event.target.value)
            }
          />
        </label>
        <label className="field-control">
          <span>Хүсэлтээ бичнэ үү текст</span>
          <input
            type="text"
            value={requestMessageField?.placeholder ?? ''}
            onChange={(event) =>
              updateActiveFieldByIndex(2, 'placeholder', event.target.value)
            }
          />
        </label>
        <label className="color-control">
          <span>Хүсэлт бичих bg өнгө</span>
          <input
            type="color"
            value={activeContent.textareaBackground}
            onChange={(event) =>
              updatePage('textareaBackground', event.target.value)
            }
          />
          <code>{activeContent.textareaBackground}</code>
        </label>
        <label className="color-control">
          <span>Товчны өнгө</span>
          <input
            type="color"
            value={activeContent.buttonColor}
            onChange={(event) => updatePage('buttonColor', event.target.value)}
          />
          <code>{activeContent.buttonColor}</code>
        </label>

        <label className="field-control wide">
          <span>Илгээх текст</span>
          <input
            type="text"
            value={activeContent.action}
            onChange={(event) => updatePage('action', event.target.value)}
          />
        </label>
      </div>
    </section>
  )
}
