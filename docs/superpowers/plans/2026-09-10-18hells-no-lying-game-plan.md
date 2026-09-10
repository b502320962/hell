# 《十八层地狱：这里禁止说谎》实施计划

- 日期：2026-09-10
- 依据：[设计文档](../specs/2026-09-10-18hells-no-lying-game-design.md)
- 技术栈：Taro 4 + React 18 + TypeScript + Zustard/Zustand，构建目标微信小程序

## 总体阶段

| 阶段 | 内容 | 交付物 | 验证方式 |
|------|------|--------|----------|
| P0 | 项目脚手架 | 可编译运行的 Taro 小程序骨架 | `npm run dev:weapp` 编译通过，微信开发者工具可打开 |
| P1 | 引擎核心 | 剧本解释器 + 规则引擎 + 存档 | Vitest 单测全部通过 |
| P2 | 通用 UI 组件 | 对话气泡/选项/因果簿/谜题宿主等 | 开发者工具中渲染检查 |
| P3 | 页面串联 | 5 页面 + 分包加载 + 第 1 层全流程可玩 | 真机/开发者工具完整通关第 1 层 |
| P4 | 内容生产 | 十八层 JSON + 插图（分 4 批） | schema 校验脚本 + 每批真机试玩 |
| P5 | 整合提审 | 包体达标、性能过关、提审材料 | 包体分析 + 预览版走查 |

## P0 项目脚手架

- [ ] `npx @tarojs/cli init`（React + TS 模板，pnpm），项目名 `hells-eighteen`
- [ ] 配置 `app.config.ts`：5 个主包页面 + 3 个分包（subA: levels4-9 / subB: levels10-15 / subC: levels16-18+ending），导航栏自定义暗色样式
- [ ] 建立设计令牌：`#0d0d10` 底 / `#b03a2e` 朱砂 / `#c9a227` 青铜金，全局字体描边阴影 mixin
- [ ] 引入 Zustand、Vitest（jsdom 环境，mock `Taro.getStorage` 等原生接口）
- [ ] 目录骨架：`engine/ data/levels/ components/ pages/ assets/`
- 验证：编译产物在微信开发者工具中显示首页占位

## P1 引擎核心（不含任何剧情）

- [ ] `data/levels/schema.ts`：节点类型定义（dialogue/choice/clue/puzzle/branch/ending）、Level 剧本类型、五种谜题模板的参数类型
- [ ] `engine/conditions.ts`：条件求值器。**注意：小程序禁用 eval/new Function**，实现一个手写小型表达式解析器（支持 `&& || ! >= <= ==` 与变量 tongue/incense/debt/flags），或采用结构化条件对象（推荐，见风险 R1）
- [ ] `engine/GameState.ts`：Zustand store——舌(3)、香火、因果簿、谎言债务、层进度、flags 表、结局变量
- [ ] `engine/RuleEngine.ts`：
  - 谎言判定：`isLie` 选项结合上下文条件（已知真相而否认才算谎）
  - 对质判定：证据匹配 → 现形；不匹配 → 扣舌（妄言）；同矛盾点错两次给提示
  - 惩罚结算：拔舌（含受刑支线跳转）、层失败重来（谜题进度保留）
- [ ] `engine/Interpreter.ts`：节点流执行器——顺序推进、choice 分发、clue 入簿、puzzle 委托、branch 条件跳转、ending 出口；支持节点 id 寻址与受刑支线插入
- [ ] `engine/SaveManager.ts`：微信 `setStorage/getStorage`，存档带版本号；损坏档备份旧档+新开档+弹窗告知；重大选择与层通关触发自动保存；预留云同步接口
- [ ] Vitest 单测：conditions（边界表达式）、RuleEngine（谎/对质/扣舌/续命）、Interpreter（各节点类型流转、branch 跳转、失败重开）、SaveManager（存读、版本、损坏恢复）
- 验证：`npm run test` 全绿

## P2 通用 UI 组件

