// 하드코딩된 관리자 계정 (개발용)
const ADMIN_ACCOUNTS = [
  {
    id: 'admin-001',
    email: 'admin@day6.com',
    password: 'day6admin123',
    name: 'D6 관리자',
    role: 'admin' as const,
  },
  {
    id: 'manager-001', 
    email: 'manager@day6.com',
    password: 'day6manager123',
    name: 'D6 매니저',
    role: 'manager' as const,
  }
];

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  role: 'admin' | 'manager';
  permissions: AdminPermissions;
}

export interface AdminPermissions {
  links: {
    read: boolean;
    write: boolean;
    delete: boolean;
  };
  content: {
    read: boolean;
    write: boolean;
    publish: boolean;
  };
  monitoring: {
    read: boolean;
    logs: boolean;
  };
  settings: {
    read: boolean;
    write: boolean;
    users: boolean;
  };
}

// 기본 관리자 권한
const DEFAULT_ADMIN_PERMISSIONS: AdminPermissions = {
  links: { read: true, write: true, delete: true },
  content: { read: true, write: true, publish: true },
  monitoring: { read: true, logs: true },
  settings: { read: true, write: true, users: true },
};

/**
 * 이메일/비밀번호로 로그인
 */
export async function signInWithPassword(email: string, password: string): Promise<AdminUser> {
  // 하드코딩된 계정 확인
  const account = ADMIN_ACCOUNTS.find(
    acc => acc.email === email && acc.password === password
  );

  if (!account) {
    throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
  }

  const adminUser: AdminUser = {
    id: account.id,
    email: account.email,
    name: account.name,
    role: account.role,
    permissions: DEFAULT_ADMIN_PERMISSIONS,
  };

  // 로컬스토리지에 사용자 정보 저장 (실제로는 더 안전한 방법 사용)
  localStorage.setItem('admin_user', JSON.stringify(adminUser));
  localStorage.setItem('admin_session', Date.now().toString());

  return adminUser;
}

/**
 * 로그아웃
 */
export async function signOut() {
  // 로컬스토리지에서 사용자 정보 삭제
  localStorage.removeItem('admin_user');
  localStorage.removeItem('admin_session');
  
  // 관리자 페이지에서 로그인 페이지로 리다이렉트
  window.location.href = '/admin/login';
}

/**
 * 현재 사용자 정보 가져오기
 */
export async function getCurrentUser(): Promise<AdminUser | null> {
  try {
    const userStr = localStorage.getItem('admin_user');
    const sessionStr = localStorage.getItem('admin_session');
    
    if (!userStr || !sessionStr) {
      return null;
    }

    // 세션 만료 확인 (24시간)
    const sessionTime = parseInt(sessionStr);
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    
    if (now - sessionTime > twentyFourHours) {
      // 세션 만료
      localStorage.removeItem('admin_user');
      localStorage.removeItem('admin_session');
      return null;
    }

    const user = JSON.parse(userStr) as AdminUser;
    return user;
  } catch (error) {
    console.error('사용자 정보 가져오기 오류:', error);
    return null;
  }
}

/**
 * 인증 상태 변경 리스너 (간단한 폴링 방식)
 */
export function onAuthStateChange(callback: (user: AdminUser | null) => void) {
  let lastUser: AdminUser | null = null;
  
  const checkAuth = async () => {
    const currentUser = await getCurrentUser();
    if (JSON.stringify(currentUser) !== JSON.stringify(lastUser)) {
      lastUser = currentUser;
      callback(currentUser);
    }
  };

  // 초기 확인
  checkAuth();
  
  // 5초마다 확인 (실제로는 더 적은 간격 또는 이벤트 기반으로)
  const interval = setInterval(checkAuth, 5000);
  
  return {
    unsubscribe: () => clearInterval(interval)
  };
}

/**
 * 관리자 액션 로깅 (개발용 - 콘솔 로그)
 */
export async function logAdminAction(
  action: string,
  resource: string,
  resourceId?: string,
  changes?: Record<string, any>
) {
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    console.warn('관리자 로그인 없이 액션 시도:', action);
    return;
  }

  // 개발용 콘솔 로깅
  const logEntry = {
    timestamp: new Date().toISOString(),
    user_id: currentUser.id,
    user_email: currentUser.email,
    action,
    resource,
    resource_id: resourceId,
    changes,
    user_agent: navigator.userAgent,
  };

  console.log('🔧 Admin Action:', logEntry);
  
  // 나중에 실제 DB 로깅으로 교체 가능
  // await supabase.from('admin_logs').insert([logEntry]);
}