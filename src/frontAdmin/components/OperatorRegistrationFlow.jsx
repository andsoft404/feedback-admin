import React, { useState } from 'react';
import {
  ArrowLeft,
  Building,
  FileText,
  Paperclip,
  Phone,
  Send,
  Star,
  Upload,
  User,
} from 'lucide-react';
import { loadConfig } from '../../config';
import { BRANCHES } from '../data';
import { createFeedbackRequest } from '../../services/adminApi';

const pageTypeLabels = {
  request: 'Хүсэлт',
  complaint: 'Гомдол',
  thanks: 'Талархал',
};

const operatorBranchFallbackImages = [
  'https://images.unsplash.com/photo-1448375240586-882707db888b?w=720&h=720&fit=crop',
  'https://picsum.photos/id/634/720/720',
  'https://picsum.photos/id/228/720/720',
  'https://picsum.photos/id/661/720/720',
];

const createEmptyForm = () => ({
  name: '',
  phone: '',
  message: '',
  employeeName: '',
  branch: BRANCHES[0],
  branchKind: 'central',
  position: '',
  fileName: '',
  rating: 3,
  branchImageIndex: 0,
  confirmedBranchImageIndex: null,
});

const buildPreviewStyle = (config, activeContent, operatorBackground) => ({
  '--admin-bg': config.theme.siteBackground,
  '--admin-teal': config.theme.primary,
  '--preview-primary': operatorBackground,
  '--preview-secondary': activeContent.accent,
  '--preview-accent': activeContent.accent,
  '--preview-surface': activeContent.surface,
  '--preview-card': activeContent.cardBackground,
  '--preview-button': activeContent.buttonColor,
  '--preview-icon-bg': activeContent.iconBackground,
  '--preview-input-bg': activeContent.inputBackground,
  '--preview-textarea-bg': activeContent.textareaBackground,
  '--preview-attach-bg': activeContent.attachBackground,
  '--preview-branch-bg': activeContent.branchPanelBackground,
  '--preview-position-bg': activeContent.positionBackground,
  '--preview-text': activeContent.text,
  '--preview-muted': config.theme.muted,
  '--preview-radius': `${activeContent.radius}px`,
  '--preview-depth': `${activeContent.depth / 100}`,
  '--preview-font': `'${activeContent.font}'`,
  '--preview-title-font': `'${activeContent.titleFont}'`,
  '--preview-body-font': `'${activeContent.bodyFont}'`,
  '--preview-action-font': `'${activeContent.actionFont}'`,
  '--preview-prompt-font': `'${activeContent.promptFont}'`,
});

