// ============================================
// 十八层地狱元数据（名称、分组、解锁规则）
// ============================================

export interface LevelMeta {
  id: string;
  index: number;
  title: string;
  group: string;
}

export interface LevelGroup {
  name: string;
  desc: string;
  levels: string[];
}

/** 六组十八层，借用传统刑罚名，主题为原创设定 */
export const LEVEL_GROUPS: LevelGroup[] = [
  { name: '舌之狱', desc: '谎言从口出', levels: ['拔舌狱', '剪舌狱', '铁树狱'] },
  { name: '镜之狱', desc: '谎言照出原形', levels: ['孽镜狱', '蒸笼狱', '铜柱狱'] },
  { name: '刑之狱', desc: '谎言的代价', levels: ['刀山狱', '冰山狱', '油锅狱'] },
  { name: '冤之狱', desc: '冤案与错判', levels: ['牛坑狱', '石压狱', '舂臼狱'] },
  { name: '忏之狱', desc: '忏悔与宽恕', levels: ['血池狱', '枉死狱', '磔刑狱'] },
  { name: '审之狱', desc: '终极审判', levels: ['火山狱', '石磨狱', '刀锯狱'] }
];

export const LEVEL_META: LevelMeta[] = LEVEL_GROUPS.flatMap((group) =>
  group.levels.map((title) => ({
    id: '',
    index: 0,
    title,
    group: group.name
  }))
).map((item, idx) => ({
  id: `level${String(idx + 1).padStart(2, '0')}`,
  index: idx + 1,
  title: item.title,
  group: item.group
}));

/** 第一层默认解锁；其余层需通关前一层 */
export function isLevelUnlocked(levelId: string, completed: string[]): boolean {
  const meta = LEVEL_META.find((item) => item.id === levelId);
  if (!meta) return false;
  if (meta.index === 1) return true;
  const prev = LEVEL_META[meta.index - 2];
  return completed.includes(prev.id);
}

/** 第一个尚未通关的层（用于"继续审判"） */
export function firstUncompleted(completed: string[]): LevelMeta {
  return LEVEL_META.find((item) => !completed.includes(item.id)) ?? LEVEL_META[0];
}
