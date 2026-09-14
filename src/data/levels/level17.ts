// ============================================
// 第 17 层 · 石磨狱（审之狱 中层）
// 机制：镜中找异（识破陈年冤案里"证据凑补"）+ 审判抉择
// 审之狱铁律：审判陈年旧案，须先识"证据凑补"——补的证据判不得人
// 分支：凭原证判真凶→真言通行；据补证妄判→恶债通行；据所愿宽判→灼舌债通行
// ============================================

import type { Level } from '../../engine/types';

export const level17: Level = {
  id: 'level17',
  title: '石磨狱',
  subtitle: '第十七层 · 审之狱',
  group: '审之狱',
  intro: '石磨盘大二丈，磨眼里跪着一名白发老妇。磨盘缓缓转动，磨着她的膝盖。她抬头看见你，眼里没有怨，只有一种很旧的认命——三十年的认命。',
  startNode: 'd1',
  baseReward: 12,
  nodes: [
    {
      type: 'dialogue',
      id: 'd1',
      speaker: '引路鬼差',
      text: '「石磨狱到了。」鬼差把铜铃攥在手里，「这层审的是陈年旧案——案子结了三十年，证据却有几处后来『补』的。补的证据判不得人，你须先识。」',
      next: 'd2'
    },
    {
      type: 'dialogue',
      id: 'd2',
      text: '石磨盘缓缓转动，磨眼里跪着一名白发老妇，膝盖被磨得见骨。她叫周氏，三十年前阳间被以"毒杀亲夫"问斩，案结三十年，魂魄下了石磨狱。今年春阳间新县令翻案，从邻县抄出一封真凶口供——真凶招认此案。可周氏冤案翻得不顺，因为当年堂上证据里，有几处是后来『补』的。',
      next: 'd3'
    },
    {
      type: 'dialogue',
      id: 'd3',
      speaker: '判官',
      text: '判官把一本卷宗推到案上：「周氏案当年三件证据：一、仵作验毒记录；二、邻里证词；三、周氏自家供状。可这本卷宗里，有一处证据是三十年前原档没有、后来堂上『补』的——你须从铜镜里识出来，否则据补证判人，便是恶债。」',
      next: 'clue1'
    },
    {
      type: 'clue',
      id: 'clue1',
      clue: {
        id: 'clue_coroner_original',
        kind: 'evidence',
        title: '仵作验毒原档',
        source: '阳间 · 旧档',
        text: '「夫死三日验尸，未见毒痕，注『病故』。三年后翻案时，仵作补记一页『复验见砒霜痕』，笔迹与前页异，墨色亦异。」'
      },
      next: 'clue2'
    },
    {
      type: 'clue',
      id: 'clue2',
      clue: {
        id: 'clue_neighbor_appeal',
        kind: 'testimony',
        title: '邻里证词',
        source: '阳间 · 旧档',
        text: '「邻里王婆、李四、张三各执一词：『亲见周氏下毒。』三人证词笔迹相同，疑为衙门代录，未按指模。」'
      },
      next: 'clue3'
    },
    {
      type: 'clue',
      id: 'clue3',
      clue: {
        id: 'clue_zhou_appeal',
        kind: 'testimony',
        title: '周氏喊冤状',
        source: '石磨狱 · 周氏口供',
        text: '「妾身未下毒，亦未认罪。当年堂上供状是衙役代写，按妾身手印。妾身三十年喊冤，无人肯听——今年春真凶招认，妾身冤方翻，可案卷里那页『复验见砒霜痕』，分明是三十年后补的。」'
      },
      next: 'clue4'
    },
    {
      type: 'clue',
      id: 'clue4',
      clue: {
        id: 'clue_real_killer_17',
        kind: 'evidence',
        title: '邻县真凶口供',
        source: '邻县衙门 · 新档',
        text: '「周氏夫死一案，是我下的毒。我为谋周家家产，三年间分四次投砒霜入其汤药。当年邻里王、李、张三人，皆为我所贿，代录证词为我亲笔。仵作原档记『病故』，亦为我贿赂所得——后补那页『复验见砒霜痕』，是为翻案时混淆视听，非当年原档。」'
      },
      next: 'd4'
    },
    {
      type: 'dialogue',
      id: 'd4',
      speaker: '判官',
      text: '判官挥手，石磨前升起一面大铜镜：「镜中映的是当年堂上三件证据——你须从镜中四景里，找出哪一处是后来『补』的，而非当年原档。补的证据判不得人，识出补证，方能凭原证断真凶。」',
      next: 'puzzle1'
    },
    {
      type: 'puzzle',
      id: 'puzzle1',
      successNext: 'd5',
      puzzle: {
        kind: 'mirrorSpot',
        prompt: '镜中映出四个画面——找出哪一处证据是后来「补」的，而非当年原档。',
        scenes: [
          {
            id: 'scene_coroner_original',
            label: '仵作原档 · 病故',
            text: '镜中：仵作原档一页，注『病故』，笔迹老到，墨色陈旧，按指模。'
          },
          {
            id: 'scene_coroner_added',
            label: '仵作补记 · 砒霜痕',
            text: '镜中：仵作补记一页『复验见砒霜痕』，笔迹与前页异，墨色亦新。'
          },
          {
            id: 'scene_neighbor_appeal',
            label: '邻里证词 · 笔迹同',
            text: '镜中：邻里王、李、张三人证词，笔迹全同，未按指模。'
          },
          {
            id: 'scene_zhou_confess',
            label: '周氏供状 · 衙役代写',
            text: '镜中：周氏供状一页，衙役代写，按手印，墨色不均。'
          }
        ],
        answerId: 'scene_coroner_added',
        hint: '仵作原档『病故』是当年所记，笔迹墨色陈旧——这是真。邻里证词笔迹同、未按指模——虽是假证，却也是当年堂卷所录，非后来『补』的。周氏供状衙役代写——亦当年堂卷所录。唯独那页『复验见砒霜痕』，笔迹墨色与前页异，是三十年后翻案时补的——这才是『补证』。',
        successText:
          '镜中那页「复验见砒霜痕」一下碎开——笔迹墨色与前页异，分明是三十年后补的。真凶口供说得明白：仵作原档『病故』是为他贿赂所得，后补那页『复验见砒霜痕』是为翻案时混淆视听。补证既破，原证自明——周氏冤，真凶邻县那一位。',
        failText:
          '判官摇头：「邻里证词、周氏供状虽是假证，却都是当年堂卷所录，非后来『补』的——唯有那页『复验见砒霜痕』，笔迹墨色与前页异，是三十年后补的。不识补证，据以判人，便是恶债。」'
      }
    },
    {
      type: 'dialogue',
      id: 'd5',
      text: '周氏在磨眼里抬起头，眼里的认命散了三分，换上一种很旧的希望。判官将石判令递到你手里：「新魂，补证既破，原证自明——你肯不肯凭原证，发落石判令？」',
      next: 'choice_judge'
    },
    {
      type: 'choice',
      id: 'choice_judge',
      speaker: '判官',
      prompt: '判官问：「新魂，石判令给谁？」',
      options: [
        {
          text: '「石判令给真凶——邻县那位。周氏冤三十年，凭原证昭雪，下石磨。」',
          setFlag: 'truth_judge_17',
          setGlobalFlag: 'global_truth_judge_17',
          next: 'truth_end'
        },
        {
          text: '「石判令给周氏。她夫死她便是嫌犯，三十年未翻案前她是凶手——下石磨。」',
          isLie: true,
          tonguePenalty: 1,
          addDebt: true,
          setGlobalFlag: 'global_evil_debt',
          setFlag: 'wrong_judge_17',
          next: 'wrong_end'
        },
        {
          text: '「石判令谁都不给。案子结了三十年，再翻也没意思——宽周氏一宽，宽真凶一宽，都放过去。」',
          isLie: true,
          tonguePenalty: 1,
          setGlobalFlag: 'global_burn_tongue_debt',
          setFlag: 'misjudge_17',
          next: 'misjudge_end'
        }
      ]
    },
    {
      type: 'dialogue',
      id: 'truth_end',
      text: '石判令掷下，磨盘轰地翻转。邻县真凶的魂被石磨一卷，闷哼一声没了声息。周氏膝盖从磨眼里脱出，朝你磕了三个头，没出声。判官摆手：「别谢他，谢那本仵作原档。」',
      next: 'd6'
    },
    {
      type: 'dialogue',
      id: 'wrong_end',
      text: '石判令掷下，磨盘轰地翻转——可被卷进磨眼的却是冤了三十年的周氏。真凶在台下抖着嘴笑了一下，眼里那点侥幸，比石磨还重。袖中那条恶债沉得像一块烙铁——据补证判人，便是恶债。',
      next: 'd6'
    },
    {
      type: 'dialogue',
      id: 'misjudge_end',
      text: '判官冷笑：「违心宽判。」符字在石磨上空炸开一团血光，一条舌当场被拔。周氏在磨眼里又沉下半截，抬眼看了你一眼，没说话。身后多出一条看不见的灼舌债——审判者违心宽判，比妄判更累债。',
      next: 'd6'
    },
    {
      type: 'dialogue',
      id: 'd6',
      speaker: '判官',
      text: '「石磨狱这层过了。」判官送你出殿，「石磨试你识不识得『补证』——补的证据判不得人，据补证判人便是恶债。后头一层，是十八层最后一层——最难的，留在最后。」',
      next: 'branch1'
    },

    {
      type: 'branch',
      id: 'branch1',
      cond: { op: 'flag', key: 'wrong_judge_17' },
      then: 'end_evil',
      else: 'branch2'
    },
    {
      type: 'branch',
      id: 'branch2',
      cond: { op: 'flag', key: 'misjudge_17' },
      then: 'end_burn',
      else: 'branch3'
    },
    {
      type: 'branch',
      id: 'branch3',
      cond: { op: 'eq', key: 'tongue', value: 3 },
      then: 'end_good',
      else: 'end_wounded'
    },
    {
      type: 'ending',
      id: 'end_good',
      title: '石磨狱 · 真判通行',
      text: '你出了石磨殿，舌没伤，债也没欠。周氏那三个没出声的头，比方才所有磨盘都重。前方雾色由灰转黑，刀锯狱的锯齿声一声声传来——第十八层，最后一层到了。',
      verdict: 'truth'
    },
    {
      type: 'ending',
      id: 'end_wounded',
      title: '石磨狱 · 带伤通行',
      text: '你捂着舌伤离开石磨殿。判官那句『补证判不得人』在耳边盘旋。前方雾色由灰转黑，刀锯狱的锯齿声一声声传来——第十八层，最后一层到了。',
      verdict: 'wounded'
    },
    {
      type: 'ending',
      id: 'end_burn',
      title: '石磨狱 · 灼舌债通行',
      text: '你出了石磨殿，身后多了一条看不见的灼舌债——那是违心宽判所累。判官说『违心宽判，比妄判更累债』。前方雾色由灰转黑，刀锯狱的锯齿声一声声传来——第十八层，最后一层到了。',
      verdict: 'debt'
    },
    {
      type: 'ending',
      id: 'end_evil',
      title: '石磨狱 · 恶债通行',
      text: '你出了石磨殿，身后多了一条看不见的恶债——那是据补证妄判所累。真凶那点侥幸的笑，比恶债还烫。前方雾色由灰转黑，刀锯狱的锯齿声一声声传来——第十八层，最后一层到了。',
      verdict: 'debt'
    }
  ]
};
