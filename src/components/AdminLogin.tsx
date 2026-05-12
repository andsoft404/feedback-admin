import { useState } from 'react'
import type { FormEvent } from 'react'
import { loginAdmin } from '../services/adminApi'
import type { LoginSession } from '../services/adminApi'

export type { LoginSession }

type AdminLoginProps = {
  logo: string
  onLogin: (session: LoginSession) => void
}

const accessOptions: Array<
  {
    label: string
    helper: string
    username: string
  }
> = [
  {
    label: 'Form Studio',
    helper: 'Хуудасны дизайн засвар',
    username: 'studio',
  },
  {
    label: 'Төв админ',
    helper: 'Front admin бүх эрх',
    username: 'admin',
  },
  {
    label: 'Салбар',
    helper: 'Салбарын хүсэлтүүд',
    username: 'branch',
  },
  {
    label: 'Шууд',
    helper: 'Шууд харилцагч',
    username: 'direct',
  },
]

export function AdminLogin({ logo, onLogin }: AdminLoginProps) {
  const [selectedUsername, setSelectedUsername] = useState(accessOptions[0].username)
  const [username, setUsername] = useState(accessOptions[0].username)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedUsername = username.trim().toLowerCase()
    if (!normalizedUsername || !password.trim()) {
      setError('Нэвтрэх нэр болон нууц үгээ оруулна уу.')
      return
    }

    try {
      setIsSubmitting(true)
      const session = await loginAdmin(normalizedUsername, password.trim())
      setError('')
      onLogin(session)
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Нэвтрэх хүсэлт амжилтгүй боллоо.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="admin-login-screen">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <img src={logo} alt="Bichil Globus" className="admin-login-logo" />
        <div className="admin-login-copy">
          <span>Нэгдсэн админ</span>
          <h1>Системд нэвтрэх</h1>
        </div>

        <div className="login-access-grid" aria-label="Нэвтрэх эрх сонгох">
          {accessOptions.map((option) => (
            <button
              type="button"
              key={option.username}
              className={selectedUsername === option.username ? 'selected' : ''}
              onClick={() => {
                setSelectedUsername(option.username)
                setUsername(option.username)
                setPassword('')
                setError('')
              }}
            >
              <strong>{option.label}</strong>
              <span>{option.helper}</span>
            </button>
          ))}
        </div>

        <label>
          <span>Нэвтрэх нэр</span>
          <input
            type="text"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value)
              setSelectedUsername(event.target.value.trim().toLowerCase())
            }}
            placeholder="admin"
            autoComplete="username"
          />
        </label>

        <label>
          <span>Нууц үг</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </label>

        {error && <p className="admin-login-error">{error}</p>}

        <button type="submit" className="primary-button admin-login-submit" disabled={isSubmitting}>
          {isSubmitting ? 'Шалгаж байна...' : 'Нэвтрэх'}
        </button>
      </form>
    </main>
  )
}
