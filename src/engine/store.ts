// ============================================
// 全局游戏状态（Zustand）
// 持久字段：香火、谎言债务、全局标记、通关层、结局
// 层内运行时：舌、因果簿、层内标记、当前节点、错误次数
// ============================================

import { create } from 'zustand';
import type { ChoiceOption, Clue, EndingNode } from './types';
import { evalCond, type CondContext } from './conditions';
import { clearPersist, defaultPersist, loadPersist, savePersist } from './save';
import { getLevel } from '../data/levels';

export const MAX_TONGUE = 3;
const HINT_COST = 3;

export interface VerdictResult {
  levelId: string;
  title: string;
  text: string;
  verdict: EndingNode['verdict'];
  baseReward: number;
  tongueBonus: number;
  totalReward: number;
  tongueLeft: number;
}

interface GameStore {
  // —— 持久字段 ——
  incense: number;
  debt: number;
  globalFlags: Record<string, boolean>;
  completed: string[];
  endings: string[];

  // —— 层内运行时 ——
  tongue: number;
  clues: Clue[];
  levelFlags: Record<string, boolean>;
  levelId: string | null;
  nodeId: string | null;
  wrongAttempts: Record<string, number>;
  levelFailed: boolean;
  lastVerdict: VerdictResult | null;

  // —— 动作 ——
  initFromSave: () => void;
  startLevel: (levelId: string) => boolean;
  restartLevel: () => void;
  exitLevel: () => void;
  goTo: (nodeId: string) => void;
  addClueAndAdvance: (clue: Clue, next?: string) => void;
  /** 应用选项后果，返回是否说谎以及扣舌后的状态 */
  applyChoice: (option: ChoiceOption) => {
    lie: boolean;
    tongueBefore: number;
    tongueAfter: number;
    unaffordable?: boolean;
  };
  /** 谜题结算 */
  puzzleOutcome: (puzzleId: string, success: boolean, successNext: string, failNext?: string) => void;
  spendHint: () => boolean;
  finishLevel: (ending: EndingNode) => void;
  resetAll: () => void;
}

function persistSlice(s: GameStore) {
  savePersist({
    incense: s.incense,
    debt: s.debt,
    globalFlags: s.globalFlags,
    completed: s.completed,
    endings: s.endings
  });
}

