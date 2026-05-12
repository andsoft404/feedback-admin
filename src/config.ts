import type { AdminConfig, FieldItem, PageContent, PageKey } from './types'

export const storageKey = 'neumorphism-form-admin-draft'

export const pageOrder: Array<{ key: PageKey; label: string }> = [
  { key: 'settings', label: 'Тохиргоо' },
  { key: 'loading', label: 'Loading' },
  { key: 'intro', label: 'Intro' },
  { key: 'avatar', label: 'Avatar' },
  { key: 'menu', label: 'Menu' },
  { key: 'request', label: 'Хүсэлт' },
  { key: 'complaint', label: 'Гомдол' },
  { key: 'thanks', label: 'Талархал' },
  { key: 'success', label: 'Success' },
]

export const formPages: PageKey[] = ['request', 'complaint', 'thanks']
export const adPages: PageKey[] = ['menu', 'request', 'complaint', 'thanks']

export const createDefaultNavigation = (): Record<PageKey, string> =>
  Object.fromEntries(pageOrder.map(({ key, label }) => [key, label])) as Record<
    PageKey,
    string
  >

type PageVisual = Pick<
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

type PageCopy = Pick<PageContent, 'title' | 'subtitle' | 'action' | 'helper'>

export const fontOptions = [
  'Poppins',
  'Montserrat',
  'Open Sans',
  'Inter',
  'Arial',
  'Tahoma',
]

export const fieldTypes: FieldItem['type'][] = [
  'text',
  'phone',
  'textarea',
  'select',
  'rating',
  'file',
]

export const defaultPageVisual: PageVisual = {
  secondaryAction: 'Нүүр хуудас руу зочлох',
  background: '#0048BA',
  accent: '#00B2E7',
  surface: '#EEF2F6',
  text: '#132238',
  font: 'Poppins',
  titleFont: 'Montserrat',
  bodyFont: 'Poppins',
  actionFont: 'Open Sans',
  promptFont: 'Poppins',
  radius: 22,
  depth: 64,
  density: 'comfortable',
  image:
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&h=720&fit=crop',
  cardBackground: '#F8FAFC',
  imageBackground: '#EEF2F6',
  logo: '/neumorphism/bichil_logo.png',
  promptText: 'Дараад үргэлжлүүлнэ үү',
  voice: '/neumorphism/robot-voice.mp3',
  buttonColor: '#FFFFFF',
  secondaryButtonColor: '#22C55E',
  nameIcon: 'user',
  phoneIcon: 'phone',
  iconBackground: '#8F98A5',
  inputBackground: '#A7AFBA',
  textareaBackground: '#EEF2F6',
  organizationImage:
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=720&h=720&fit=crop',
  employeeImage:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=720&h=720&fit=crop',
  organizationButtonColor: '#FFFFFF',
  employeeButtonColor: '#FFFFFF',
  organizationButtonText: 'Байгууллага',
  employeeButtonText: 'Ажилтан',
  organizationFormTitle: 'Байгууллагад илгээх гомдол',
  employeeFormTitle: 'Ажилтанд илгээх гомдол',
  employeeBranchTitle: 'Та салбараа сонгоно уу?',
  centralBranchText: 'Төв салбар',
  unitBranchText: 'Нэгж салбар',
  centralBranchButtonColor: '#FFFFFF',
  unitBranchButtonColor: '#6FA0DD',
  branchPanelBackground: '#0A55BF',
  branchImage:
    'https://images.unsplash.com/photo-1448375240586-882707db888b?w=720&h=720&fit=crop',
  branchName: 'Салбар 1',
  chooseButtonText: 'Сонгох',
  chooseButtonColor: '#FFFFFF',
  positionTitle: 'Албан тушаал',
  positionPlaceholder: 'Сонгох',
  positionBackground: '#FFFFFF',
  detailTitle: 'Дэлгэрэнгүй',
  detailPlaceholder: 'Энд бичнэ үү ...',
  attachmentLabel: 'Холбогдох баримт, зураг хавсаргах:',
  attachText: 'Attach:',
  attachBackground: '#A7AFBA',
  organizationNameText: 'Таны нэр',
  organizationPhoneText: 'Холбогдох утас',
  employeeNameText: 'Ажилтны нэр ... (Заавал биш)',
  employeePhoneText: 'Холбогдох утас',
  messageTitle: 'Хүсэлт бичих',
  messagePlaceholder: 'Энд бичнэ үү ...',
  ratingValue: 3,
  ratingFilledColor: '#FFD84D',
  ratingEmptyColor: '#6FA0DD',
  avatars: [
    '/neumorphism/character/1.png',
    '/neumorphism/character/2.webp',
    '/neumorphism/character/3.webp',
  ],
  adTitle: 'Даатгал',
  adSubtitle: 'Эрүүл мэндийн даатгал хямд үнээр',
  menuCards: [
    {
      id: 'request',
      image:
        'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=720&h=480&fit=crop',
      buttonText: 'Хүсэлт илгээх',
      buttonColor: '#FFFFFF',
      textColor: '#111827',
      font: 'Poppins',
    },
    {
      id: 'complaint',
      image:
        'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=720&h=480&fit=crop',
      buttonText: 'Гомдол илгээх',
      buttonColor: '#FFFFFF',
      textColor: '#111827',
      font: 'Poppins',
    },
    {
      id: 'thanks',
      image:
        'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=720&h=480&fit=crop',
      buttonText: 'Талархал илгээх',
      buttonColor: '#FFFFFF',
      textColor: '#111827',
      font: 'Poppins',
    },
  ],
}