export default function OperatorRegistrationFlow({ setRequests, onSubmitted }) {
  const [config] = useState(() => loadConfig());
  const [screen, setScreen] = useState('menu');
  const [targetMode, setTargetMode] = useState('organization');
  const [form, setForm] = useState(() => createEmptyForm());
  const [formError, setFormError] = useState('');

  const activeContent = config.pages[screen === 'menu' ? 'menu' : screen];
  const operatorBackground =
    config.pages.menu?.background || config.theme.primary || '#0048BA';
  const pageFields = config.pageFields?.[screen] || [];

  const updateForm = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (formError) setFormError('');
  };

  const openScreen = (nextScreen) => {
    setScreen(nextScreen);
    setTargetMode('organization');
    setForm(createEmptyForm());
    setFormError('');
  };

  const goBack = () => {
    setScreen('menu');
    setTargetMode('organization');
    setForm(createEmptyForm());
    setFormError('');
  };

  const submitOperatorRequest = async () => {
    const type = pageTypeLabels[screen];
    const isEmployeeTarget =
      (screen === 'complaint' || screen === 'thanks') && targetMode === 'employee';
    const currentDate =
      new Date().toLocaleDateString('en-CA') +
      ' ' +
      new Date().toLocaleTimeString('mn-MN', {
        hour: '2-digit',
        minute: '2-digit',
      });
    const needsContactPhone = screen === 'request' || screen === 'complaint';
    const needsContactName =
      screen === 'request' || (screen === 'complaint' && targetMode === 'organization');

    if (needsContactName && !form.name.trim()) {
      setFormError('Таны нэрийг заавал оруулна уу.');
      return;
    }

    if (needsContactPhone && form.phone.length !== 8) {
      setFormError('Холбогдох утас яг 8 оронтой тоо байх ёстой.');
      return;
    }

    if (!form.message.trim()) {
      setFormError('Дэлгэрэнгүй мэдээллээ бичнэ үү.');
      return;
    }

    const newRequest = {
      id: Date.now(),
      user: form.name.trim() || 'Оператор бүртгэл',
      phone: form.phone.trim() || '-',
      type,
      desc:
        form.message.trim() ||
        `${type} оператороор бүртгэгдсэн.`,
      branch: isEmployeeTarget ? form.branch : BRANCHES[0],
      status: 'Pending',
      created_at: currentDate,
      assigned_at: null,
      resolved_at: null,
      isDirect: false,
      isOperator: true,
      resolution: '',
      targetType: isEmployeeTarget ? 'Employee' : 'Organization',
      employeeName: isEmployeeTarget ? form.employeeName.trim() : null,
      rating: screen === 'thanks' ? form.rating : 0,
      file: form.fileName || null,
      recipient: form.position || null,
    };

    try {
      const savedRequest = await createFeedbackRequest(newRequest);
      setRequests((current) => [savedRequest, ...current]);
    } catch (error) {
      console.error('Failed to persist operator request', error);
      setRequests((current) => [newRequest, ...current]);
    }
    goBack();
    onSubmitted?.();
  };

  return (
    <section
      className="operator-flow-shell"
      style={buildPreviewStyle(config, activeContent, operatorBackground)}
    >
      {screen === 'menu' ? (
        <MenuStep activeContent={activeContent} onSelect={openScreen} />
      ) : screen === 'request' ? (
        <RequestStep
          activeContent={activeContent}
          fields={pageFields}
          form={form}
          updateForm={updateForm}
          formError={formError}
          onBack={goBack}
          onSubmit={submitOperatorRequest}
        />
      ) : (
        <FeedbackStep
          activeContent={activeContent}
          screen={screen}
          targetMode={targetMode}
          setTargetMode={setTargetMode}
          form={form}
          updateForm={updateForm}
          formError={formError}
          onBack={goBack}
          onSubmit={submitOperatorRequest}
        />
      )}
    </section>
  );
}

function MenuStep({ activeContent, onSelect }) {
  const cards = (activeContent.menuCards || []).filter((card) =>
    ['request', 'complaint', 'thanks'].includes(card.id),
  );

  return (
    <section className="menu-preview-screen operator-menu-step">
      <h3 className="menu-preview-prompt">{activeContent.promptText}</h3>

      <section className="menu-preview-cards">
        {cards.map((card) => (
          <article
            className="menu-preview-card operator-menu-card"
            key={card.id}
            onClick={() => onSelect(card.id)}
          >
            <img src={card.image} alt="" />
            <button
              type="button"
              style={{
                backgroundColor: card.buttonColor,
                color: card.textColor,
                fontFamily: `'${card.font}', system-ui, sans-serif`,
              }}
            >
              {card.buttonText}
            </button>
          </article>
        ))}
      </section>
    </section>
  );
}

