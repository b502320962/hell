// ============================================
// 第 8 层 · 冰山狱（刑之狱）
// 教学点：谎言代价加码——冰桥上香火是唯一的火种；
//         说实话点香照路（3/4/5 逐段加价），说谎抢火则把同伴推入冰缝
// ============================================

import type { Level } from '../../engine/types';

export const level08: Level = {
  id: 'level08',
  title: '冰山狱',
  subtitle: '第八层 · 刑之狱',
  group: '刑之狱',
  intro: '冰山万丈，寒风裂骨。这里没有刀——冷，比刀更快地要人开口。',
  startNode: 'd1',
  baseReward: 7,
  nodes: [
    {
      type: 'dialogue',
      id: 'd1',
      text: '刀山的血色褪尽，世界成了惨白。一座通体透明的冰山立在面前，山体上凿出一条窄冰桥，三段桥身横在万丈冰缝之上，风从缝里往上灌，吹一口气就结成霜。',
      next: 'd2'
    },
    {
      type: 'dialogue',
      id: 'd2',
      speaker: '引路鬼差',
      text: '鬼差的眉毛都结了冰碴：「冰山狱收的是见死不救、落井下石的魂。这桥上黑灯瞎火，照路的只有一样东西——你兜里的真言香火。点一炷，照一段，寒气自己退开。」',
      next: 'd3'
    },
    {
      type: 'dialogue',
      id: 'd3',
      speaker: '引路鬼差',
      text: '「可每段桥要的香，一段比一段贵。」他哈着白气，「至于不肯点香的……桥上有的是哆嗦着赶路的伴儿。冰鬼盘问时编句瞎话，把人指认成逃犯，鬼差一拥，人一慌，脚下一滑——他怀里的火折子，就成了你的。」',
      next: 'd4'
    },
    {
      type: 'dialogue',
      id: 'd4',
      text: '冰桥入口缩着三个亡魂：一个背着药篓的老翁，一个抱着婴孩的妇人，一个断了半条胳膊的老兵。你裹紧衣襟，踏上第一段冰桥。',
      next: 'span1'
    },

    // —— 第一段桥 ——
    {
      type: 'choice',
      id: 'span1',
      speaker: '冰鬼甲',
      prompt: '冰鬼拦在桥头，声音像两块冰在磨：「站住验身。报上你来处——是阳间寿终正寝、自己走上奈何桥的良魂，还是从刀山上逃下来的罪魂？」你身旁的背药老翁冻得直打颤。',
      options: [
        {
          text: '「我从刀山一路闯来，罪是我的，照实登册。点香照路。」（点燃香火）',
          requireIncense: 3,
          next: 'span1_ok'
        },
        {
          text: '「我是良魂！那背药的老头才是从刀山逃下来的，你们搜他！」',
          isLie: true,
          tonguePenalty: 1,
          incense: 4,
          addDebt: true,
          setFlag: 'pushed_1',
          next: 'span1_lie'
        }
      ]
    },
    {
      type: 'dialogue',
      id: 'span1_ok',
      text: '香火燃起一小团暖光，冰面上的霜花退开三尺，冰桥在脚下清晰起来。背药老翁借着你的光，千恩万谢地跟在后头，一步步挪过了第一段。',
      next: 'span2_intro'
    },
    {
      type: 'dialogue',
      id: 'span1_lie',
      text: '舌上的伤被寒风一激，疼得发黑。冰鬼们扑向背药老翁，老翁后退无路，连人带篓滑进冰缝，一声闷响之后再无声息。你从他滑过的冰面上捡起半袋香火和一只温热的火折子——风小了些。',
      next: 'span2_intro'
    },
    {
      type: 'dialogue',
      id: 'span2_intro',
      text: '第二段桥横在风口正中，气温低得连魂魄都在打颤。抱婴孩的妇人把孩子死死捂在怀里，嘴里不停地哼着什么。',
      next: 'span2'
    },

    // —— 第二段桥 ——
    {
      type: 'choice',
      id: 'span2',
      speaker: '冰鬼乙',
      prompt: '「过这段桥，要报一件你生前最冷的事——是做过的亏心账，还是敢说自己没冷过任何人？想清楚，这桥照的是心冷。」',
      options: [
        {
          text: '「我冷过别人。欠的不还、喊的不应、跪的不扶——账都在，我认。」（点燃香火）',
          requireIncense: 4,
          next: 'span2_ok'
        },
        {
          text: '「我一辈子热心肠！最冷的是这妇人——她怀里的孩子都快冻僵了，她还舍不得点火！」',
          isLie: true,
          tonguePenalty: 1,
          incense: 5,
          addDebt: true,
          setFlag: 'pushed_2',
          next: 'span2_lie'
        }
      ]
    },
    {
      type: 'dialogue',
      id: 'span2_ok',
      text: '香火在风口里摇摇晃晃，却到底没灭。你抱着火走过那段最窄的冰梁，妇人把孩子的脸贴着你的火光，经过你身边时，轻轻说了声「谢谢」。',
      next: 'span3_intro'
    },
    {
      type: 'dialogue',
      id: 'span2_lie',
      text: '冰鬼的爪子搭上妇人肩膀，她惊呼着后退，一脚踩空。下坠的一瞬她把婴孩高高托起——你下意识接住了，她却连同那句没哼完的摇篮曲一起落进冰缝。火折子滚到你脚边，孩子在你怀里哭得撕心裂肺。',
      next: 'span3_intro_lie'
    },
    {
      type: 'dialogue',
      id: 'span3_intro',
      text: '你向最后一段桥攀去。断臂老兵独自坐在桥头，断臂上缠着冻硬的破布，正看着桥下的冰缝发呆。',
      next: 'span3'
    },
    {
      type: 'dialogue',
      id: 'span3_intro_lie',
      text: '你把啼哭的婴孩轻轻放在背风的冰窝中，解下衣襟盖住他，独自向最后一段桥攀去。断臂老兵坐在桥头，断臂上缠着冻硬的破布，正看着桥下的冰缝发呆。他听见孩子的哭声，转头看了你一眼，什么也没问。',
      next: 'span3'
    },

    // —— 第三段桥 ——
    {
      type: 'choice',
      id: 'span3',
      speaker: '冰鬼丙',
      prompt: '「最后一段，过了就是冰山底。问你：这桥到现在，你怀里的火、脚下的路，可有一星半点，是踩着别人换来的？」',
      options: [
        {
          text: '「没有。我的火是我自己的香，我的路是我自己认的账。」（点燃最后一炷香火）',
          requireIncense: 5,
          next: 'span3_ok'
        },
        {
          text: '「那老兵把同桥的人都推下去过！我亲眼所见！你们放我过去，我给你们作证！」',
          isLie: true,
          tonguePenalty: 1,
          incense: 6,
          addDebt: true,
          setFlag: 'pushed_3',
          next: 'span3_lie'
        }
      ]
    },
    {
      type: 'dialogue',
      id: 'span3_ok',
      text: '最后一炷香在冰山底亮起来时，整座冰山的冰缝里同时映出暖光。冰鬼丙退开三步：「一路点香、一路认账——你身上不冷。冰山不留你。」',
      next: 'branch1'
    },
    {
      type: 'dialogue',
      id: 'span3_lie',
      text: '老兵没有挣扎，被冰鬼拖走时回头看了你一眼——那眼神里没有恨，只有一种看透了的平静。他的火折子比前两支都暖，暖得你不敢低头看自己的手。',
      next: 'branch1'
    },

    {
      type: 'branch',
      id: 'branch1',
      // 本层是否把同伴推下过冰桥（层内 flag 判定）
      cond: {
        op: 'or',
        items: [
          { op: 'flag', key: 'pushed_1' },
          { op: 'flag', key: 'pushed_2' },
          { op: 'flag', key: 'pushed_3' }
        ]
      },
      then: 'end_debt',
      else: 'end_good'
    },
    {
      type: 'ending',
      id: 'end_good',
      title: '冰山狱 · 通行',
      text: '冰山的寒气在身后合拢。你的香火烧得只剩最后一点，可那点光把身后整条冰桥照得透亮——老翁、妇人、老兵，都借着这段光走了出来。前方忽然一热，油香混着焦糊味扑来，油锅狱到了。',
      verdict: 'truth'
    },
    {
      type: 'ending',
      id: 'end_debt',
      title: '冰山狱 · 负债通行',
      text: '你揣着抢来的火种滑下冰山，身上很暖，舌头很疼。冰桥你过来了，可桥上那些被你指认、被你推下去的亡魂，一个都没能走到头。冰缝深处没有声音——可你每走一步，都觉得背后有人在冰里看着你。前方油香扑面，最后一座刑狱到了。',
      verdict: 'debt'
    }
  ]
};
