import type { ChangeEvent } from 'react'

export type PageKey =
  | 'settings'
  | 'loading'
  | 'intro'
  | 'avatar'
  | 'menu'
  | 'request'
  | 'complaint'
  | 'thanks'
  | 'success'

export type ThemeConfig = {
  primary: string
  secondary: string
  accent: string
  surface: string
  text: string
  muted: string
  font: string
  siteBackground: string
  radius: number
  depth: number
  density: 'compact' | 'comfortable'
}

export type MenuCard = {
  id: string
  image: string
  buttonText: string
  buttonColor: string
  textColor: string
  font: string
}

export type PageContent = {
  title: string
  subtitle: string
  action: string
  secondaryAction: string
  helper: string
  background: string
  accent: string
  surface: string
  text: string
  font: string
  titleFont: string
  bodyFont: string
  actionFont: string
  promptFont: string
  radius: number
  depth: number
  density: 'compact' | 'comfortable'
  image: string
  cardBackground: string
  imageBackground: string
  logo: string
  promptText: string
  voice: string
  buttonColor: string
  secondaryButtonColor: string
  nameIcon: string
  phoneIcon: string
  iconBackground: string
  inputBackground: string
  textareaBackground: string
  organizationImage: string
  employeeImage: string
  organizationButtonColor: string
  employeeButtonColor: string
  organizationButtonText: string
  employeeButtonText: string
  organizationFormTitle: string
  employeeFormTitle: string
  employeeBranchTitle: string
  centralBranchText: string
  unitBranchText: string
  centralBranchButtonColor: string
  unitBranchButtonColor: string
  branchPanelBackground: string
  branchImage: string
  branchName: string
  chooseButtonText: string
  chooseButtonColor: string
  positionTitle: string
  positionPlaceholder: string
  positionBackground: string
  detailTitle: string
  detailPlaceholder: string
  attachmentLabel: string
  attachText: string
  attachBackground: string
  organizationNameText: string
  organizationPhoneText: string
  employeeNameText: string
  employeePhoneText: string
  messageTitle: string
  messagePlaceholder: string
  ratingValue: number
  ratingFilledColor: string
  ratingEmptyColor: string
  avatars: string[]
  adTitle: string
  adSubtitle: string
  menuCards: MenuCard[]
}

export type FieldItem = {
  id: number
  label: string
  placeholder: string
  type: 'text' | 'phone' | 'textarea' | 'select' | 'rating' | 'file'
  required: boolean
}

export type PageAssetTarget =
  | 'image'
  | 'logo'
  | 'voice'
  | 'organizationImage'
  | 'employeeImage'
  | 'branchImage'

export type MediaAssetTarget = 'logo' | 'avatar' | 'cover'

export type SelectOption = {
  value: string
  label: string
}

export type ComplaintMode = 'organization' | 'employee'

export type UpdatePage = <Key extends keyof PageContent>(
  key: Key,
  value: PageContent[Key],
) => void

export type UpdateFieldByIndex = <Key extends keyof FieldItem>(
  index: number,
  key: Key,
  value: FieldItem[Key],
) => void

export type UpdateMenuCard = <Key extends keyof MenuCard>(
  id: string,
  key: Key,
  value: MenuCard[Key],
) => void

export type PageAssetUploadHandler = (
  event: ChangeEvent<HTMLInputElement>,
  target: PageAssetTarget,
) => void

export type AdItem = {
  id: number
  label: string
  title: string
  range: string
  action: string
  image: string
  gradient: string
}

export type MediaConfig = {
  logo: string
  avatar: string
  cover: string
  profileName: string
}

export type AdminConfig = {
  theme: ThemeConfig
  navigation: Record<PageKey, string>
  pages: Record<PageKey, PageContent>
  ads: AdItem[]
  fields: FieldItem[]
  pageFields: Record<PageKey, FieldItem[]>
  media: MediaConfig
}

export type PageVisual = Pick<
  PageContent,
  | 'secondaryAction'
  | 'background'
  | 'accent'
  | 'surface'
  | 'text'
  | 'font'
  | 'titleFont'
  | 'bodyFont'
  | 'actionFont'
  | 'promptFont'
  | 'radius'
  | 'depth'
  | 'density'
  | 'image'
  | 'cardBackground'
  | 'imageBackground'
  | 'logo'
  | 'promptText'
  | 'voice'
  | 'buttonColor'
  | 'secondaryButtonColor'
  | 'nameIcon'
  | 'phoneIcon'
  | 'iconBackground'
  | 'inputBackground'
  | 'textareaBackground'
  | 'organizationImage'
  | 'employeeImage'
  | 'organizationButtonColor'
  | 'employeeButtonColor'
  | 'organizationButtonText'
  | 'employeeButtonText'
  | 'organizationFormTitle'
  | 'employeeFormTitle'
  | 'employeeBranchTitle'
  | 'centralBranchText'
  | 'unitBranchText'
  | 'centralBranchButtonColor'
  | 'unitBranchButtonColor'
  | 'branchPanelBackground'
  | 'branchImage'
  | 'branchName'
  | 'chooseButtonText'
  | 'chooseButtonColor'
  | 'positionTitle'
  | 'positionPlaceholder'
  | 'positionBackground'
  | 'detailTitle'
  | 'detailPlaceholder'
  | 'attachmentLabel'
  | 'attachText'
  | 'attachBackground'
  | 'organizationNameText'
  | 'organizationPhoneText'
  | 'employeeNameText'
  | 'employeePhoneText'
  | 'messageTitle'
  | 'messagePlaceholder'
  | 'ratingValue'
  | 'ratingFilledColor'
  | 'ratingEmptyColor'
  | 'avatars'
  | 'adTitle'
  | 'adSubtitle'
  | 'menuCards'
>

export type PageCopy = Pick<PageContent, 'title' | 'subtitle' | 'action' | 'helper'>