- [ ] `DialogueBubble`：深色半透明 0.92 / 圆角 14px / 左对齐 / 无滚动条；长文本按屏分段，点击翻页，完整显示
- [ ] `ChoiceList`：真话/谎话选项无视觉标记，选后结算时揭示
- [ ] `TopStatusBar`：单行极简 `舌 ×3 ｜ 香火 ×N ｜ 因果簿`，不做多余状态条
- [ ] `ClueBookDrawer`：抽屉式证词/物证卡片列表，支持长按两张卡片进入比对态
- [ ] `PuzzleHost`：五种谜题模板组件——矛盾指认 / 真话独木桥 / 镜中找异 / 审判定罪 / 谎言代价，统一回调接口（提交答案 → RuleEngine 结算）
- [ ] `LevelMap`（图鉴页用）：纵深向下的塔，已通关层亮起、未解锁层雾中坊门、收集度标记
- 验证：独立 story 页临时挂载检查渲染与交互

## P3 页面串联

- [ ] `pages/index`：阴阳封面，进入/继续进度（读档跳转）
- [ ] `pages/gallery`：LevelMap + 点击未加载分包触发异步加载，加载中态"雾气散去中…"
- [ ] `pages/game`：Interpreter 驱动的层内主页面，串联 DialogueBubble/ChoiceList/TopStatusBar/ClueBookDrawer/PuzzleHost
- [ ] `pages/settlement`：层通关评语（真言之魂/带伤过关…）+ 香火结算 + 下一层入口
- [ ] `pages/ending`：多结局演出 + 图鉴解锁回写
- [ ] 第 1 层「拔舌狱」JSON 剧本（教学层：守规+证词矛盾+对质全流程）
- 验证：开发者工具完整通关第 1 层；杀进程重开能续档；真机预览

## P4 内容生产（最大工作量，分 4 批）

每层内容 = 1 个 JSON 剧本 + 1 主场景图 + 2-3 物件图（WebP ≤1.5MB）+ 层内音效。

- [ ] 脚本 `scripts/validate-level.mjs`：按 schema 校验全部 JSON（节点引用完整性、条件变量合法性、矛盾点数量 2-4）
- [ ] 批次 A（并入主包）：层 2-3「舌之狱」剩余 + 联调
- [ ] 批次 B（subA）：层 4-6「镜之狱」、层 7-9「刑之狱」——引入镜中找异、资源管理玩法
- [ ] 批次 C（subB）：层 10-12「冤之狱」、层 13-15「忏之狱」——审判定罪、必须说谎的"谎言债务"关卡、多分支
- [ ] 批次 D（subC）：层 16-18「审之狱」+ 4 结局 + 第 18 层身份反转演出 + 伏笔回收清单核对
- [ ] 每批完成后：schema 校验 + 开发者工具走查 + 一次真机试玩记录
- 验证：validate-level 全过；每批试玩记录归档 `docs/superpowers/plans/test-notes.md`

## P5 整合提审

- [ ] 包体分析：主包 <1.5MB（留余量），总分包 <25MB；超限则压图/拆包
- [ ] 性能：分包预热 `preloadRule`；首屏 <2s；内存占用真机检查（插图及时释放）
- [ ] 完整通关走查：18 层 × 4 结局路径抽查（至少覆盖每个结局一次）
- [ ] 提审材料：小程序类目（游戏类需注意资质要求，见风险 R3）、隐私协议、用户测试账号说明
- 验证：微信开发者工具"代码质量分析"无高危项；提审通过

## 风险与对策

| # | 风险 | 对策 |
|---|------|------|
| R1 | 小程序禁 eval/new Function，设计文档中的"条件表达式"需重新落地 | P1 直接实现为结构化条件对象（`{op:"and", items:[...]}`），schema 同步定义；文档表述以实现为准 |
| R2 | 十八层文案量大，中途质量衰减 | 先写每层"谜题骨架 + 矛盾点表"再填文案；每批保留试玩记录；配角台词建术语表保持口吻 |
| R3 | 微信对游戏类小程序要求资质（软著/版号问题） | 若无资质，提审时以"互动阅读/文字解谜"类目尝试或先做体验版自用；上线策略由用户决策 |
| R4 | AI 插图风格不一致 | 固定同一组风格提示词与负面词；主场景先出 3 张定基准再批量生成 |

## 当前状态

- 已完成：设计文档（specs/2026-09-10-18hells-no-lying-game-design.md）
- 下一步：P0 脚手架
