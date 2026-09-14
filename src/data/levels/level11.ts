// ============================================
// 第 11 层 · 石压狱（冤之狱 中层 · 义谎机制核心层）
// 机制：真话独木桥（案情连续提问）+ 义谎抉择
// 冤之狱铁律：阳间未翻案，地狱不能改判；但"亲见忏悔"的证人证可破律
// 分支：义谎救人→义债通行；真言不救→带伤通行；真话独木桥失败→带伤
// ============================================

import type { Level } from '../../engine/types';

export const level11: Level = {
  id: 'level11',
  title: '石压狱',
  subtitle: '第十一层 · 冤之狱',
  group: '冤之狱',
  intro: '石殿阴冷，殿中央一块块青石板层层叠起，石板下压着人影。最大那块下压着一个孕妇，腹隆起，孩子未生，母亲已被阳间判了杀夫之罪。',
  startNode: 'd1',
  baseReward: 9,
  nodes: [
    {
      type: 'dialogue',
      id: 'd1',
      speaker: '引路鬼差',
      text: '「石压狱到了。」鬼差压低声，「这层难——前面你只需识真凶，这层要你救人。」',
      next: 'd2'
    },
    {
      type: 'dialogue',
      id: 'd2',
      text: '殿中央一块巨石压着一名孕妇，腹隆如鼓，眼紧闭，唇干裂。石板四面压着十余小石，每个小石下都是另一个魂——据说生前皆冤死，被阳间判了杀夫、弑亲、谋命，刑后魂魄层层同压，叫作『冤压冤』。',
      next: 'd3'
    },
    {
      type: 'dialogue',
      id: 'd3',
      speaker: '判官',
      text: '「这孕妇姓苏，阳间清河县人。三年前其夫夜归醉酒，持棍打她，她夺棍时夫撞桌角而死。婆婆报官，只说『儿媳杀夫』。县令依『杀夫者凌迟』问斩，腹中胎儿按律同罪。案结，婆婆疯了，见人就喊『我儿是我儿』。」',
      next: 'd4'
    },
    {
      type: 'dialogue',
      id: 'd4',
      speaker: '判官',
      text: '「地狱律法有一条铁线：阳间未翻案，地狱不能改判——除非有人证说『亲见阳间真凶忏悔』，可破律改判。但这案子的真凶是苏氏自己夺棍，要说『亲见忏悔』，必得是有人亲眼看见苏氏或婆婆临终忏悔——而阳间没人见过。」判官抬眼，「所以这层难，新魂：你只能凭良心。」',
      next: 'clue1'
    },
    {
      type: 'clue',
      id: 'clue1',
      clue: {
        id: 'clue_verdict',
        kind: 'evidence',
        title: '清河县判词',
        source: '清河县 · 旧档',
        text: '「苏氏杀夫，依律凌迟，腹中胎儿同罪。」——验仵作注：「夫撞桌角，额角骨碎；其妻身上棒痕新旧十数处，皆前事所受。」'
      },
      next: 'clue2'
    },
    {
      type: 'clue',
      id: 'clue2',
      clue: {
        id: 'clue_mother_in_law',
        kind: 'testimony',
        title: '婆婆临终疯语',
        source: '清河县 · 邻里口述',
        text: '婆婆临终前三日，见人就喊：「我儿是我儿——可他打媳妇那棍子，是我从小教他的！」邻人皆当疯话，无人当真录下。'
      },
      next: 'clue3'
    },
    {
      type: 'clue',
      id: 'clue3',
      clue: {
        id: 'clue_su_appeal',
        kind: 'testimony',
        title: '苏氏狱中口供',
        source: '石压狱 · 苏氏',
        text: '「妾身不告婆婆一句——她临终那三句疯话，妾身在堂下听得明白。她若不疯，未必肯认是自己教的。妾身腹中胎儿无辜，求大人……救孩子，不必救妾身。」'
      },
      next: 'd5'
    },
    {
      type: 'dialogue',
      id: 'd5',
      speaker: '判官',
      text: '判官把卷宗一推：「这案子真凶是谁，律法已判，本不该再问。可本官要考你一件事——你说，这案里，是不是真有一个人，是『有罪』的？答错一句，妄言扣舌。」',
      next: 'puzzle1'
    },
    {
      type: 'puzzle',
      id: 'puzzle1',
      successNext: 'd6',
      puzzle: {
        kind: 'truthBridge',
        prompt: '真话独木桥：判官连续发问，每一句都要如实作答。',
        questions: [
          {
            id: 'q1',
            prompt: '「苏氏夺棍，夫撞桌角而死——按律，算不算她杀夫？」',
            options: [
              { text: '「按律算。律法不看前因，只看结果。」' },
              { text: '「不算。她并非有意杀夫，是自卫失手。」', isLie: true }
            ]
          },
          {
            id: 'q2',
            prompt: '「婆婆临终说『那棍子是我从小教他的』——这话算不算忏悔？」',
            options: [
              { text: '「算。她肯认是自己教的，便是忏悔一分。」' },
              { text: '「不算。她是疯话，做不得数。」', isLie: true }
            ]
          },
          {
            id: 'q3',
            prompt: '「你，亲眼见过婆婆临终吗？」',
            options: [
              { text: '「我没见过。我是新魂，与她阳间无涉。」' },
              { text: '「我见过，亲耳听见她忏悔。」', isLie: true }
            ]
          }
        ],
        hint: '律法归律法，事实归事实。律法算她杀夫，但婆婆疯话里那句『是我教的』，确是忏悔一分——这点不能因『疯』二字就抹去。至于你有没有见过，那是你自己的事。',
        successText:
          '独木桥走完，三句句句如实。判官搁下笔：「律法归律法，事实归事实——你既肯认婆婆的疯话算忏悔一分，那这案子还有一线。」',
        failText:
          '石板轰地压下半寸，孕妇闷哼一声。判官斥道：「律法归律法，事实归事实——若连婆婆疯话是不是忏悔都要替她抹去，你救的是面子，不是命！妄言！」'
      }
    },
    {
      type: 'dialogue',
      id: 'd6',
      speaker: '判官',
      text: '判官合上独木桥的卷，沉声道：「你既认婆婆疯话算忏悔一分，本官便能凭这条，破律改判——但还需要一个证人，肯当堂说一句：『我亲见婆婆临终忏悔』。」',
      next: 'd7'
    },
    {
      type: 'dialogue',
      id: 'd7',
      text: '殿上一时静得能听见石板下孕妇的呼吸。判官看着你，眼底第一次有点暖色：「新魂，这条律破得不公——你若作这个证，孕妇脱罪，胎儿免压；可你没亲见过，这话是谎。地狱律法虽对义谎不扣舌，但累一条义债，跟着你走完十八层。」',
      next: 'choice_witness'
    },
    {
      type: 'choice',
      id: 'choice_witness',
      speaker: '判官',
      prompt: '「新魂，你肯作这个证吗？」',
      options: [
        {
          text: '「我没亲见过，不敢作证——但求大人，留苏氏一命，等阳间真有人翻案。」',
          setFlag: 'truth_no_witness',
          next: 'truth_end'
        },
        {
          text: '「我亲眼见过。婆婆临终喊『是我教的』，我亲耳听见，愿为苏氏作证。」',
          righteousLie: true,
          setFlag: 'righteous_witness',
          setGlobalFlag: 'global_righteous_debt_11',
          next: 'righteous_end'
        }
      ]
    },
    {
      type: 'dialogue',
      id: 'truth_end',
      text: '判官落笔，石板没动，孕妇睁眼看了你一眼，眼里没有怨，只有一种很旧的认命。她张了张嘴，没出声——腹中胎儿动了一下，又被石板压了回去。',
      next: 'd8'
    },
    {
      type: 'dialogue',
      id: 'righteous_end',
      text: '判官落笔，符字在石板上空炸开一团血光，却没有伤你半分——只是你身后仿佛凭空多出一条无形的债。巨石轰地抬起半寸，孕妇腹中胎儿哇地一声哭出来，响彻石殿。鬼差把孩子抱起，递到苏氏怀里。她抬头看你，泪流满面，没说一个字。',
      next: 'd8'
    },
    {
      type: 'dialogue',
      id: 'd8',
      speaker: '判官',
      text: '「石压狱这层，难就难在这儿。」判官送你出殿，「真话救不了所有命，有时救命的恰是一句谎——可地狱律法认『债』不认『心』，义谎不扣舌，但要还。你这一债，能不能还清，看后头七层。」',
      next: 'branch1'
    },

    {
      type: 'branch',
      id: 'branch1',
      cond: { op: 'flag', key: 'righteous_witness' },
      then: 'end_righteous',
      else: 'branch2'
    },
    {
      type: 'branch',
      id: 'branch2',
      cond: { op: 'eq', key: 'tongue', value: 3 },
      then: 'end_good',
      else: 'end_wounded'
    },
    {
      type: 'ending',
      id: 'end_good',
      title: '石压狱 · 通行',
      text: '你出了石殿，舌没伤，心里却沉。孕妇那没出声的一眼，比债还重。前方雾色更黄，舂臼狱的捣药声一下下传来——第十二层到了。',
      verdict: 'truth'
    },
    {
      type: 'ending',
      id: 'end_wounded',
      title: '石压狱 · 带伤通行',
      text: '你捂着舌伤离开石殿。判官那句『义谎不扣舌，但要还』在耳边盘旋。前方雾里，舂臼狱的捣药声一下下传来——第十二层到了。',
      verdict: 'wounded'
    },
    {
      type: 'ending',
      id: 'end_righteous',
      title: '石压狱 · 义债通行',
      text: '你出了石殿，舌没伤，身后却跟着一条看不见的债——那是为救一个未生的孩子、一个被冤压的母亲撒的谎。判官说『义谎不扣舌，但要还』。前方雾色昏黄，舂臼狱的捣药声一下下传来——第十二层到了。',
      verdict: 'debt'
    }
  ]
};
