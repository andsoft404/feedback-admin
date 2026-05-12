import type {
  ComplaintMode,
  PageAssetTarget,
  PageAssetUploadHandler,
  PageContent,
  SelectOption,
  UpdatePage,
} from './types'

type ThanksEditorProps = {
  activeContent: PageContent
  fontOptions: string[]
  requestIconOptions: SelectOption[]
  thanksMode: ComplaintMode
  setThanksMode: (mode: ComplaintMode) => void
  updatePage: UpdatePage
  handlePageAssetUpload: PageAssetUploadHandler
}

export function ThanksEditor({
  activeContent,
  fontOptions,
  requestIconOptions,
  thanksMode,
  setThanksMode,
  updatePage,
  handlePageAssetUpload,
}: ThanksEditorProps) {
  return (
    <>
      <section className="panel complaint-editor-panel" id="thanks-general">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Thanks editor</p>
            <h2>Талархал хэсгийн ерөнхий дэлгэц</h2>
          </div>
          <div className="segmented compact">
            <button
              type="button"
              className={thanksMode === 'organization' ? 'selected' : ''}
              onClick={() => setThanksMode('organization')}
            >
              Байгууллага
            </button>
            <button
              type="button"
              className={thanksMode === 'employee' ? 'selected' : ''}
              onClick={() => setThanksMode('employee')}
            >
              Ажилтан
            </button>
          </div>
        </div>

        <div className="complaint-editor-grid">
          <ColorControl
            label="BG өнгө"
            value={activeContent.background}
            onChange={(value) => updatePage('background', value)}
          />
          <ImageControl
            label="Зарын зураг"
            uploadLabel="Upload banner"
            value={activeContent.image}
            target="image"
            handlePageAssetUpload={handlePageAssetUpload}
            onChange={(value) => updatePage('image', value)}
          />
          <TextControl
            label="Зарын гарчиг"
            value={activeContent.adTitle}
            onChange={(value) => updatePage('adTitle', value)}
          />
          <TextControl
            label="Зарын тайлбар"
            value={activeContent.adSubtitle}
            onChange={(value) => updatePage('adSubtitle', value)}
          />
          <TextControl
            wide
            label="Талархлын хэсэг гарчиг"
            value={activeContent.title}
            onChange={(value) => updatePage('title', value)}
          />
          <SelectControl
            label="Гарчгийн font"
            value={activeContent.titleFont}
            options={fontOptions}
            onChange={(value) => updatePage('titleFont', value)}
          />
          <SelectControl
            label="Үндсэн текст font"
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

          {thanksMode === 'organization' ? (
            <>
              <ImageControl
                label="Байгууллага зураг"
                uploadLabel="Upload image"
                value={activeContent.organizationImage}
                target="organizationImage"
                handlePageAssetUpload={handlePageAssetUpload}
                onChange={(value) => updatePage('organizationImage', value)}
              />
              <TextControl
                label="Байгууллага товч текст"
                value={activeContent.organizationButtonText}
                onChange={(value) => updatePage('organizationButtonText', value)}
              />
              <ColorControl
                label="Байгууллага товчны өнгө"
                value={activeContent.organizationButtonColor}
                onChange={(value) =>
                  updatePage('organizationButtonColor', value)
                }
              />
            </>
          ) : (
            <>
              <ImageControl
                label="Ажилтан зураг"
                uploadLabel="Upload image"
                value={activeContent.employeeImage}
                target="employeeImage"
                handlePageAssetUpload={handlePageAssetUpload}
                onChange={(value) => updatePage('employeeImage', value)}
              />
              <TextControl
                label="Ажилтан товч текст"
                value={activeContent.employeeButtonText}
                onChange={(value) => updatePage('employeeButtonText', value)}
              />
              <ColorControl
                label="Ажилтан товчны өнгө"
                value={activeContent.employeeButtonColor}
                onChange={(value) => updatePage('employeeButtonColor', value)}
              />
            </>
          )}
        </div>
      </section>

      {thanksMode === 'organization' ? (
        <OrganizationThanksEditor
          activeContent={activeContent}
          updatePage={updatePage}
        />
      ) : (
        <EmployeeThanksEditor
          activeContent={activeContent}
          requestIconOptions={requestIconOptions}
          updatePage={updatePage}
          handlePageAssetUpload={handlePageAssetUpload}
        />
      )}
    </>
  )
}

