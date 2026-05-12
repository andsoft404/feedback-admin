import { useEffect, useMemo, useState } from 'react'
import type { ChangeEvent, CSSProperties } from 'react'
import {
  adPages,
  createDefaultConfig,
  formPages,
  loadConfig,
  pageOrder,
  storageKey,
} from '../config'
import { saveSiteConfig } from '../services/adminApi'
import type {
  AdItem,
  AdminConfig,
  FieldItem,
  MediaAssetTarget,
  MenuCard,
  PageAssetTarget,
  PageContent,
  PageKey,
  ThemeConfig,
  MediaConfig,
} from '../types'

export type PreviewMode = 'desktop' | 'tablet' | 'phone'

export function useAdminStudio() {
  const [config, setConfig] = useState<AdminConfig>(() => loadConfig())
  const [activePage, setActivePage] = useState<PageKey>('request')
  const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop')
  const [complaintMode, setComplaintMode] = useState<'organization' | 'employee'>(
    'organization',
  )
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(config))
  }, [config])

  useEffect(() => {
    const hasSession = Boolean(window.sessionStorage.getItem('web-admin-session'))
    if (!hasSession) return

    const timer = window.setTimeout(() => {
      saveSiteConfig(config).catch((error) => {
        console.error('Failed to publish admin config', error)
      })
    }, 650)

    return () => window.clearTimeout(timer)
  }, [config])

  const activeContent = config.pages[activePage]
  const activeFields = config.pageFields[activePage] ?? []
  const activePageFallback =
    pageOrder.find((page) => page.key === activePage) ?? pageOrder[0]
  const activePageMeta = {
    ...activePageFallback,
    label: config.navigation[activePage] ?? activePageFallback.label,
  }
  const activePageNumber = pageOrder.findIndex((page) => page.key === activePage) + 1
  const showsFormFields = formPages.includes(activePage)
  const showsAdPreview = adPages.includes(activePage)
  const configJson = useMemo(() => JSON.stringify(config, null, 2), [config])
  const lastSaved = new Intl.DateTimeFormat('mn-MN', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date())

  const updatePage = <Key extends keyof PageContent>(
    key: Key,
    value: PageContent[Key],
  ) => {
    setConfig((current) => ({
      ...current,
      pages: {
        ...current.pages,
        [activePage]: { ...current.pages[activePage], [key]: value },
      },
    }))
  }

  const updateTheme = <Key extends keyof ThemeConfig>(
    key: Key,
    value: ThemeConfig[Key],
  ) => {
    setConfig((current) => ({
      ...current,
      theme: { ...current.theme, [key]: value },
    }))
  }

  const updateNavigation = (key: PageKey, value: string) => {
    setConfig((current) => ({
      ...current,
      navigation: { ...current.navigation, [key]: value },
    }))
  }

  const updateMedia = <Key extends keyof MediaConfig>(
    key: Key,
    value: MediaConfig[Key],
  ) => {
    setConfig((current) => ({
      ...current,
      media: { ...current.media, [key]: value },
    }))
  }

  const updateAd = <Key extends keyof AdItem>(
    id: number,
    key: Key,
    value: AdItem[Key],
  ) => {
    setConfig((current) => ({
      ...current,
      ads: current.ads.map((ad) => (ad.id === id ? { ...ad, [key]: value } : ad)),
    }))
  }

  const updateField = <Key extends keyof FieldItem>(
    id: number,
    key: Key,
    value: FieldItem[Key],
  ) => {
    setConfig((current) => ({
      ...current,
      pageFields: {
        ...current.pageFields,
        [activePage]: (current.pageFields[activePage] ?? []).map((field) =>
          field.id === id ? { ...field, [key]: value } : field,
        ),
      },
    }))
  }

  const addAd = () => {
    setConfig((current) => ({
      ...current,
      ads: [
        ...current.ads,
        {
          id: Date.now(),
          label: 'Шинэ',
          title: 'Шинэ зарын гарчиг',
          range: 'Дүн / нөхцөл',
          action: 'Дэлгэрэнгүй',
          image:
            'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=720&h=720&fit=crop',
          gradient: current.theme.primary,
        },
      ],
    }))
  }

  const removeAd = (id: number) => {
    setConfig((current) => ({
      ...current,
      ads: current.ads.filter((ad) => ad.id !== id),
    }))
  }

  const addField = () => {
    setConfig((current) => ({
      ...current,
      pageFields: {
        ...current.pageFields,
        [activePage]: [
          ...(current.pageFields[activePage] ?? []),
          {
            id: Date.now(),
            label: 'Шинэ талбар',
            placeholder: 'Утга оруулах ...',
            type: 'text',
            required: false,
          },
        ],
      },
    }))
  }

  const removeField = (id: number) => {
    setConfig((current) => ({
      ...current,
      pageFields: {
        ...current.pageFields,
        [activePage]: (current.pageFields[activePage] ?? []).filter(
          (field) => field.id !== id,
        ),
      },
    }))
  }

  const handlePageAssetUpload = (
    event: ChangeEvent<HTMLInputElement>,
    target: PageAssetTarget,
  ) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => updatePage(target, String(reader.result))
    reader.readAsDataURL(file)
    event.target.value = ''
  }

  const handleMediaAssetUpload = (
    event: ChangeEvent<HTMLInputElement>,
    target: MediaAssetTarget,
  ) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => updateMedia(target, String(reader.result))
    reader.readAsDataURL(file)
    event.target.value = ''
  }

  const handleAvatarUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      updatePage('avatars', [...activeContent.avatars, String(reader.result)])
    }
    reader.readAsDataURL(file)
    event.target.value = ''
  }

  const updateAvatar = (index: number, value: string) => {
    updatePage(
      'avatars',
      activeContent.avatars.map((avatar, avatarIndex) =>
        avatarIndex === index ? value : avatar,
      ),
    )
  }

  const removeAvatar = (index: number) => {
    const nextAvatars = activeContent.avatars.filter(
      (_avatar, avatarIndex) => avatarIndex !== index,
    )

    updatePage('avatars', nextAvatars.length ? nextAvatars : [activeContent.image])
  }

  const updateMenuCard = <Key extends keyof MenuCard>(
    id: string,
    key: Key,
    value: MenuCard[Key],
  ) => {
    updatePage(
      'menuCards',
      activeContent.menuCards.map((card) =>
        card.id === id ? { ...card, [key]: value } : card,
      ),
    )
  }

  const handleMenuCardImageUpload = (
    event: ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => updateMenuCard(id, 'image', String(reader.result))
    reader.readAsDataURL(file)
    event.target.value = ''
  }

  const copyConfig = async () => {
    try {
      await navigator.clipboard.writeText(configJson)
      setCopied(true)
    } catch {
      setCopied(false)
    }
    window.setTimeout(() => setCopied(false), 1400)
  }

  const saveDraft = async () => {
    window.localStorage.setItem(storageKey, JSON.stringify(config))
    try {
      await saveSiteConfig(config)
      setSaved(true)
      window.setTimeout(() => setSaved(false), 1400)
    } catch (error) {
      console.error('Failed to save admin config', error)
    }
  }

  const resetDraft = () => {
    setConfig(createDefaultConfig())
    setActivePage('request')
  }

  const previewStyle = {
    '--admin-bg': config.theme.siteBackground,
    '--admin-teal': config.theme.primary,
    '--preview-primary': activeContent.background,
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
  } as CSSProperties

  const updateActiveFieldByIndex = <Key extends keyof FieldItem>(
    index: number,
    key: Key,
    value: FieldItem[Key],
  ) => {
    const field = activeFields[index]

    if (field) {
      updateField(field.id, key, value)
    }
  }

  const formScreenClass = [
    'form-screen',
    activePage === 'loading' ? 'loading-form-screen' : '',
    activePage === 'intro' ? 'intro-form-screen' : '',
    activePage === 'settings' ? 'settings-form-screen' : '',
    activePage === 'success' ? 'success-form-screen' : '',
    activePage === 'request' ? 'request-form-screen' : '',
    activePage === 'complaint' || activePage === 'thanks' ? 'complaint-form-screen' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return {
    activeContent,
    activeFields,
    activePage,
    activePageMeta,
    activePageNumber,
    addAd,
    addField,
    complaintMode,
    config,
    configJson,
    copied,
    copyConfig,
    formScreenClass,
    handleAvatarUpload,
    handleMediaAssetUpload,
    handleMenuCardImageUpload,
    handlePageAssetUpload,
    lastSaved,
    previewMode,
    previewStyle,
    removeAd,
    removeAvatar,
    removeField,
    requestMessageField: activeFields[2],
    requestNameField: activeFields[0],
    requestPhoneField: activeFields[1],
    resetDraft,
    saveDraft,
    saved,
    setActivePage,
    setComplaintMode,
    setPreviewMode,
    showsAdPreview,
    showsFormFields,
    updateActiveFieldByIndex,
    updateAd,
    updateAvatar,
    updateField,
    updateMedia,
    updateMenuCard,
    updateNavigation,
    updatePage,
    updateTheme,
  }
}

export type AdminStudioState = ReturnType<typeof useAdminStudio>