function RequestStep({
  activeContent,
  fields,
  form,
  updateForm,
  formError,
  onBack,
  onSubmit,
}) {
  const nameField = fields[0];
  const phoneField = fields[1];
  const messageField = fields[2];

  return (
    <section className="request-preview-screen operator-form-step">
      <OperatorTopbar onBack={onBack} />

      <div className="request-preview-body operator-request-body">
        <section className="request-form-preview operator-request-form">
          <h3>{activeContent.title}</h3>

          <OperatorPillInput
            icon={<User />}
            type="name"
            value={form.name}
            onChange={(value) => updateForm('name', value)}
            placeholder={`${nameField?.label || activeContent.organizationNameText} ...`}
          />
          <OperatorPillInput
            icon={<Phone />}
            type="phone"
            value={form.phone}
            onChange={(value) => updateForm('phone', value)}
            placeholder={`${phoneField?.label || activeContent.organizationPhoneText} ...`}
          />

          <OperatorTextarea
            title={messageField?.label || activeContent.messageTitle}
            value={form.message}
            onChange={(value) => updateForm('message', value)}
            placeholder={messageField?.placeholder || activeContent.messagePlaceholder}
          />

          <OperatorWarning message={formError} />

          <button className="request-submit" type="button" onClick={onSubmit}>
            <Send size={17} /> {activeContent.action}
          </button>
        </section>
      </div>
    </section>
  );
}

function FeedbackStep({
  activeContent,
  screen,
  targetMode,
  setTargetMode,
  form,
  updateForm,
  formError,
  onBack,
  onSubmit,
}) {
  const isThanks = screen === 'thanks';

  return (
    <section
      className={`complaint-preview-screen operator-form-step ${
        isThanks ? 'thanks-preview-screen' : ''
      }`}
    >
      <OperatorTopbar onBack={onBack} />

      <div
        className={`complaint-preview-body operator-feedback-body ${
          isThanks ? 'operator-thanks-body' : 'operator-stacked-body'
        }`}
      >
        <aside className="complaint-preview-left operator-choice-only">
          <h3 className="complaint-choice-title">{activeContent.title}</h3>
          <section className="complaint-choice-grid">
            <ChoiceCard
              selected={targetMode === 'organization'}
              image={activeContent.organizationImage}
              label={activeContent.organizationButtonText}
              color={activeContent.organizationButtonColor}
              onClick={() => setTargetMode('organization')}
            />
            <ChoiceCard
              selected={targetMode === 'employee'}
              image={activeContent.employeeImage}
              label={activeContent.employeeButtonText}
              color={activeContent.employeeButtonColor}
              onClick={() => setTargetMode('employee')}
            />
          </section>
        </aside>

        {targetMode === 'organization' ? (
            <OrganizationForm
            activeContent={activeContent}
            isThanks={isThanks}
            form={form}
            updateForm={updateForm}
            formError={formError}
            onSubmit={onSubmit}
          />
        ) : (
          <EmployeeForm
            activeContent={activeContent}
            isThanks={isThanks}
            form={form}
            updateForm={updateForm}
            formError={formError}
            onSubmit={onSubmit}
          />
        )}
      </div>
    </section>
  );
}

function ChoiceCard({ selected, image, label, color, onClick }) {
  return (
    <article className={`complaint-choice-card ${selected ? 'selected' : ''}`}>
      <img src={image} alt="" />
      <button type="button" onClick={onClick} style={{ backgroundColor: color }}>
        {label}
      </button>
    </article>
  );
}

function OrganizationForm({ activeContent, isThanks, form, updateForm, formError, onSubmit }) {
  return (
    <section
      className={`complaint-form-panel ${
        isThanks ? 'thanks-form-panel' : ''
      }`}
    >
      {!isThanks && (
        <>
          <OperatorPillInput
            icon={<User />}
            type="name"
            value={form.name}
            onChange={(value) => updateForm('name', value)}
            placeholder={`${activeContent.organizationNameText} ...`}
          />
          <OperatorPillInput
            icon={<Phone />}
            type="phone"
            value={form.phone}
            onChange={(value) => updateForm('phone', value)}
            placeholder={`${activeContent.organizationPhoneText} ...`}
          />
        </>
      )}

      <OperatorTextarea
        title={activeContent.messageTitle}
        value={form.message}
        onChange={(value) => updateForm('message', value)}
        placeholder={activeContent.messagePlaceholder}
      />

      {isThanks ? (
        <RatingInput
          value={form.rating}
          onChange={(value) => updateForm('rating', value)}
          activeContent={activeContent}
        />
      ) : (
        <AttachmentInput activeContent={activeContent} form={form} updateForm={updateForm} />
      )}

      <OperatorWarning message={formError} />

      <button className="request-submit complaint-submit" type="button" onClick={onSubmit}>
        <Send size={17} /> {activeContent.action}
      </button>
    </section>
  );
}