export const useGameStore = create<GameStore>((set, get) => ({
  incense: 0,
  debt: 0,
  globalFlags: {},
  completed: [],
  endings: [],

  tongue: MAX_TONGUE,
  clues: [],
  levelFlags: {},
  levelId: null,
  nodeId: null,
  wrongAttempts: {},
  levelFailed: false,
  lastVerdict: null,

  initFromSave: () => {
    const saved = loadPersist();
    if (!saved) {
      const fresh = defaultPersist();
      set({
        incense: fresh.incense,
        debt: fresh.debt,
        globalFlags: fresh.globalFlags,
        completed: fresh.completed,
        endings: fresh.endings
      });
      return;
    }
    set({
      incense: saved.incense,
      debt: saved.debt,
      globalFlags: saved.globalFlags,
      completed: saved.completed,
      endings: saved.endings
    });
  },

  startLevel: (levelId) => {
    const level = getLevel(levelId);
    if (!level) {
      console.error('[Engine] 关卡不存在', levelId);
      return false;
    }
    console.info('[Engine] 进入关卡', levelId, level.title);
    set({
      levelId,
      nodeId: level.startNode,
      tongue: MAX_TONGUE,
      clues: [],
      levelFlags: {},
      wrongAttempts: {},
      levelFailed: false,
      lastVerdict: null
    });
    return true;
  },

  restartLevel: () => {
    const { levelId } = get();
    if (!levelId) return;
    const level = getLevel(levelId);
    if (!level) return;
    console.info('[Engine] 重来本层', levelId);
    set({
      nodeId: level.startNode,
      tongue: MAX_TONGUE,
      clues: [],
      levelFlags: {},
      wrongAttempts: {},
      levelFailed: false
    });
  },

  exitLevel: () => {
    set({ levelId: null, nodeId: null, levelFailed: false });
  },

  goTo: (nodeId) => set({ nodeId }),

  addClueAndAdvance: (clue, next) => {
    const { clues } = get();
    if (clues.some((item) => item.id === clue.id)) {
      // 同一线索不重复收录，直接推进
      if (next) set({ nodeId: next });
      return;
    }
    console.info('[Engine] 因果簿收录', clue.id, clue.title);
    set((state) => ({ clues: [...state.clues, clue], nodeId: next ?? state.nodeId }));
  },

  applyChoice: (option) => {
    const state = get();
    const ctx: CondContext = {
      tongue: state.tongue,
      incense: state.incense,
      debt: state.debt,
      flags: { ...state.globalFlags, ...state.levelFlags },
      clueIds: state.clues.map((clue) => clue.id)
    };
    // 已知真相而否认（lieCond 满足）才算说谎；静态 isLie 直接算谎
    const lie = !!option.isLie || evalCond(option.lieCond, ctx);
    const tongueBefore = state.tongue;

    // 香火买路钱不足：防御性拦截（UI 已置灰，双保险）
    if (typeof option.requireIncense === 'number' && state.incense < option.requireIncense) {
      console.warn('[Engine] 香火不足，选项不可用', option.requireIncense);
      return { lie: false, tongueBefore, tongueAfter: tongueBefore, unaffordable: true };
    }

    const tongueAfter = lie
      ? Math.max(0, tongueBefore - (option.tonguePenalty ?? 1))
      : tongueBefore;

    const patch: Partial<GameStore> = {
      tongue: tongueAfter,
      levelFailed: tongueAfter <= 0
    };
    if (typeof option.incense === 'number') {
      patch.incense = Math.max(0, state.incense + option.incense);
    }
    if (typeof option.requireIncense === 'number') {
      patch.incense = Math.max(0, state.incense - option.requireIncense);
    }
    if (option.addDebt) {
      patch.debt = state.debt + 1;
    }
    if (option.setFlag) {
      patch.levelFlags = { ...state.levelFlags, [option.setFlag]: true };
    }
    if (option.setGlobalFlag) {
      patch.globalFlags = { ...state.globalFlags, [option.setGlobalFlag]: true };
    }
    if (option.next) patch.nodeId = option.next;

    console.info('[Engine] 选项结算', {
      lie,
      tongueBefore,
      tongueAfter,
      debt: patch.debt ?? state.debt
    });
    set(patch);
    persistSlice({ ...get() } as GameStore);
    return { lie, tongueBefore, tongueAfter };
  },

  puzzleOutcome: (puzzleId, success, successNext, failNext) => {
    const state = get();
    if (success) {
      console.info('[Engine] 谜题通过', puzzleId);
      set({ nodeId: successNext });
      return;
    }
    const attempts = (state.wrongAttempts[puzzleId] ?? 0) + 1;
    const tongueAfter = Math.max(0, state.tongue - 1);
    console.warn('[Engine] 对质失败（妄言）', puzzleId, '第', attempts, '次');
    set({
      wrongAttempts: { ...state.wrongAttempts, [puzzleId]: attempts },
      tongue: tongueAfter,
      levelFailed: tongueAfter <= 0,
      nodeId: tongueAfter > 0 && failNext ? failNext : state.nodeId
    });
  },

  spendHint: () => {
    const { incense } = get();
    if (incense < HINT_COST) return false;
    set({ incense: incense - HINT_COST });
    persistSlice({ ...get() } as GameStore);
    return true;
  },

  finishLevel: (ending) => {
    const state = get();
    if (!state.levelId) return;
    const level = getLevel(state.levelId);
    if (!level) return;

    const tongueBonus = state.tongue;
    const totalReward = level.baseReward + tongueBonus;
    const completed = state.completed.includes(level.id)
      ? state.completed
      : [...state.completed, level.id];

    const verdict: VerdictResult = {
      levelId: level.id,
      title: ending.title,
      text: ending.text,
      verdict: ending.verdict,
      baseReward: level.baseReward,
      tongueBonus,
      totalReward,
      tongueLeft: state.tongue
    };

    set({
      incense: state.incense + totalReward,
      completed,
      lastVerdict: verdict
    });
    persistSlice({ ...get() } as GameStore);
    console.info('[Engine] 关卡完成', level.id, '奖励香火', totalReward);
  },

  resetAll: () => {
    clearPersist();
    const fresh = defaultPersist();
    set({
      incense: fresh.incense,
      debt: fresh.debt,
      globalFlags: fresh.globalFlags,
      completed: fresh.completed,
      endings: fresh.endings,
      tongue: MAX_TONGUE,
      clues: [],
      levelFlags: {},
      levelId: null,
      nodeId: null,
      wrongAttempts: {},
      levelFailed: false,
      lastVerdict: null
    });
  }
}));

export { HINT_COST };
