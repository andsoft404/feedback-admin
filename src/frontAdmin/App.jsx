import React, { useEffect, useState } from 'react';
import Layout from './components/Layout';
import SuperAdmin from './pages/SuperAdmin';
import BranchAdmin from './pages/BranchAdmin';
import DirectAdmin from './pages/DirectAdmin';
import Permissions from './pages/Permissions';
import Login from './pages/Login';
import { ROLES } from './data';
import { getFeedbackRequestStreamUrl, listFeedbackRequests, updateFeedbackRequest } from '../services/adminApi';

const seenStorageFallbackKey = 'front-admin-seen-request-ids';

function mergeRealtimeRequest(list, request) {
  const exists = list.some((item) => item.id === request.id);
  const nextList = exists
    ? list.map((item) => (item.id === request.id ? request : item))
    : [request, ...list];

  return nextList.sort((a, b) => b.id - a.id);
}

function getSeenStorageKey() {
  try {
    const rawSession = sessionStorage.getItem('web-admin-session');
    const session = rawSession ? JSON.parse(rawSession) : null;
    const owner = session?.userId || session?.username || 'default';
    return `${seenStorageFallbackKey}:${owner}`;
  } catch {
    return seenStorageFallbackKey;
  }
}

function readSeenRequestIds() {
  try {
    const rawSeenIds = localStorage.getItem(getSeenStorageKey());
    const parsed = rawSeenIds ? JSON.parse(rawSeenIds) : [];
    return new Set(Array.isArray(parsed) ? parsed.map(String) : []);
  } catch {
    return new Set();
  }
}

function saveSeenRequestIds(seenIds) {
  try {
    localStorage.setItem(getSeenStorageKey(), JSON.stringify([...seenIds]));
  } catch {
    // The badge still works for the current tab if localStorage is blocked.
  }
}

function isInboxRequest(request) {
  return request.status === 'Pending' || request.status === 'Returned';
}

export default function FrontAdminApp({
  initialRole = ROLES.SUPER_ADMIN,
  onLogout,
  lockRole = true,
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentRole, setCurrentRole] = useState(initialRole);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [requests, setRequests] = useState([]);
  const [seenRequestIds, setSeenRequestIds] = useState(() => readSeenRequestIds());

  useEffect(() => {
    if (!isLoggedIn) return;

    let isMounted = true;
    let pollTimer = null;
    let eventSource = null;

    const refreshRequests = () => {
      listFeedbackRequests()
        .then((data) => {
          if (isMounted) setRequests(data);
        })
        .catch((error) => {
          console.error('Failed to load feedback requests', error);
        });
    };

    refreshRequests();
    pollTimer = window.setInterval(refreshRequests, 1500);

    if (typeof window !== 'undefined' && 'EventSource' in window) {
      eventSource = new EventSource(getFeedbackRequestStreamUrl());
      eventSource.addEventListener('feedback', (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload?.request && isMounted) {
            setRequests((prev) => mergeRealtimeRequest(prev, payload.request));
          }
        } catch (error) {
          console.error('Failed to parse feedback stream event', error);
        }
      });
      eventSource.onerror = () => {
        if (eventSource) {
          eventSource.close();
          eventSource = null;
        }
      };
    }

    const handleFocus = () => refreshRequests();
    const handleVisibilityChange = () => {
      if (!document.hidden) refreshRequests();
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isMounted = false;
      if (eventSource) eventSource.close();
      if (pollTimer) window.clearInterval(pollTimer);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isLoggedIn]);

  useEffect(() => {
    if (activeTab !== 'inbox') return;

    const visibleInboxIds = requests.filter(isInboxRequest).map((request) => String(request.id));
    if (!visibleInboxIds.length) return;

    setSeenRequestIds((current) => {
      const next = new Set(current);
      let changed = false;

      visibleInboxIds.forEach((id) => {
        if (!next.has(id)) {
          next.add(id);
          changed = true;
        }
      });

      if (!changed) return current;
      saveSeenRequestIds(next);
      return next;
    });
  }, [activeTab, requests]);

  const handleTabChange = (nextTab) => {
    setActiveTab(nextTab);
  };

  // --- ACTIONS ---

  // 1. Login Handler
  const handleLogin = (role) => {
    setCurrentRole(role);
    setIsLoggedIn(true);
    setActiveTab('dashboard'); // Нэвтрэх үед dashboard руу шилжүүлнэ
  };

  // 2. Logout Handler
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      return;
    }
    setIsLoggedIn(false);
    setCurrentRole(initialRole);
  };

  // 3. Салбар руу хуваарилах (Assign)
  const assignBranch = (id, branchName) => {
    setRequests(prev => prev.map(r => 
      r.id === id ? { 
        ...r, 
        branch: branchName, 
        status: 'Assigned', 
        assigned_at: new Date().toLocaleString() 
      } : r
    ));
    updateFeedbackRequest(id, {
      branch: branchName,
      status: 'Assigned',
      assigned_at: new Date().toLocaleString(),
    }).catch((error) => console.error('Failed to assign request', error));
  };

  // 4. Шууд шийдвэрлэж ИЛГЭЭХ (Send / Resolve)
  const handleSendRequest = (id, resolutionText) => {
    setRequests(prev => prev.map(r => 
      r.id === id ? { 
        ...r, 
        status: 'Assigned', 
        resolution: resolutionText, 
        resolved_at: null, 
        assigned_at: new Date().toLocaleString() 
      } : r
    ));
    updateFeedbackRequest(id, {
      status: 'Assigned',
      resolution: resolutionText,
      assigned_at: new Date().toLocaleString(),
    }).catch((error) => console.error('Failed to update request', error));
  };

  // --- CONTENT RENDERER ---
  const renderContent = () => {
    switch (currentRole) {
      case ROLES.SUPER_ADMIN:
        if (activeTab === 'permissions') return <Permissions />;
        return (
          <SuperAdmin 
            activeTab={activeTab} 
            requests={requests} 
            setRequests={setRequests} 
            assignBranch={assignBranch}
            handleSendRequest={handleSendRequest}
            setActiveTab={handleTabChange}
          />
        );
      
      case ROLES.BRANCH_ADMIN:
        return (
          <BranchAdmin 
            activeTab={activeTab} 
            requests={requests} 
            setRequests={setRequests} 
          />
        );
      
      case ROLES.DIRECT_ADMIN:
        return (
          <DirectAdmin 
            activeTab={activeTab} 
            requests={requests} 
            setRequests={setRequests} 
          />
        );
      
      default: return <div>Role not found</div>;
    }
  };

  // Хэрэв нэвтрээгүй бол LOGIN хуудсыг харуулна
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // --- МЭДЭГДЛИЙН ЛОГИК ---
  // Pending (Шинэ) болон Returned (Буцаагдсан) төлөвтэй хүсэлтүүдийг шүүж авна
  const notifications = requests.filter((r) => isInboxRequest(r) && !seenRequestIds.has(String(r.id)));
  const pendingCount = notifications.length;

  return (
    <Layout 
      currentRole={currentRole} 
      setCurrentRole={setCurrentRole} 
      activeTab={activeTab} 
      setActiveTab={handleTabChange}
      pendingCount={pendingCount}
      notifications={notifications} // ШИНЭЭР НЭМСЭН: Жагсаалтыг дамжуулж байна
      onLogout={handleLogout}
      lockRole={lockRole}
    >
      {renderContent()}
    </Layout>
  );
}