const pageVisualOverrides: Partial<Record<PageKey, Partial<PageVisual>>> = {
  loading: {
    background: '#0048BA',
    cardBackground: '#F8FAFC',
    imageBackground: '#EEF2F7',
    image: '/neumorphism/loading.gif',
    titleFont: 'Montserrat',
    bodyFont: 'Poppins',
    promptFont: 'Poppins',
  },
  intro: {
    background: '#0048BA',
    image: '/neumorphism/voice.gif',
    cardBackground: '#F8FAFC',
    logo: '/neumorphism/bichil_logo.png',
    promptText: 'Дараад үргэлжлүүлнэ үү',
    voice: '/neumorphism/robot-voice.mp3',
  },
  avatar: {
    image: '/neumorphism/character/1.png',
    background: '#FFFFFF',
    cardBackground: '#2FB67C',
    accent: '#FFFFFF',
    buttonColor: '#FFFFFF',
    logo: '/neumorphism/bichil_logo.png',
    promptText: 'Та өөрийнхөө нууц дүрийг сонгоорой',
    avatars: [
      '/neumorphism/character/1.png',
      '/neumorphism/character/2.webp',
      '/neumorphism/character/3.webp',
      '/neumorphism/character/4.png',
      '/neumorphism/character/5.png',
      '/neumorphism/character/6.png',
      '/neumorphism/character/7.png',
    ],
  },
  menu: {
    background: '#0048BA',
    image:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=520&fit=crop',
    logo: '/neumorphism/bichil_logo.png',
    promptText: 'Та доорх цэсээс сонголтоо хийнэ үү',
    buttonColor: '#FFFFFF',
    adTitle: 'Даатгал',
    adSubtitle: 'Эрүүл мэндийн даатгал хямд үнээр',
  },
  request: {
    background: '#0048BA',
    image:
      'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=1200&h=620&fit=crop',
    cardBackground: '#FFFFFF',
    titleFont: 'Montserrat',
    bodyFont: 'Poppins',
    actionFont: 'Poppins',
    buttonColor: '#3F63DF',
    inputBackground: '#A7AFBA',
    textareaBackground: '#EEF2F6',
    iconBackground: '#8F98A5',
    nameIcon: 'user',
    phoneIcon: 'phone',
    adTitle: 'ББСБ',
    adSubtitle: 'Хэрэглээний зээл хялбар нөхцөлөөр',
  },
  complaint: {
    background: '#0048BA',
    image:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=620&fit=crop',
    cardBackground: '#FFFFFF',
    titleFont: 'Montserrat',
    bodyFont: 'Poppins',
    actionFont: 'Poppins',
    buttonColor: '#3F63DF',
    inputBackground: '#A7AFBA',
    textareaBackground: '#EEF2F6',
    iconBackground: '#8F98A5',
    nameIcon: 'user',
    phoneIcon: 'phone',
    adTitle: 'Даатгал',
    adSubtitle: 'Эрүүл мэндийн даатгал хямд үнээр',
    organizationImage:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=720&h=720&fit=crop',
    employeeImage:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=720&h=720&fit=crop',
    organizationButtonColor: '#FFFFFF',
    employeeButtonColor: '#6FA0DD',
    organizationButtonText: 'Байгууллага',
    employeeButtonText: 'Ажилтан',
    organizationFormTitle: 'Байгууллагад илгээх гомдол',
    employeeFormTitle: 'Ажилтанд илгээх гомдол',
    messageTitle: 'Хүсэлт бичих',
    messagePlaceholder: 'Энд бичнэ үү ...',
  },
  thanks: {
    background: '#0048BA',
    image:
      'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=1200&h=620&fit=crop',
    cardBackground: '#FFFFFF',
    titleFont: 'Montserrat',
    bodyFont: 'Poppins',
    actionFont: 'Poppins',
    buttonColor: '#3F63DF',
    inputBackground: '#A7AFBA',
    textareaBackground: '#EEF2F6',
    iconBackground: '#8F98A5',
    nameIcon: 'user',
    phoneIcon: 'phone',
    adTitle: 'ХАДГАЛАМЖ',
    adSubtitle: 'Хугацаатай хадгаламж өндөр хүүтэй',
    organizationImage:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=720&h=720&fit=crop',
    employeeImage:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=720&h=720&fit=crop',
    organizationButtonColor: '#FFFFFF',
    employeeButtonColor: '#6FA0DD',
    organizationButtonText: 'Байгууллага',
    employeeButtonText: 'Ажилтан',
    organizationFormTitle: 'Байгууллагад илгээх талархал',
    employeeFormTitle: 'Ажилтанд илгээх талархал',
    employeeBranchTitle: 'Та салбараа сонгоно уу?',
    employeeNameText: 'Ажилтны нэр ... (Заавал биш)',
    positionTitle: 'Албан тушаал',
    positionPlaceholder: 'Сонгох',
    messageTitle: 'Хүсэлт бичих',
    messagePlaceholder: 'Энд бичнэ үү ...',
    detailTitle: 'Дэлгэрэнгүй',
    detailPlaceholder: 'Энд бичнэ үү ...',
    ratingValue: 3,
    ratingFilledColor: '#FFD84D',
    ratingEmptyColor: '#6FA0DD',
  },
  success: {
    background: '#0048BA',
    cardBackground: '#F8FAFC',
    imageBackground: '#EEF2F6',
    image: '/neumorphism/character/3.webp',
    logo: '/neumorphism/bichil_logo.png',
    buttonColor: '#0048BA',
    secondaryButtonColor: '#22C55E',
    secondaryAction: 'Нүүр хуудас руу зочлох',
  },
}