function EmployeeForm({ activeContent, isThanks, form, updateForm, formError, onSubmit }) {
  const branchImages = [
    activeContent.branchImage,
    ...operatorBranchFallbackImages,
  ].filter(Boolean);
  const branchIndex = form.branchImageIndex || 0;
  const currentBranchImage = branchImages[branchIndex % branchImages.length];
  const currentBranchName =
    branchIndex === 0 ? activeContent.branchName : `Салбар ${branchIndex + 1}`;

  const chooseCentral = () => {
    updateForm('branchKind', 'central');
    updateForm('branch', activeContent.centralBranchText || BRANCHES[0]);
    updateForm('confirmedBranchImageIndex', null);
  };

  const chooseUnit = () => {
    updateForm('branchKind', 'unit');
    updateForm('branch', currentBranchName || BRANCHES[0]);
    updateForm('confirmedBranchImageIndex', branchIndex);
  };

  const changeBranchImage = (direction) => {
    const nextIndex =
      (branchIndex + direction + branchImages.length) % branchImages.length;
    updateForm('branchImageIndex', nextIndex);
    updateForm('branchKind', 'unit');
    updateForm('confirmedBranchImageIndex', null);
    updateForm(
      'branch',
      nextIndex === 0 ? activeContent.branchName : `Салбар ${nextIndex + 1}`,
    );
  };

  return (
    <section
      className={`complaint-form-panel employee ${
        isThanks ? 'thanks-form-panel' : ''
      }`}
    >
      <div className="complaint-branch-panel">
        <strong>{activeContent.employeeBranchTitle}</strong>
        <div className="complaint-branch-tabs">
          <button
            type="button"
            className={form.branchKind === 'central' ? 'selected' : ''}
            onClick={chooseCentral}
            style={{ backgroundColor: activeContent.centralBranchButtonColor }}
          >
            {activeContent.centralBranchText}
          </button>
          <button
            type="button"
            className={form.branchKind === 'unit' ? 'selected' : ''}
            onClick={chooseUnit}
            style={{ backgroundColor: activeContent.centralBranchButtonColor }}
          >
            {activeContent.unitBranchText}
          </button>
        </div>
        <div className="complaint-branch-carousel operator-branch-carousel">
          <button
            type="button"
            aria-label="Previous branch"
            onClick={() => changeBranchImage(-1)}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div
            className={`complaint-branch-card ${
              form.confirmedBranchImageIndex === branchIndex ? 'selected' : ''
            }`}
          >
            <img src={currentBranchImage} alt={currentBranchName} />
            <button
              type="button"
              onClick={chooseUnit}
              style={{ backgroundColor: activeContent.chooseButtonColor }}
            >
              {form.confirmedBranchImageIndex === branchIndex
                ? 'Сонгогдсон'
                : activeContent.chooseButtonText}
            </button>
          </div>
          <button
            type="button"
            aria-label="Next branch"
            onClick={() => changeBranchImage(1)}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
        <span>{form.branchKind === 'unit' ? form.branch : currentBranchName}</span>
      </div>

      <OperatorPillInput
        icon={<User />}
        type="name"
        value={form.employeeName}
        onChange={(value) => updateForm('employeeName', value)}
        placeholder={activeContent.employeeNameText}
      />

      {!isThanks && (
        <OperatorPillInput
          icon={<Phone />}
          type="phone"
          value={form.phone}
          onChange={(value) => updateForm('phone', value)}
          placeholder={`${activeContent.employeePhoneText} ...`}
        />
      )}

      <label className="complaint-select-preview">
        <span>{activeContent.positionTitle}</span>
        <select
          value={form.position}
          onChange={(event) => updateForm('position', event.target.value)}
          className="operator-select-input"
        >
          <option value="">{activeContent.positionPlaceholder}</option>
          <option value="Теллер">Теллер</option>
          <option value="Менежер">Менежер</option>
          <option value="Зөвлөх">Зөвлөх</option>
        </select>
      </label>

      <OperatorTextarea
        title={activeContent.detailTitle}
        value={form.message}
        onChange={(value) => updateForm('message', value)}
        placeholder={activeContent.detailPlaceholder}
      />

      {isThanks ? (
        <RatingInput
          value={form.rating}
          onChange={(value) => updateForm('rating', value)}
          activeContent={activeContent}
        />
      ) : (
        <AttachmentInput activeContent={activeContent} form={form} updateForm={updateForm} />
      )}

      <OperatorWarning message={formError} />

      <button className="request-submit complaint-submit" type="button" onClick={onSubmit}>
        <Send size={17} /> {activeContent.action}
      </button>
    </section>
  );
}

