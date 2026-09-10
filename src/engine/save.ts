// ============================================
// 存档管理：微信 storage，带版本号与损坏恢复
// ============================================

import Taro from '@tarojs/taro';

const SAVE_KEY = 'hells_save_v1';
const SAVE_VERSION = 1;

export interface PersistState {
  version: number;
  incense: number;
  debt: number;
  globalFlags: Record<string, boolean>;
  completed: string[];
  endings: string[];
}

export function defaultPersist(): PersistState {
  return {
    version: SAVE_VERSION,
    incense: 0,
    debt: 0,
    globalFlags: {},
    completed: [],
    endings: []
  };
}

export function savePersist(state: Omit<PersistState, 'version'>): void {
  try {
    const payload: PersistState = { ...state, version: SAVE_VERSION };
    Taro.setStorageSync(SAVE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.error('[Save] 存档写入失败', err);
  }
}

/** 读取存档；损坏时备份旧档并返回 null（调用方新开档） */
export function loadPersist(): PersistState | null {
  let raw: unknown = '';
  try {
    raw = Taro.getStorageSync(SAVE_KEY);
    if (!raw) return null;
    const data = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (typeof data !== 'object' || data === null) throw new Error('存档格式非法');
    if (data.version !== SAVE_VERSION) {
      console.warn('[Save] 存档版本不匹配，按新档处理', data.version);
      return null;
    }
    return {
      version: SAVE_VERSION,
      incense: Number(data.incense) || 0,
      debt: Number(data.debt) || 0,
      globalFlags: data.globalFlags && typeof data.globalFlags === 'object' ? data.globalFlags : {},
      completed: Array.isArray(data.completed) ? data.completed : [],
      endings: Array.isArray(data.endings) ? data.endings : []
    };
  } catch (err) {
    console.error('[Save] 存档损坏，已忽略', err);
    try {
      Taro.setStorageSync(`${SAVE_KEY}_broken_${Date.now()}`, typeof raw === 'string' ? raw : JSON.stringify(raw));
    } catch (backupErr) {
      console.error('[Save] 损坏旧档备份失败', backupErr);
    }
    return null;
  }
}

export function clearPersist(): void {
  try {
    Taro.removeStorageSync(SAVE_KEY);
  } catch (err) {
    console.error('[Save] 清除存档失败', err);
  }
}