const withPageDefaults = (
  pages: Record<PageKey, PageCopy>,
): Record<PageKey, PageContent> =>
  Object.fromEntries(
    pageOrder.map(({ key }) => [
      key,
      {
        ...defaultPageVisual,
        ...pageVisualOverrides[key],
        ...pages[key],
      },
    ]),
  ) as Record<PageKey, PageContent>

export const createDefaultConfig = (): AdminConfig => ({
  theme: {
    primary: '#0048BA',
    secondary: '#0A50BF',
    accent: '#00B2E7',
    surface: '#EEF2F6',
    text: '#132238',
    muted: '#6E7A8A',
    font: 'Poppins',
    siteBackground: '#EEF3F1',
    radius: 22,
    depth: 64,
    density: 'comfortable',
  },
  navigation: createDefaultNavigation(),
  media: {
    logo: '/neumorphism/bichil_logo.png',
    avatar: '/neumorphism/character-1.png',
    cover:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&h=720&fit=crop',
    profileName: 'Админ',
  },
  pages: withPageDefaults({
    settings: {
      title: 'Админы тохиргоо',
      subtitle: 'Лого болон сайтын ерөнхий өнгийг засна.',
      action: 'Хадгалах',
      helper: 'Глобал лого, profile, site background тохиргоо',
    },
    loading: {
      title: 'Loading',
      subtitle: 'Хуудас ачаалж байна.',
      action: 'Loading',
      helper: 'Loading overlay болон loading.gif хэсэг',
    },
    intro: {
      title: 'Санал гомдлын хуудас',
      subtitle: 'Таны дуу хоолойг илүү ойлгомжтой, хурдан хүргэнэ.',
      action: 'Эхлэх',
      helper: 'Voice intro болон welcome хэсгийн үндсэн текст',
    },
    avatar: {
      title: 'Avatar сонгох',
      subtitle: 'Өөрт тохирох дүрээ сонгоод үргэлжлүүлээрэй.',
      action: 'Үргэлжлүүлэх',
      helper: 'Хэрэглэгчийн эхний сонголтын дэлгэц',
    },
    menu: {
      title: 'Та юу илгээх вэ?',
      subtitle: 'Хүсэлт, гомдол, талархлын аль нэгийг сонгоно.',
      action: 'Сонгох',
      helper: 'Гол меню болон feedback type сонголт',
    },
    request: {
      title: 'Хүсэлт хэсэг',
      subtitle: 'Хүсэлтээ товч, тодорхой бичнэ үү.',
      action: 'Илгээх',
      helper: 'Хүсэлтийн формын гарчиг ба placeholder',
    },
    complaint: {
      title: 'Гомдлын хэсэг',
      subtitle: 'Асуудлаа дэлгэрэнгүй бичвэл бид хурдан шийдвэрлэнэ.',
      action: 'Илгээх',
      helper: 'Байгууллага/ажилтанд илгээх гомдлын урсгал',
    },
    thanks: {
      title: 'Талархлын хэсэг',
      subtitle: 'Сайн үйлчилгээ авсан бол бидэнд мэдэгдээрэй.',
      action: 'Илгээх',
      helper: 'Rating болон баярлалаа илгээх урсгал',
    },
    success: {
      title: 'Таны хүсэлт амжилттай илгээгдлээ.',
      subtitle:
        'Таны хүсэлтийн дагуу тодруулах зүйлс гарвал тантай эргэн холбогдох болно. Танд баярлалаа.',
      action: 'Холбоо барих',
      helper: 'Илгээсний дараах confirmation screen',
    },
  }),
  ads: [
    {
      id: 1,
      label: 'ББСБ',
      title: 'Хэрэглээний зээл хялбар нөхцөлөөр',
      range: '₮500,000 - ₮10,000,000',
      action: 'Зээл авах',
      image:
        'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=720&h=720&fit=crop',
      gradient: '#003080',
    },
    {
      id: 2,
      label: 'Даатгал',
      title: 'Эрүүл мэндийн даатгал хямд үнээр',
      range: '15% хөнгөлөлт',
      action: 'Бүртгүүлэх',
      image:
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=720&h=720&fit=crop',
      gradient: '#4B2E83',
    },
    {
      id: 3,
      label: 'Хадгаламж',
      title: 'Хугацаатай хадгаламж өндөр хүүтэй',
      range: '12.5% / жил',
      action: 'Дэлгэрэнгүй',
      image:
        'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=720&h=720&fit=crop',
      gradient: '#006B4F',
    },
  ],
  fields: [
    {
      id: 1,
      label: 'Таны нэр',
      placeholder: 'Таны нэр ...',
      type: 'text',
      required: true,
    },
    {
      id: 2,
      label: 'Холбогдох утас',
      placeholder: '8 оронтой дугаар ...',
      type: 'phone',
      required: true,
    },
    {
      id: 3,
      label: 'Дэлгэрэнгүй',
      placeholder: 'Энд бичнэ үү ...',
      type: 'textarea',
      required: true,
    },
    {
      id: 4,
      label: 'Үнэлгээ',
      placeholder: 'Од сонгох',
      type: 'rating',
      required: false,
    },
  ],
  pageFields: {
    settings: [],
    loading: [],
    intro: [],
    avatar: [],
    menu: [],
    request: [
      {
        id: 1,
        label: 'Таны нэр',
        placeholder: 'Таны нэр ...',
        type: 'text',
        required: true,
      },
      {
        id: 2,
        label: 'Холбогдох утас',
        placeholder: 'Холбогдох утас ...',
        type: 'phone',
        required: true,
      },
      {
        id: 3,
        label: 'Хүсэлт бичих',
        placeholder: 'Хүсэлтээ бичнэ үү ...',
        type: 'textarea',
        required: true,
      },
    ],
    complaint: [
      {
        id: 1,
        label: 'Холбогдох утас',
        placeholder: '8 оронтой дугаар ...',
        type: 'phone',
        required: true,
      },
      {
        id: 2,
        label: 'Салбар / ажилтан',
        placeholder: 'Сонгох ...',
        type: 'select',
        required: true,
      },
      {
        id: 3,
        label: 'Гомдлын дэлгэрэнгүй',
        placeholder: 'Энд бичнэ үү ...',
        type: 'textarea',
        required: true,
      },
      {
        id: 4,
        label: 'Файл хавсаргах',
        placeholder: 'Зураг эсвэл файл',
        type: 'file',
        required: false,
      },
    ],
    thanks: [
      {
        id: 1,
        label: 'Салбар / ажилтан',
        placeholder: 'Сонгох ...',
        type: 'select',
        required: true,
      },
      {
        id: 2,
        label: 'Талархал',
        placeholder: 'Талархлаа бичнэ үү ...',
        type: 'textarea',
        required: true,
      },
      {
        id: 3,
        label: 'Үнэлгээ',
        placeholder: 'Од сонгох',
        type: 'rating',
        required: false,
      },
    ],
    success: [],
  },
})

