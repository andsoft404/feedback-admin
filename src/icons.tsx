import type { SelectOption } from './types'

export const requestIconOptions: SelectOption[] = [
  { value: 'user', label: 'User' },
  { value: 'phone', label: 'Phone' },
  { value: 'edit', label: 'Edit' },
  { value: 'mail', label: 'Mail' },
]

export const renderRequestIcon = (icon: string) => {
  const commonProps = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  if (icon === 'phone') {
    return (
      <svg {...commonProps}>
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.3 19.3 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6.1 6.1l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9z" />
      </svg>
    )
  }

  if (icon === 'edit') {
    return (
      <svg {...commonProps}>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
      </svg>
    )
  }

  if (icon === 'mail') {
    return (
      <svg {...commonProps}>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-10 6L2 7" />
      </svg>
    )
  }

  return (
    <svg {...commonProps}>
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