function OrganizationThanksEditor({
  activeContent,
  updatePage,
}: Pick<ThanksEditorProps, 'activeContent' | 'updatePage'>) {
  return (
    <section className="panel complaint-editor-panel" id="thanks-organization">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Organization</p>
        </div>
      </div>

      <div className="complaint-editor-grid">
        <TextControl
          label="Хүсэлт бичих текст"
          value={activeContent.messageTitle}
          onChange={(value) => updatePage('messageTitle', value)}
        />
        <TextControl
          label="Энд бичнэ үү текст"
          value={activeContent.messagePlaceholder}
          onChange={(value) => updatePage('messagePlaceholder', value)}
        />
        <ColorControl
          label="Бичих хэсгийн bg өнгө"
          value={activeContent.textareaBackground}
          onChange={(value) => updatePage('textareaBackground', value)}
        />
        <RatingControls activeContent={activeContent} updatePage={updatePage} />
        <TextControl
          label="Илгээх текст"
          value={activeContent.action}
          onChange={(value) => updatePage('action', value)}
        />
        <ColorControl
          label="Илгээх товчны өнгө"
          value={activeContent.buttonColor}
          onChange={(value) => updatePage('buttonColor', value)}
        />
      </div>
    </section>
  )
}

function EmployeeThanksEditor({
  activeContent,
  requestIconOptions,
  updatePage,
  handlePageAssetUpload,
}: Pick<
  ThanksEditorProps,
  'activeContent' | 'requestIconOptions' | 'updatePage' | 'handlePageAssetUpload'
>) {
  return (
    <section className="panel complaint-editor-panel" id="thanks-employee">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Employee</p>
        </div>
      </div>

      <div className="complaint-editor-grid">
        <TextControl
          wide
          label="Та салбараа сонгоно уу? гарчиг"
          value={activeContent.employeeBranchTitle}
          onChange={(value) => updatePage('employeeBranchTitle', value)}
        />
        <ColorControl
          label="Салбар сонгох bg өнгө"
          value={activeContent.branchPanelBackground}
          onChange={(value) => updatePage('branchPanelBackground', value)}
        />
        <TextControl
          label="Төв салбар товч текст"
          value={activeContent.centralBranchText}
          onChange={(value) => updatePage('centralBranchText', value)}
        />
        <ColorControl
          label="Төв салбар товчны өнгө"
          value={activeContent.centralBranchButtonColor}
          onChange={(value) => updatePage('centralBranchButtonColor', value)}
        />
        <TextControl
          label="Нэгж салбар товч текст"
          value={activeContent.unitBranchText}
          onChange={(value) => updatePage('unitBranchText', value)}
        />
        <ColorControl
          label="Нэгж салбар товчны өнгө"
          value={activeContent.unitBranchButtonColor}
          onChange={(value) => updatePage('unitBranchButtonColor', value)}
        />
        <ImageControl
          label="Салбар зураг"
          uploadLabel="Upload branch"
          value={activeContent.branchImage}
          target="branchImage"
          handlePageAssetUpload={handlePageAssetUpload}
          onChange={(value) => updatePage('branchImage', value)}
        />
        <TextControl
          label="Салбарын нэр"
          value={activeContent.branchName}
          onChange={(value) => updatePage('branchName', value)}
        />
        <TextControl
          label="Сонгох товч текст"
          value={activeContent.chooseButtonText}
          onChange={(value) => updatePage('chooseButtonText', value)}
        />
        <ColorControl
          label="Сонгох товчны өнгө"
          value={activeContent.chooseButtonColor}
          onChange={(value) => updatePage('chooseButtonColor', value)}
        />

        <SelectOptionControl
          label="Icon"
          value={activeContent.nameIcon}
          options={requestIconOptions}
          onChange={(value) => updatePage('nameIcon', value)}
        />
        <TextControl
          label="Ажилтны нэр текст"
          value={activeContent.employeeNameText}
          onChange={(value) => updatePage('employeeNameText', value)}
        />
        <ColorControl
          label="Нэр bg өнгө"
          value={activeContent.inputBackground}
          onChange={(value) => updatePage('inputBackground', value)}
        />
        <ColorControl
          label="Icon bg өнгө"
          value={activeContent.iconBackground}
          onChange={(value) => updatePage('iconBackground', value)}
        />
        <TextControl
          label="Албан тушаал гарчиг"
          value={activeContent.positionTitle}
          onChange={(value) => updatePage('positionTitle', value)}
        />
        <TextControl
          label="Сонгох хэсэг текст"
          value={activeContent.positionPlaceholder}
          onChange={(value) => updatePage('positionPlaceholder', value)}
        />
        <ColorControl
          label="Сонгох хэсэг bg өнгө"
          value={activeContent.positionBackground}
          onChange={(value) => updatePage('positionBackground', value)}
        />
        <TextControl
          label="Дэлгэрэнгүй гарчиг"
          value={activeContent.detailTitle}
          onChange={(value) => updatePage('detailTitle', value)}
        />
        <TextControl
          label="Энд бичнэ үү текст"
          value={activeContent.detailPlaceholder}
          onChange={(value) => updatePage('detailPlaceholder', value)}
        />
        <ColorControl
          label="Дэлгэрэнгүй bg өнгө"
          value={activeContent.textareaBackground}
          onChange={(value) => updatePage('textareaBackground', value)}
        />
        <RatingControls activeContent={activeContent} updatePage={updatePage} />
        <TextControl
          label="Илгээх текст"
          value={activeContent.action}
          onChange={(value) => updatePage('action', value)}
        />
        <ColorControl
          label="Илгээх товчны өнгө"
          value={activeContent.buttonColor}
          onChange={(value) => updatePage('buttonColor', value)}
        />
      </div>
    </section>
  )
}