export const mergeConfig = (incoming: Partial<AdminConfig>): AdminConfig => {
  const base = createDefaultConfig()
  const pages = Object.fromEntries(
    pageOrder.map(({ key }) => {
      const incomingPage = incoming.pages?.[key]
      const page = {
        ...base.pages[key],
        ...incomingPage,
      }

      if ((key === 'request' || key === 'complaint') && incomingPage) {
        if (incomingPage.image === defaultPageVisual.image) {
          page.image = base.pages[key].image
        }

        if (incomingPage.buttonColor === defaultPageVisual.buttonColor) {
          page.buttonColor = base.pages[key].buttonColor
        }

        if (incomingPage.adTitle === defaultPageVisual.adTitle) {
          page.adTitle = base.pages[key].adTitle
        }

        if (incomingPage.adSubtitle === defaultPageVisual.adSubtitle) {
          page.adSubtitle = base.pages[key].adSubtitle
        }

        if (incomingPage.cardBackground === defaultPageVisual.cardBackground) {
          page.cardBackground = base.pages[key].cardBackground
        }
      }

      if (key === 'thanks' && incomingPage) {
        if (incomingPage.image === defaultPageVisual.image) {
          page.image = base.pages.thanks.image
        }

        if (incomingPage.adTitle === defaultPageVisual.adTitle) {
          page.adTitle = base.pages.thanks.adTitle
        }

        if (incomingPage.adSubtitle === defaultPageVisual.adSubtitle) {
          page.adSubtitle = base.pages.thanks.adSubtitle
        }

        if (
          incomingPage.organizationFormTitle === defaultPageVisual.organizationFormTitle ||
          incomingPage.organizationFormTitle === base.pages.complaint.organizationFormTitle
        ) {
          page.organizationFormTitle = base.pages.thanks.organizationFormTitle
        }

        if (
          incomingPage.employeeFormTitle === defaultPageVisual.employeeFormTitle ||
          incomingPage.employeeFormTitle === base.pages.complaint.employeeFormTitle
        ) {
          page.employeeFormTitle = base.pages.thanks.employeeFormTitle
        }

        const legacyStarColors = new Set([
          '#6fa0dd',
          '#ff0000',
          '#ff4500',
          '#ffa500',
          '#ef4444',
          '#dc2626',
          '#ff4b5c',
          '#ff5b5b',
          '#ff5252',
          '#ff5757',
          '#f87171',
        ])

        if (legacyStarColors.has(incomingPage.ratingFilledColor?.toLowerCase() ?? '')) {
          page.ratingFilledColor = base.pages.thanks.ratingFilledColor
        }

        if (legacyStarColors.has(incomingPage.ratingEmptyColor?.toLowerCase() ?? '')) {
          page.ratingEmptyColor = base.pages.thanks.ratingEmptyColor
        }

        if (incomingPage.action === 'Талархал илгээх') {
          page.action = base.pages.thanks.action
        }
      }

      if (key === 'complaint' && incomingPage?.action === 'Гомдол илгээх') {
        page.action = base.pages.complaint.action
      }

      return [key, page]
    }),
  ) as Record<PageKey, PageContent>
  const legacyFields = incoming.fields?.length ? incoming.fields : undefined
  const pageFields = Object.fromEntries(
    pageOrder.map(({ key }) => [
      key,
      incoming.pageFields?.[key] ??
        (formPages.includes(key) && legacyFields ? legacyFields : base.pageFields[key]),
    ]),
  ) as Record<PageKey, FieldItem[]>

  return {
    ...base,
    ...incoming,
    theme: { ...base.theme, ...incoming.theme },
    navigation: { ...base.navigation, ...incoming.navigation },
    media: { ...base.media, ...incoming.media },
    pages,
    ads: incoming.ads?.length ? incoming.ads : base.ads,
    fields: incoming.fields?.length ? incoming.fields : base.fields,
    pageFields,
  }
}

export const loadConfig = (): AdminConfig => {
  try {
    const stored = window.localStorage.getItem(storageKey)

    if (!stored) {
      return createDefaultConfig()
    }

    return mergeConfig(JSON.parse(stored) as Partial<AdminConfig>)
  } catch {
    return createDefaultConfig()
  }
}
