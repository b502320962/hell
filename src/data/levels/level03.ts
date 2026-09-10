// ============================================
// 第 3 层 · 铁树狱（舌之狱 终层）
// 教学点：物证矛盾（evidence）、条件谎言 lieCond——
//         已掌握验状真相仍附和谎话，即为"明知故谎"，照样拔舌
// ============================================

import type { Level } from '../../engine/types';

export const level03: Level = {
  id: 'level03',
  title: '铁树狱',
  subtitle: '第三层 · 舌之狱',
  group: '舌之狱',
  intro: '铁树高耸，枝叶皆是刀刃。离间骨肉、伪证栽赃者，抱树而死。',
  startNode: 'd1',
  baseReward: 6,
  nodes: [
    {
      type: 'dialogue',
      id: 'd1',
      text: '石阶尽头立着一棵望不到顶的黑铁树，每片叶子都是一把小刀，风一过，满树刀叶轻响，像无数人在咬耳朵。',
      next: 'd2'
    },
    {
      type: 'dialogue',
      id: 'd2',
      speaker: '引路鬼差',
      text: '「铁树狱，专收一种人——靠一张嘴把活人说进棺材、把死人说成活人的。」鬼差压低声音，「今儿树上吊着的案子新鲜，判官点了你陪审。仔细着，这案里的人，个个都抢着认。」',
      next: 'd3'
    },
    {
      type: 'dialogue',
      id: 'd3',
      text: '堂上跪着两个亡魂：一个是穿素的大太太，一个是披红的二姨太。她俩生前共事一夫——王掌柜。王掌柜七日前暴毙在书房，七窍流血，是砒霜。',
      next: 'd4'
    },
    {
      type: 'dialogue',
      id: 'd4',
      speaker: '大太太',
      text: '「人是我害的！」大太太把头磕得梆梆响，「那晚的银耳羹是我亲手炖、亲手守着灶端上去的，老爷当晚就喝了，一口没剩。砒霜是我下的，要杀要剐，冲我来！」',
      next: 'd5'
    },
    {
      type: 'dialogue',
      id: 'd5',
      speaker: '二姨太',
      text: '二姨太跪在一旁，脸色白得像纸，却一言不发。判官问她，她只低低说了一句：「我那夜在佛堂念经，为老爷祈福，一直念到三更天。」',
      next: 'd6'
    },
    {
      type: 'dialogue',
      id: 'd6',
      speaker: '判官',
      text: '判官把一卷黄纸推到你面前：「阳间仵作的验状，先收进你的因果簿。大太太口口声声认杀人，可本官断案，不认嘴，认证据。」',
      next: 'clue1'
    },
    {
      type: 'clue',
      id: 'clue1',
      clue: {
        id: 'clue_wuzhuang',
        kind: 'evidence',
        title: '仵作验状',
        source: '阳间县衙 · 仵作',
        text: '王掌柜尸身七窍流血，确为砒霜之毒。剖验胃中，仅有酸枣糕残渍，未见银耳羹余物。'
      },
      next: 'd7'
    },
    {
      type: 'dialogue',
      id: 'd7',
      speaker: '判官',
      text: '「带证人。」一个瑟瑟发抖的小丫鬟被牵上堂来，跪在地上把话往因果簿里送——',
      next: 'clue2'
    },
    {
      type: 'clue',
      id: 'clue2',
      clue: {
        id: 'clue_yahuan',
        kind: 'testimony',
        title: '小丫鬟证词',
        source: '王府 · 扫地丫鬟',
        text: '三更天奴婢起夜，瞧见二姨太端着一碟酸枣糕往书房去，边走边回头望，样子很慌张。奴婢不敢多问。'
      },
      next: 'd8'
    },
    {
      type: 'dialogue',
      id: 'd8',
      speaker: '判官',
      text: '判官看向你：「新魂，因果簿里两证在案。大太太说的话里，哪一句与验尸结果相冲？指出来。指错了，同你妄言之罪。」',
      next: 'puzzle1'
    },
    {
      type: 'puzzle',
      id: 'puzzle1',
      successNext: 'd9',
      puzzle: {
        kind: 'contradiction',
        prompt: '比对因果簿中的《仵作验状》，点破大太太话里与验尸结果相冲的谎话。',
        refClueId: 'clue_wuzhuang',
        hint: '验状写得明白：胃中只有酸枣糕残渍，没有银耳羹。可大太太说老爷把羹喝得"一口没剩"。',
        statements: [
          {
            id: 'stmt_1',
            speaker: '大太太',
            text: '「那晚的银耳羹是我亲手炖、亲手守着灶端上去的，老爷当晚就喝了，一口没剩。」'
          },
          {
            id: 'stmt_2',
            speaker: '大太太',
            text: '「我入王家二十年，操持内务，自问没有半点对不起这个家。」'
          },
          {
            id: 'stmt_3',
            speaker: '二姨太',
            text: '「我那夜在佛堂念经，为老爷祈福，一直念到三更天。」'
          }
        ],
        answerStatementId: 'stmt_1',
        successText:
          '你指得对。验状上胃里只有酸枣糕——若真"一口没剩"喝了银耳羹，胃中岂会半羹不见？大太太这句"认罪"，是句编出来的谎。',
        failText: '判官将惊堂木重重一拍：「验状在此，尸骨无伤于你指的这句！证据之外，皆是妄言。」'
      }
    },
    {
      type: 'dialogue',
      id: 'd9',
      text: '大太太浑身一颤，瘫在地上，终于哭出了真话：那碗羹里她只下了安眠药，想让老爷睡死过去好让二姨太回娘家避风头；老爷嫌甜，原封未动让人撤了。她知道砒霜在酸枣糕里——她是想把杀人的罪名，整个替二姨太扛过去。',
      next: 'd10'
    },
    {
      type: 'dialogue',
      id: 'd10',
      speaker: '判官',
      text: '判官目光如电，转向你：「大太太护人心切，还在堂上喊着"老爷喝了羹"。你手里攥着验状——本官问你：那碗羹，王老爷到底喝没喝？」',
      next: 'choice1'
    },
    {
      type: 'choice',
      id: 'choice1',
      speaker: '判官',
      prompt: '大太太跪在一旁，满眼哀求地望着你。堂上一片死寂。',
      options: [
        {
          text: '「喝了。她炖的羹，老爷当晚确实喝了——案子就按她认的结了吧。」',
          // 已持验状（胃中无羹）仍附和谎话 = 明知真相而说谎
          lieCond: { op: 'hasClue', value: 'clue_wuzhuang' },
          tonguePenalty: 1,
          next: 'd11_bad'
        },
        {
          text: '「没喝。验状写得清楚，胃里只有酸枣糕。要查，就该查那碟往书房去的糕。」',
          incense: 3,
          setFlag: 'truth_at_tree',
          next: 'd11_good'
        }
      ]
    },
    {
      type: 'dialogue',
      id: 'd11_bad',
      text: '铁树立刻"嗡"地一震，一片刀叶贴着你耳边钉进柱子。符字亮得刺眼——验状在簿，你却睁着眼说羹被喝了。这一舌，剪得不冤。大太太愣住了，哭声噎在喉咙里。',
      next: 'd11b2'
    },
    {
      type: 'dialogue',
      id: 'd11b2',
      speaker: '判官',
      text: '判官冷笑一声，根本不接你的话：「你以为替她瞒一句，就能改了验状？胃中残渍是酸枣糕，丫鬟三更天亲眼见人端糕去书房——二姨太，证据链已合，你招是不招？」二姨太瘫软在地，再不敢抵赖。',
      next: 'd12'
    },
    {
      type: 'dialogue',
      id: 'd11_good',
      text: '二姨太"扑通"一声伏倒在地，终于招了：酸枣糕里的砒霜是她下的。大太太替她顶罪，她便咬着牙不出声。铁树刀叶哗哗作响，像满堂看客在窃窃私语。',
      next: 'd12'
    },
    {
      type: 'dialogue',
      id: 'd12',
      speaker: '判官',
      text: '判官合上册子：「铁树之下，谎话救不了任何人。大太太以谎护凶，同罪；二姨太毒杀亲夫，抱树。至于你——」他看了你许久，「舌之狱三层走完了。会识谎，敢承谎，更要在满堂哀求里说真话。往下，镜之狱。」',
      next: 'branch1'
    },
    {
      type: 'branch',
      id: 'branch1',
      cond: { op: 'flag', key: 'truth_at_tree' },
      then: 'end_good',
      else: 'end_wounded'
    },
    {
      type: 'ending',
      id: 'end_good',
      title: '铁树狱 · 通行',
      text: '铁树在身后缓缓合拢刀叶。雾的尽头第一次有了光——不是火光，是一面大得照天照地的镜子，正悬在第四层的坊门前。',
      verdict: 'truth'
    },
    {
      type: 'ending',
      id: 'end_wounded',
      title: '铁树狱 · 带伤通行',
      text: '你捂着舌伤走下石阶。满堂哀求的眼睛你没能顶住——可在地狱里，心软从来不是说谎的凭据。前方雾气散开，一面遮天巨镜正冷冷地照着来路。',
      verdict: 'wounded'
    }
  ]
};
