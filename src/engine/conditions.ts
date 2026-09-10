// ============================================
// 结构化条件求值器（小程序禁用 eval/new Function）
// ============================================

import type { Cond } from './types';

export interface CondContext {
  tongue: number;
  incense: number;
  debt: number;
  flags: Record<string, boolean>;
  clueIds: string[];
}

type NumericKey = 'tongue' | 'incense' | 'debt';

function isNumericKey(key: string | undefined): key is NumericKey {
  return key === 'tongue' || key === 'incense' || key === 'debt';
}

export function evalCond(cond: Cond | undefined, ctx: CondContext): boolean {
  if (!cond) return false;

  switch (cond.op) {
    case 'and':
      return (cond.items ?? []).every((item) => evalCond(item, ctx));
    case 'or':
      return (cond.items ?? []).some((item) => evalCond(item, ctx));
    case 'not':
      return !evalCond(cond.items?.[0], ctx);
    case 'flag':
      return !!ctx.flags[cond.key ?? ''];
    case 'hasClue':
      return ctx.clueIds.includes(String(cond.value ?? ''));
    case 'gte':
    case 'lte':
    case 'gt':
    case 'lt':
    case 'eq':
    case 'neq': {
      if (!isNumericKey(cond.key)) return false;
      const left = ctx[cond.key];
      const right = Number(cond.value ?? 0);
      switch (cond.op) {
        case 'gte':
          return left >= right;
        case 'lte':
          return left <= right;
        case 'gt':
          return left > right;
        case 'lt':
          return left < right;
        case 'eq':
          return left === right;
        case 'neq':
          return left !== right;
        default:
          return false;
      }
    }
    default:
      return false;
  }
}
