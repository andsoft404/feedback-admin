export type AdminRole = 'super_admin' | 'branch_admin' | 'direct_admin' | 'edit_admin'
export type FrontRole = Exclude<AdminRole, 'edit_admin'>
export type AdminDestination = 'studio' | 'front'
export type AdminStatus = 'Active' | 'Inactive' | 'Blocked'

export type AdminUser = {
  id: number
  name: string
  username: string
  email: string
  role: AdminRole
  branch: string
  status: AdminStatus
  destination: AdminDestination
}

export type LoginSession = {
  token: string
  userId: number
  username: string
  email: string
  profileName: string
  destination: AdminDestination
  role: AdminRole
}

type LoginResponse = {
  token: string
  user: AdminUser
}

export type AdminUserInput = {
  name: string
  username: string
  email: string
  role: AdminRole
  branch: string
  status?: AdminStatus
  password?: string
}

export type FeedbackRequest = {
  id: number
  user: string
  phone: string | null
  type: string
  targetType: 'Organization' | 'Employee'
  employeeName: string | null
  desc: string
  branch: string | null
  status: 'Pending' | 'Assigned' | 'Processing' | 'Resolved' | 'Returned' | 'Rejected'
  created_at: string
  assigned_at: string | null
  resolved_at: string | null
  returned_at: string | null
  isDirect: boolean
  isOperator: boolean
  rating: number
  file: string | null
  recipient: string | null
  resolution: string | null
}

export type FeedbackRequestInput = {
  user: string
  phone?: string | null
  type: string
  targetType?: 'Organization' | 'Employee'
  employeeName?: string | null
  desc: string
  branch?: string | null
  isDirect?: boolean
  isOperator?: boolean
  rating?: number
  file?: string | null
  recipient?: string | null
}

export type SiteConfigResponse = {
  config: unknown | null
}

const sessionKey = 'web-admin-session'
const apiBaseUrl = (import.meta.env.VITE_ADMIN_API_URL || 'http://localhost:8000/api').replace(
  /\/$/,
  '',
)

function readToken() {
  try {
    const rawSession = sessionStorage.getItem(sessionKey)
    if (!rawSession) return ''
    const parsed = JSON.parse(rawSession) as Partial<LoginSession>
    return parsed.token || ''
  } catch {
    return ''
  }
}

function getErrorMessage(payload: unknown, fallback: string) {
  if (payload && typeof payload === 'object' && 'detail' in payload) {
    const detail = (payload as { detail?: unknown }).detail
    if (typeof detail === 'string') return detail
  }
  return fallback
}

async function apiRequest<T>(
  path: string,
  options: RequestInit & { authToken?: string; skipAuth?: boolean } = {},
): Promise<T> {
  const { authToken, skipAuth, ...requestOptions } = options
  const headers = new Headers(requestOptions.headers)
  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json')
  }

  const token = skipAuth ? '' : authToken || readToken()
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  let response: Response
  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      cache: requestOptions.cache ?? 'no-store',
      ...requestOptions,
      headers,
    })
  } catch {
    throw new Error(
      `Backend сервертэй холбогдож чадсангүй. ${apiBaseUrl} ажиллаж байгаа эсэхийг шалгана уу.`,
    )
  }

  if (response.status === 204) {
    return undefined as T
  }

  const payload = await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error(getErrorMessage(payload, 'API хүсэлт амжилтгүй боллоо.'))
  }
  return payload as T
}

export function createLoginSession(token: string, user: AdminUser): LoginSession {
  return {
    token,
    userId: user.id,
    username: user.username,
    email: user.email,
    profileName: user.name,
    destination: user.destination,
    role: user.role,
  }
}

export async function loginAdmin(username: string, password: string): Promise<LoginSession> {
  const response = await apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    skipAuth: true,
  })

  return createLoginSession(response.token, response.user)
}

export function getCurrentAdmin(token?: string) {
  return apiRequest<AdminUser>('/auth/me', { authToken: token })
}

export function listAdminUsers() {
  return apiRequest<AdminUser[]>('/admin/users')
}

export function createAdminUser(payload: AdminUserInput) {
  return apiRequest<AdminUser>('/admin/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updateAdminUser(userId: number, payload: Partial<AdminUserInput>) {
  return apiRequest<AdminUser>(`/admin/users/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}

export function toggleAdminUserBlock(userId: number) {
  return apiRequest<AdminUser>(`/admin/users/${userId}/block`, {
    method: 'PATCH',
  })
}

export function deleteAdminUser(userId: number) {
  return apiRequest<void>(`/admin/users/${userId}`, {
    method: 'DELETE',
  })
}

export function saveSiteConfig(config: unknown) {
  return apiRequest<SiteConfigResponse>('/admin-config', {
    method: 'PUT',
    body: JSON.stringify({ config }),
  })
}

export function getPublicSiteConfig() {
  return apiRequest<SiteConfigResponse>('/public-config', {
    skipAuth: true,
  })
}

export function listFeedbackRequests() {
  return apiRequest<FeedbackRequest[]>('/feedback-requests')
}

export function getFeedbackRequestStreamUrl() {
  const token = readToken()
  const params = new URLSearchParams({ token })
  return `${apiBaseUrl}/feedback-requests/stream?${params.toString()}`
}

export function createFeedbackRequest(payload: FeedbackRequestInput) {
  return apiRequest<FeedbackRequest>('/feedback-requests', {
    method: 'POST',
    body: JSON.stringify(payload),
    skipAuth: true,
  })
}

export function updateFeedbackRequest(
  requestId: number,
  payload: Partial<Pick<FeedbackRequest, 'assigned_at' | 'branch' | 'resolved_at' | 'resolution' | 'returned_at' | 'status'>>,
) {
  return apiRequest<FeedbackRequest>(`/feedback-requests/${requestId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}
