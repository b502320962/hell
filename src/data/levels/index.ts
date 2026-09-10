// ============================================
// 关卡注册表：新增一层地狱只需在此登记
// ============================================

import type { Level } from '../../engine/types';
import { level01 } from './level01';
import { level02 } from './level02';
import { level03 } from './level03';
import { level04 } from './level04';
import { level05 } from './level05';
import { level06 } from './level06';

export const levelList: Level[] = [level01, level02, level03, level04, level05, level06];

const levelMap = new Map<string, Level>(levelList.map((level) => [level.id, level]));

export function getLevel(id: string | null | undefined): Level | undefined {
  if (!id) return undefined;
  return levelMap.get(id);
}
