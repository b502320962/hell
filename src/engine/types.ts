// ============================================
// 剧本数据类型定义（数据驱动引擎 schema）
// 十八层地狱的每一层都是一份 Level JSON 结构的剧本
// ============================================

/** 谜题类型：矛盾指认 / 真话独木桥 / 审判定罪 / 镜中找异 */
export type PuzzleKind = 'contradiction' | 'truthBridge' | 'judgment' | 'mirrorSpot';

/** 结构化条件（小程序禁用 eval，所有分支条件均以此对象描述） */
export interface Cond {
  op: 'and' | 'or' | 'not' | 'gte' | 'lte' | 'gt' | 'lt' | 'eq' | 'neq' | 'flag' | 'hasClue';
  /** 变量名：tongue | incense | debt，或 flag 名称 */
  key?: string;
  value?: number | string | boolean;
  items?: Cond[];
}

/** 因果簿条目：证词或物证 */
export interface Clue {
  id: string;
  kind: 'testimony' | 'evidence';
  title: string;
  source?: string;
  text: string;
}

/** 对话节点 */
export interface DialogueNode {
  type: 'dialogue';
  id: string;
  speaker?: string;
  text: string;
  next?: string;
}

/** 选项 */
export interface ChoiceOption {
  text: string;
  /** 静态谎言标记：选了就算说谎 */
  isLie?: boolean;
  /** 条件谎言：满足条件时选此项才算说谎（如：已知真相而否认） */
  lieCond?: Cond;
  /** 扣舌数量，默认 1 */
  tonguePenalty?: number;
  /** 积累一条谎言债务 */
  addDebt?: boolean;
  /**
   * 义谎：此选项虽是说谎，但是为救无辜者而撒
   * 不扣舌，但仍累一条债（冤债）；后续结算可凭 flag 减免
   */
  righteousLie?: boolean;
  /** 香火变化（奖励为正、惩罚为负） */
  incense?: number;
  /** 选择此项需要消耗的香火；不足时选项置灰不可选（真话买路钱） */
  requireIncense?: number;
  /** 设置层内剧情标记 */
  setFlag?: string;
  /** 设置跨层全局标记 */
  setGlobalFlag?: string;
  next?: string;
}

/** 选择节点 */
export interface ChoiceNode {
  type: 'choice';
  id: string;
  speaker?: string;
  prompt?: string;
  options: ChoiceOption[];
}

/** 收录线索节点 */
export interface ClueNode {
  type: 'clue';
  id: string;
  clue: Clue;
  next?: string;
}

/** 矛盾指认：从多条陈述中点出谎话（支持单谎或双谎指认） */
export interface ContradictionPuzzle {
  kind: 'contradiction';
  prompt: string;
  statements: { id: string; speaker: string; text: string }[];
  /** 单谎答案：谎话陈述 id（与 answerStatementIds 二选一） */
  answerStatementId?: string;
  /** 双谎指认：多句谎话需全部点出，点错任一句即失败 */
  answerStatementIds?: string[];
  /** 因果簿中用于戳穿的线索 id（用于提示文案） */
  refClueId?: string;
  hint?: string;
  successText: string;
  failText: string;
}

/** 真话独木桥：连续提问，任一谎话即失败 */
export interface TruthBridgePuzzle {
  kind: 'truthBridge';
  prompt: string;
  questions: {
    id: string;
    prompt: string;
    options: { text: string; isLie?: boolean }[];
  }[];
  hint?: string;
  successText: string;
  failText: string;
}

/** 审判定罪：选出完整证据链 */
export interface JudgmentPuzzle {
  kind: 'judgment';
  prompt: string;
  target: string;
  answerClueIds: string[];
  hint?: string;
  successText: string;
  failText: string;
}

/** 镜中找异：选出镜中异常项 */
export interface MirrorSpotPuzzle {
  kind: 'mirrorSpot';
  prompt: string;
  scenes: { id: string; label: string; text: string }[];
  answerId: string;
  hint?: string;
  successText: string;
  failText: string;
}

export type PuzzleData =
  | ContradictionPuzzle
  | TruthBridgePuzzle
  | JudgmentPuzzle
  | MirrorSpotPuzzle;

/** 谜题节点：失败不填 failNext 时原地重试（扣舌） */
export interface PuzzleNode {
  type: 'puzzle';
  id: string;
  puzzle: PuzzleData;
  successNext: string;
  failNext?: string;
}

/** 条件分支节点 */
export interface BranchNode {
  type: 'branch';
  id: string;
  cond: Cond;
  then: string;
  else?: string;
}

/** 层结局节点：进入结算 */
export interface EndingNode {
  type: 'ending';
  id: string;
  title: string;
  text: string;
  /** 通关评语类型 */
  verdict: 'truth' | 'wounded' | 'debt';
}

export type LevelNode =
  | DialogueNode
  | ChoiceNode
  | ClueNode
  | PuzzleNode
  | BranchNode
  | EndingNode;

/** 一层地狱的完整剧本 */
export interface Level {
  id: string;
  title: string;
  subtitle: string;
  group: string;
  intro: string;
  startNode: string;
  nodes: LevelNode[];
  /**  基础香火奖励（舌有剩余时另有奖励） */
  baseReward: number;
}
