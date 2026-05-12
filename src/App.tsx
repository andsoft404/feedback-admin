import './frontAdmin/front-admin.css'
import './App.css'
import { useEffect, useState } from 'react'
import { AdminLogin } from './components/AdminLogin'
import type { LoginSession } from './components/AdminLogin'
import { AdminHeader } from './components/AdminHeader'
import { EditorPanel } from './components/EditorPanel'
import { FrontAdminFrame } from './components/FrontAdminFrame'
import { PreviewPanel } from './components/PreviewPanel'
import { useAdminStudio } from './hooks/useAdminStudio'
import { createLoginSession, getCurrentAdmin } from './services/adminApi'
import type { AdminRole, FrontRole } from './services/adminApi'

const sessionKey = 'web-admin-session'
const defaultFrontRole: FrontRole = 'super_admin'
const validRoles: AdminRole[] = ['super_admin', 'branch_admin', 'direct_admin', 'edit_admin']

function readSession() {
  try {
    const rawSession = sessionStorage.getItem(sessionKey)
    if (!rawSession) return null

    const parsed = JSON.parse(rawSession) as Partial<LoginSession>
    if (parsed.destination !== 'studio' && parsed.destination !== 'front') {
      return null
    }

    if (!parsed.token || typeof parsed.token !== 'string') {
      return null
    }

    const role = validRoles.includes(parsed.role as AdminRole)
      ? (parsed.role as AdminRole)
      : defaultFrontRole

    return {
      token: parsed.token,
      userId: parsed.userId || 0,
      username: parsed.username || '',
      email: parsed.email || '',
      profileName: parsed.profileName || 'Admin',
      destination: parsed.destination,
      role,
    } satisfies LoginSession
  } catch {
    return null
  }
}

function App() {
  const studio = useAdminStudio()
  const [session, setSession] = useState<LoginSession | null>(() => readSession())

  useEffect(() => {
    if (!session?.token) return

    let isMounted = true

    getCurrentAdmin(session.token)
      .then((user) => {
        if (!isMounted) return
        const verifiedSession = createLoginSession(session.token, user)
        try {
          sessionStorage.setItem(sessionKey, JSON.stringify(verifiedSession))
        } catch {
          // Login still works for this session if session storage is blocked.
        }
        setSession(verifiedSession)
      })
      .catch(() => {
        if (!isMounted) return
        try {
          sessionStorage.removeItem(sessionKey)
        } catch {
          // Session storage can be unavailable in strict browser modes.
        }
        setSession(null)
      })

    return () => {
      isMounted = false
    }
  }, [session?.token])

  const signOut = () => {
    try {
      sessionStorage.removeItem(sessionKey)
    } catch {
      // Session storage can be unavailable in strict browser modes.
    }
    setSession(null)
  }

  const handleLogin = (nextSession: LoginSession) => {
    try {
      sessionStorage.setItem(sessionKey, JSON.stringify(nextSession))
    } catch {
      // Login still works for this session if session storage is blocked.
    }
    setSession(nextSession)
  }

  if (!session) {
    return <AdminLogin logo={studio.config.media.logo} onLogin={handleLogin} />
  }

  if (session.destination === 'front') {
    const frontRole: FrontRole = session.role === 'edit_admin' ? defaultFrontRole : session.role

    return (
      <div className="front-admin-host">
        <FrontAdminFrame role={frontRole} onLogout={signOut} />
      </div>
    )
  }

  return (
    <div
      className={`admin-shell density-${studio.activeContent.density}`}
      style={studio.previewStyle}
    >
      <AdminHeader
        studio={studio}
        onSignOut={signOut}
      />

      <main className="studio-layout">
        <PreviewPanel studio={studio} />
        <EditorPanel studio={studio} />
      </main>
    </div>
  )
}

export default App
