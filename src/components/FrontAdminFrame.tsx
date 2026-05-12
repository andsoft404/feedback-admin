import FrontAdminApp from '../frontAdmin/App.jsx'
import type { FrontRole } from '../services/adminApi'

type FrontAdminFrameProps = {
  role: FrontRole
  onLogout: () => void
}

export function FrontAdminFrame({ role, onLogout }: FrontAdminFrameProps) {
  return (
    <main className="front-admin-frame">
      <FrontAdminApp
        initialRole={role}
        onLogout={onLogout}
        lockRole
      />
    </main>
  )
}
