import type { ChangeEvent } from 'react'
import type { PageAssetUploadHandler, PageContent, UpdateMenuCard, UpdatePage } from './types'

type MenuEditorProps = {
  activeContent: PageContent
  fontOptions: string[]
  updatePage: UpdatePage
  updateMenuCard: UpdateMenuCard
  handlePageAssetUpload: PageAssetUploadHandler
  handleMenuCardImageUpload: (
    event: ChangeEvent<HTMLInputElement>,
    id: string,
  ) => void
}

export function MenuEditor({
  activeContent,
  fontOptions,
  updatePage,
  updateMenuCard,
  handlePageAssetUpload,
  handleMenuCardImageUpload,
}: MenuEditorProps) {
  return (
    <section className="panel menu-editor-panel" id="menu">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Menu editor</p>
          <h2>Menu дэлгэцийн хэсгүүд</h2>
        </div>
      </div>

      <div className="intro-editor-grid">
        <label className="color-control">
          <span>Background өнгө</span>
          <input
            type="color"
            value={activeContent.background}
            onChange={(event) => updatePage('background', event.target.value)}
          />
          <code>{activeContent.background}</code>
        </label>
        <label className="field-control">
          <span>Prompt font</span>
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
          <span>Сонголтын текст</span>
          <input
            type="text"
            value={activeContent.promptText}
            onChange={(event) => updatePage('promptText', event.target.value)}
          />
        </label>
      </div>

      <div className="menu-card-editor-list">
        {activeContent.menuCards.map((card) => (
          <article className="menu-card-editor" key={card.id}>
            <img src={card.image} alt="" />
            <div className="menu-card-editor-fields">
              <div className="menu-card-editor-top">
                <label className="field-control">
                  <span>Зураг URL</span>
                  <input
                    type="text"
                    value={card.image}
                    onChange={(event) =>
                      updateMenuCard(card.id, 'image', event.target.value)
                    }
                  />
                </label>
                <label className="field-control">
                  <span>Зураг upload</span>
                  <span className="file-button">
                    Upload image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        handleMenuCardImageUpload(event, card.id)
                      }
                    />
                  </span>
                </label>
              </div>
              <div className="menu-card-editor-bottom">
                <label className="field-control">
                  <span>Товчны текст</span>
                  <input
                    type="text"
                    value={card.buttonText}
                    onChange={(event) =>
                      updateMenuCard(card.id, 'buttonText', event.target.value)
                    }
                  />
                </label>
                <label className="field-control">
                  <span>Товчны font</span>
                  <select
                    value={card.font}
                    onChange={(event) =>
                      updateMenuCard(card.id, 'font', event.target.value)
                    }
                  >
                    {fontOptions.map((font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="color-control">
                  <span>Товчны өнгө</span>
                  <input
                    type="color"
                    value={card.buttonColor}
                    onChange={(event) =>
                      updateMenuCard(card.id, 'buttonColor', event.target.value)
                    }
                  />
                  <code>{card.buttonColor}</code>
                </label>
                <label className="color-control">
                  <span>Үсгийн өнгө</span>
                  <input
                    type="color"
                    value={card.textColor}
                    onChange={(event) =>
                      updateMenuCard(card.id, 'textColor', event.target.value)
                    }
                  />
                  <code>{card.textColor}</code>
                </label>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
