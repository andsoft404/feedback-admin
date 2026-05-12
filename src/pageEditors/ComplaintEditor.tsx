import type { ComplaintMode, PageAssetUploadHandler, PageContent, SelectOption, UpdatePage } from './types'

type ComplaintEditorProps = {
  activeContent: PageContent
  complaintMode: ComplaintMode
  requestIconOptions: SelectOption[]
  setComplaintMode: (mode: ComplaintMode) => void
  updatePage: UpdatePage
  handlePageAssetUpload: PageAssetUploadHandler
}

export function ComplaintEditor({
  activeContent,
  complaintMode,
  requestIconOptions,
  setComplaintMode,
  updatePage,
  handlePageAssetUpload,
}: ComplaintEditorProps) {
  return (
    <>
      <section className="panel complaint-editor-panel" id="complaint-general">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Complaint editor</p>
            <h2>Гомдол хэсгийн ерөнхий дэлгэц</h2>
          </div>
          <div className="segmented compact">
            <button
              type="button"
              className={complaintMode === 'organization' ? 'selected' : ''}
              onClick={() => setComplaintMode('organization')}
            >
              Байгууллага
            </button>
            <button
              type="button"
              className={complaintMode === 'employee' ? 'selected' : ''}
              onClick={() => setComplaintMode('employee')}
            >
              Ажилтан
            </button>
          </div>
        </div>

        <div className="complaint-editor-grid">
          <label className="color-control">
            <span>BG өнгө</span>
            <input
              type="color"
              value={activeContent.background}
              onChange={(event) => updatePage('background', event.target.value)}
            />
            <code>{activeContent.background}</code>
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
            <span>Гомдлын хэсэг гарчиг</span>
            <input
              type="text"
              value={activeContent.title}
              onChange={(event) => updatePage('title', event.target.value)}
            />
          </label>

          {complaintMode === 'organization' && (
          <>
          <label className="field-control wide">
            <span>Байгууллага зураг URL</span>
            <input
              type="text"
              value={activeContent.organizationImage}
              onChange={(event) =>
                updatePage('organizationImage', event.target.value)
              }
            />
          </label>
          <label className="field-control wide">
            <span>Байгууллага зураг upload</span>
            <span className="upload-preview-row">
              <img src={activeContent.organizationImage} alt="" />
              <span className="file-button">
                Upload image
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    handlePageAssetUpload(event, 'organizationImage')
                  }
                />
              </span>
            </span>
          </label>
          <label className="field-control">
            <span>Байгууллага товчны текст</span>
            <input
              type="text"
              value={activeContent.organizationButtonText}
              onChange={(event) =>
                updatePage('organizationButtonText', event.target.value)
              }
            />
          </label>
          <label className="color-control">
            <span>Байгууллага товчны өнгө</span>
            <input
              type="color"
              value={activeContent.organizationButtonColor}
              onChange={(event) =>
                updatePage('organizationButtonColor', event.target.value)
              }
            />
            <code>{activeContent.organizationButtonColor}</code>
          </label>
          </>
          )}

          {complaintMode === 'employee' && (
          <>
          <label className="field-control wide">
            <span>Ажилтан зураг URL</span>
            <input
              type="text"
              value={activeContent.employeeImage}
              onChange={(event) =>
                updatePage('employeeImage', event.target.value)
              }
            />
          </label>
          <label className="field-control wide">
            <span>Ажилтан зураг upload</span>
            <span className="upload-preview-row">
              <img src={activeContent.employeeImage} alt="" />
              <span className="file-button">
                Upload image
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    handlePageAssetUpload(event, 'employeeImage')
                  }
                />
              </span>
            </span>
          </label>
          <label className="field-control">
            <span>Ажилтан товчны текст</span>
            <input
              type="text"
              value={activeContent.employeeButtonText}
              onChange={(event) =>
                updatePage('employeeButtonText', event.target.value)
              }
            />
          </label>
          <label className="color-control">
            <span>Ажилтан товчны өнгө</span>
            <input
              type="color"
              value={activeContent.employeeButtonColor}
              onChange={(event) =>
                updatePage('employeeButtonColor', event.target.value)
              }
            />
            <code>{activeContent.employeeButtonColor}</code>
          </label>
          </>
          )}
        </div>
      </section>

      {complaintMode === 'organization' && (
      <section className="panel complaint-editor-panel" id="complaint-organization">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Organization</p>
            <h2>Байгууллага хэсэг</h2>
          </div>
        </div>

        <div className="complaint-editor-grid">
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
            <span>Таны нэр текст</span>
            <input
              type="text"
              value={activeContent.organizationNameText}
              onChange={(event) =>
                updatePage('organizationNameText', event.target.value)
              }
            />
          </label>
          <label className="field-control">
            <span>Холбогдох утас текст</span>
            <input
              type="text"
              value={activeContent.organizationPhoneText}
              onChange={(event) =>
                updatePage('organizationPhoneText', event.target.value)
              }
            />
          </label>
          <label className="field-control">
            <span>Хүсэлт бичих гарчиг</span>
            <input
              type="text"
              value={activeContent.messageTitle}
              onChange={(event) => updatePage('messageTitle', event.target.value)}
            />
          </label>
          <label className="field-control">
            <span>Хүсэлт бичих placeholder</span>
            <input
              type="text"
              value={activeContent.messagePlaceholder}
              onChange={(event) =>
                updatePage('messagePlaceholder', event.target.value)
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
          <label className="field-control">
            <span>Хавсралтын гарчиг</span>
            <input
              type="text"
              value={activeContent.attachmentLabel}
              onChange={(event) =>
                updatePage('attachmentLabel', event.target.value)
              }
            />
          </label>
          <label className="field-control">
            <span>Attach текст</span>
            <input
              type="text"
              value={activeContent.attachText}
              onChange={(event) => updatePage('attachText', event.target.value)}
            />
          </label>
          <label className="color-control">
            <span>Attach bg өнгө</span>
            <input
              type="color"
              value={activeContent.attachBackground}
              onChange={(event) =>
                updatePage('attachBackground', event.target.value)
              }
            />
            <code>{activeContent.attachBackground}</code>
          </label>
          <label className="field-control">
            <span>Илгээх текст</span>
            <input
              type="text"
              value={activeContent.action}
              onChange={(event) => updatePage('action', event.target.value)}
            />
          </label>
          <label className="color-control">
            <span>Илгээх товчны өнгө</span>
            <input
              type="color"
              value={activeContent.buttonColor}
              onChange={(event) => updatePage('buttonColor', event.target.value)}
            />
            <code>{activeContent.buttonColor}</code>
          </label>
        </div>
      </section>
      )}

      {complaintMode === 'employee' && (
      <section className="panel complaint-editor-panel" id="complaint-employee">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Employee</p>
            <h2>Ажилтан хэсэг</h2>
          </div>
        </div>

        <div className="complaint-editor-grid">
          <label className="field-control wide">
            <span>Та салбараа сонгоно уу? гарчиг</span>
            <input
              type="text"
              value={activeContent.employeeBranchTitle}
              onChange={(event) =>
                updatePage('employeeBranchTitle', event.target.value)
              }
            />
          </label>
          <label className="color-control">
            <span>Салбар сонгох bg өнгө</span>
            <input
              type="color"
              value={activeContent.branchPanelBackground}
              onChange={(event) =>
                updatePage('branchPanelBackground', event.target.value)
              }
            />
            <code>{activeContent.branchPanelBackground}</code>
          </label>
          <label className="field-control">
            <span>Төв салбар текст</span>
            <input
              type="text"
              value={activeContent.centralBranchText}
              onChange={(event) =>
                updatePage('centralBranchText', event.target.value)
              }
            />
          </label>
          <label className="color-control">
            <span>Төв салбар товчны өнгө</span>
            <input
              type="color"
              value={activeContent.centralBranchButtonColor}
              onChange={(event) =>
                updatePage('centralBranchButtonColor', event.target.value)
              }
            />
            <code>{activeContent.centralBranchButtonColor}</code>
          </label>
          <label className="field-control">
            <span>Нэгж салбар текст</span>
            <input
              type="text"
              value={activeContent.unitBranchText}
              onChange={(event) =>
                updatePage('unitBranchText', event.target.value)
              }
            />
          </label>
          <label className="color-control">
            <span>Нэгж салбар товчны өнгө</span>
            <input
              type="color"
              value={activeContent.unitBranchButtonColor}
              onChange={(event) =>
                updatePage('unitBranchButtonColor', event.target.value)
              }
            />
            <code>{activeContent.unitBranchButtonColor}</code>
          </label>
          <label className="field-control wide">
            <span>Салбар зураг URL</span>
            <input
              type="text"
              value={activeContent.branchImage}
              onChange={(event) => updatePage('branchImage', event.target.value)}
            />
          </label>
          <label className="field-control wide">
            <span>Салбар зураг upload</span>
            <span className="upload-preview-row">
              <img src={activeContent.branchImage} alt="" />
              <span className="file-button">
                Upload branch
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    handlePageAssetUpload(event, 'branchImage')
                  }
                />
              </span>
            </span>
          </label>
          <label className="field-control">
            <span>Салбарын нэр</span>
            <input
              type="text"
              value={activeContent.branchName}
              onChange={(event) => updatePage('branchName', event.target.value)}
            />
          </label>
          <label className="field-control">
            <span>Сонгох товч текст</span>
            <input
              type="text"
              value={activeContent.chooseButtonText}
              onChange={(event) =>
                updatePage('chooseButtonText', event.target.value)
              }
            />
          </label>
          <label className="color-control">
            <span>Сонгох товч өнгө</span>
            <input
              type="color"
              value={activeContent.chooseButtonColor}
              onChange={(event) =>
                updatePage('chooseButtonColor', event.target.value)
              }
            />
            <code>{activeContent.chooseButtonColor}</code>
          </label>

          <label className="field-control">
            <span>Ажилтны нэр текст</span>
            <input
              type="text"
              value={activeContent.employeeNameText}
              onChange={(event) =>
                updatePage('employeeNameText', event.target.value)
              }
            />
          </label>
          <label className="field-control">
            <span>Холбогдох утас текст</span>
            <input
              type="text"
              value={activeContent.employeePhoneText}
              onChange={(event) =>
                updatePage('employeePhoneText', event.target.value)
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
            <span>Icon</span>
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
            <span>Албан тушаал гарчиг</span>
            <input
              type="text"
              value={activeContent.positionTitle}
              onChange={(event) => updatePage('positionTitle', event.target.value)}
            />
          </label>
          <label className="field-control">
            <span>Сонгох хэсэг текст</span>
            <input
              type="text"
              value={activeContent.positionPlaceholder}
              onChange={(event) =>
                updatePage('positionPlaceholder', event.target.value)
              }
            />
          </label>
          <label className="color-control">
            <span>Сонгох хэсэг bg өнгө</span>
            <input
              type="color"
              value={activeContent.positionBackground}
              onChange={(event) =>
                updatePage('positionBackground', event.target.value)
              }
            />
            <code>{activeContent.positionBackground}</code>
          </label>
          <label className="field-control">
            <span>Дэлгэрэнгүй гарчиг</span>
            <input
              type="text"
              value={activeContent.detailTitle}
              onChange={(event) => updatePage('detailTitle', event.target.value)}
            />
          </label>
          <label className="field-control">
            <span>Энд бичнэ үү текст</span>
            <input
              type="text"
              value={activeContent.detailPlaceholder}
              onChange={(event) =>
                updatePage('detailPlaceholder', event.target.value)
              }
            />
          </label>
          <label className="color-control">
            <span>Дэлгэрэнгүй bg өнгө</span>
            <input
              type="color"
              value={activeContent.textareaBackground}
              onChange={(event) =>
                updatePage('textareaBackground', event.target.value)
              }
            />
            <code>{activeContent.textareaBackground}</code>
          </label>
          <label className="field-control">
            <span>Хавсралтын гарчиг</span>
            <input
              type="text"
              value={activeContent.attachmentLabel}
              onChange={(event) =>
                updatePage('attachmentLabel', event.target.value)
              }
            />
          </label>
          <label className="field-control">
            <span>Attach текст</span>
            <input
              type="text"
              value={activeContent.attachText}
              onChange={(event) => updatePage('attachText', event.target.value)}
            />
          </label>
          <label className="color-control">
            <span>Attach bg өнгө</span>
            <input
              type="color"
              value={activeContent.attachBackground}
              onChange={(event) =>
                updatePage('attachBackground', event.target.value)
              }
            />
            <code>{activeContent.attachBackground}</code>
          </label>
          <label className="field-control">
            <span>Илгээх текст</span>
            <input
              type="text"
              value={activeContent.action}
              onChange={(event) => updatePage('action', event.target.value)}
            />
          </label>
          <label className="color-control">
            <span>Илгээх товчны өнгө</span>
            <input
              type="color"
              value={activeContent.buttonColor}
              onChange={(event) => updatePage('buttonColor', event.target.value)}
            />
            <code>{activeContent.buttonColor}</code>
          </label>
        </div>
      </section>
      )}
    </>
  )
}