function RatingControls({
  activeContent,
  updatePage,
}: Pick<ThanksEditorProps, 'activeContent' | 'updatePage'>) {
  return (
    <>
      <label className="field-control">
        <span>Одны тоо</span>
        <input
          type="number"
          min="1"
          max="5"
          value={activeContent.ratingValue}
          onChange={(event) =>
            updatePage('ratingValue', Number(event.target.value))
          }
        />
      </label>
      <ColorControl
        label="Одны өнгө"
        value={activeContent.ratingFilledColor}
        onChange={(value) => updatePage('ratingFilledColor', value)}
      />
      <ColorControl
        label="Хоосон одны өнгө"
        value={activeContent.ratingEmptyColor}
        onChange={(value) => updatePage('ratingEmptyColor', value)}
      />
    </>
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

function ImageControl({
  label,
  uploadLabel,
  value,
  target,
  handlePageAssetUpload,
  onChange,
}: {
  label: string
  uploadLabel: string
  value: string
  target: PageAssetTarget
  handlePageAssetUpload: PageAssetUploadHandler
  onChange: (value: string) => void
}) {
  return (
    <>
      <label className="field-control wide">
        <span>{label} URL</span>
        <input type="text" value={value} onChange={(event) => onChange(event.target.value)} />
      </label>
      <label className="field-control wide">
        <span>{label} upload</span>
        <span className="upload-preview-row">
          <img src={value} alt="" />
          <span className="file-button">
            {uploadLabel}
            <input
              type="file"
              accept="image/*"
              onChange={(event) => handlePageAssetUpload(event, target)}
            />
          </span>
        </span>
      </label>
    </>
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

function SelectOptionControl({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: SelectOption[]
  onChange: (value: string) => void
}) {
  return (
    <label className="field-control">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