function OperatorTopbar({ onBack }) {
  return (
    <div className="operator-flow-topbar">
      <button type="button" className="operator-back-button" onClick={onBack}>
        <ArrowLeft size={18} /> Буцах
      </button>
    </div>
  );
}

function sanitizeInputValue(type, value) {
  if (type === 'phone') return value.replace(/\D/g, '').slice(0, 8);
  if (type === 'name') return value.replace(/[0-9]/g, '');
  return value;
}

function isInputComplete(type, value) {
  if (type === 'phone') return /^\d{8}$/.test(value);
  if (type === 'name') return value.trim().length > 0;
  return value.trim().length > 0;
}

function OperatorPillInput({ icon, type = 'text', value, onChange, placeholder }) {
  const isComplete = isInputComplete(type, value);

  return (
    <div className="request-field-row">
      <span className={`request-field-icon ${isComplete ? 'complete' : ''}`}>
        {isComplete ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          icon
        )}
      </span>
      <span className="request-input-pill">
        <input
          type={type === 'phone' ? 'tel' : 'text'}
          value={value}
          onChange={(event) => onChange(sanitizeInputValue(type, event.target.value))}
          inputMode={type === 'phone' ? 'numeric' : undefined}
          maxLength={type === 'phone' ? 8 : undefined}
          pattern={type === 'phone' ? '[0-9]{8}' : undefined}
          placeholder={placeholder}
          className="operator-pill-input"
        />
      </span>
    </div>
  );
}

function OperatorWarning({ message }) {
  if (!message) return null;

  return (
    <div className="operator-form-warning">
      <span>!</span>
      <p>{message}</p>
    </div>
  );
}

function OperatorTextarea({ title, value, onChange, placeholder }) {
  return (
    <div className="request-textarea-card">
      <strong>{title}</strong>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="operator-textarea-input"
      />
    </div>
  );
}

function AttachmentInput({ activeContent, form, updateForm }) {
  return (
    <>
      <strong className="complaint-attach-label">{activeContent.attachmentLabel}</strong>
      <label className="complaint-attach-pill operator-file-pill">
        <Paperclip size={16} />
        <span>{form.fileName || activeContent.attachText}</span>
        <input
          type="file"
          onChange={(event) =>
            updateForm('fileName', event.target.files?.[0]?.name || '')
          }
        />
      </label>
    </>
  );
}

function RatingInput({ value, onChange, activeContent }) {
  const filledStarColor = '#FFD84D';
  const emptyStarColor = '#6FA0DD';

  return (
    <div className="thanks-rating-row operator-rating-row" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= value;

        return (
          <button
            type="button"
            key={star}
            onClick={() => onChange(star)}
            style={{
              color: isFilled ? filledStarColor : emptyStarColor,
            }}
          >
            <Star size={38} fill={isFilled ? 'currentColor' : 'none'} />
          </button>
        );
      })}
    </div>
  );
}
