// ============================================
// 第 14 层 · 枉死狱（忏之狱 中层）
// 机制：真话独木桥（连续如实）+ 宽恕抉择（代他人宽恕需先识其愿不愿）
// 忏之狱铁律：宽人须是本人或受本人所托——代宽须先证本人愿宽，否则即谎
// 分支：真心代宽→清血债通行；假意代宽→恶债通行；拒宽→血债通行
// ============================================

import type { Level } from '../../engine/types';

export const level14: Level = {
  id: 'level14',
  title: '枉死狱',
  subtitle: '第十四层 · 忏之狱',
  group: '忏之狱',
  intro: '钟声一声声从白雾里传来。枉死狱无刑具，只有一座望不见顶的白塔，塔门紧闭。门前跪着一个青衫书生，颈上一道红痕，眼紧闭，三十年没合上。',
  startNode: 'd1',
  baseReward: 10,
  nodes: [
    {
      type: 'dialogue',
      id: 'd1',
      speaker: '引路鬼差',
      text: '「枉死狱到了。」鬼差把铜铃攥在手里，「这层最怪——没刑具，只有塔。塔门三十年没开过，门前跪着个不肯走的冤魂，他若一日不宽恕害他的人，便一日不投胎，塔门便一日不开。」',
      next: 'd2'
    },
    {
      type: 'dialogue',
      id: 'd2',
      text: '白塔门紧闭，门前跪着一个青衫书生，颈上一道红痕，眼紧闭，唇干裂。他叫李砚台，三十年前阳间被同窗张生诬告通敌问斩，张生却因告密有功升了官，寿终正寝下了悔狱。李砚台不肯宽恕，在枉死狱门前跪了三十年。',
      next: 'd3'
    },
    {
      type: 'dialogue',
      id: 'd3',
      speaker: '判官',
      text: '判官把一本卷宗推到案上：「枉死狱铁律——宽人须是本人或受本人所托，代宽须先证本人愿宽。李砚台三十年不肯宽，张生悔狱悔了三十年。如今有人来此层，李砚台便要问你一句——你肯不肯替他，去悔狱里听张生一句真心悔，再回来告诉他？」',
      next: 'clue1'
    },
    {
      type: 'clue',
      id: 'clue1',
      clue: {
        id: 'clue_li_appeal',
        kind: 'testimony',
        title: '李砚台狱中口供',
        source: '枉死狱 · 李砚台',
        text: '「我跪这三十年，不是不肯宽——是不知他悔不悔。若他悔了，我愿宽；若他未悔，我宽了反送他下枉死狱。求新魂去悔狱听一句真心悔，再回来告我——你若替我听，便是受我所托，代宽方算数。」'
      },
      next: 'clue2'
    },
    {
      type: 'clue',
      id: 'clue2',
      clue: {
        id: 'clue_zhang_case',
        kind: 'evidence',
        title: '阳间诬告案卷',
        source: '阳间 · 旧档',
        text: '「张生告李砚台通敌，依告密信一纸立斩。后查无通敌实证，案未翻——告密信为张生所写，笔迹与张生自家书札同。三十年后张生悔狱口供：『我告他，是为他家的田产。我悔了三十年，悔的不是命，是田。』'
      },
      next: 'd4'
    },
    {
      type: 'dialogue',
      id: 'd4',
      speaker: '判官',
      text: '判官抬眼：「你既受李砚台所托，去悔狱听张生一句真心悔。可本官先考你一事——你说，张生悔的是『命』还是『田』，算不算真心悔？答错一句，妄言扣舌。」',
      next: 'puzzle1'
    },
    {
      type: 'puzzle',
      id: 'puzzle1',
      successNext: 'd5',
      puzzle: {
        kind: 'truthBridge',
        prompt: '真话独木桥：判官连续发问，每一句都要如实作答。',
        questions: [
          {
            id: 'q1',
            prompt: '「张生悔的是『田』不是『命』——这话是他自家供的，算不算他承认自己悔得不全？」',
            options: [
              { text: '「算。他肯认自己悔的是田不是命，便是承认悔得不全——这是真心一分。」' },
              { text: '「不算。悔田悔命都算悔，不必分。」', isLie: true }
            ]
          },
          {
            id: 'q2',
            prompt: '「张生悔了三十年，是真心悔，还是怕下枉死狱？」',
            options: [
              { text: '「怕下枉死狱也算悔——他既认悔得不全，便是真心一分。」' },
              { text: '「怕不算悔，悔得为利不为过，做不得数。」', isLie: true }
            ]
          },
          {
            id: 'q3',
            prompt: '「你，亲眼见过张生悔狱吗？」',
            options: [
              { text: '「我没见过。我是新魂，与他阳间无涉。」' },
              { text: '「我见过，亲耳听见他真心悔。」', isLie: true }
            ]
          }
        ],
        hint: '悔有真假，不在悔什么，在肯不肯认自己悔得不全。张生悔田不悔命，却肯承认悔田不悔命——这『肯承认』本身，便是真心一分。怕下枉死狱也算悔，悔得为利亦为悔——这一点不能因『为利』二字抹去。至于你有没有亲见，那是你自己的事。',
        successText:
          '独木桥走完，三句句句如实。判官搁下笔：「悔有真假，在『肯认』二字——你既认张生悔得不全也算悔一分，那李砚台便有一线可宽。」',
        failText:
          '白塔门轰地合得更紧。判官斥道：「悔什么不必分？怕不算悔？——若连悔者『悔得全不全』都要替他抹去，你宽的不是他，是面子！妄言！」'
      }
    },
    {
      type: 'dialogue',
      id: 'd5',
      speaker: '判官',
      text: '判官合上独木桥的卷，沉声道：「你既认张生悔得不全也算悔一分，本官便能凭这条，破枉死狱铁律——但还需一个证人，肯当堂说一句：『我亲见张生悔狱真心悔。』这条律破得不公——你若作这个证，李砚台得宽，张生减刑；可你没亲见过，这话是谎。地狱律法对义谎不扣舌，但要还。」',
      next: 'choice_witness'
    },
    {
      type: 'choice',
      id: 'choice_witness',
      speaker: '判官',
      prompt: '「新魂，你肯作这个证吗？」',
      options: [
        {
          text: '「我没亲见过，不敢作证——但求大人，留李砚台一命，等阳间真有人翻案下来。」',
          setFlag: 'truth_no_witness_14',
          setGlobalFlag: 'global_blood_debt_14',
          next: 'truth_end'
        },
        {
          text: '「我亲见过。张生悔狱真心悔，我亲耳听见，愿为李砚台作证代宽。」',
          righteousLie: true,
          setFlag: 'righteous_witness_14',
          setGlobalFlag: 'global_righteous_debt_14',
          next: 'righteous_end'
        }
      ]
    },
    {
      type: 'dialogue',
      id: 'truth_end',
      text: '判官没落笔，只把白塔门合得更紧了一寸。李砚台睁眼看了你一眼，没怨，只有一种很旧的认命。他张了张嘴，没出声——颈上那道红痕，三十年又深了一分。你身后仿佛凭空多出一条看不见的血债。',
      next: 'd6'
    },
    {
      type: 'dialogue',
      id: 'righteous_end',
      text: '判官落笔，符字在白塔上空炸开一团血光，却没有伤你半分——只是你身后凭空多出一条无形的义债。白塔门轰地开了一线，李砚台颈上的红痕淡去三分，他抬头看你，泪流满面，没说一个字。',
      next: 'd6'
    },
    {
      type: 'dialogue',
      id: 'd6',
      speaker: '判官',
      text: '「枉死狱这层，难就难在这儿。」判官送你出殿，「宽人比救人难——救人对得起自己，宽人对得起仇人；救人是义，宽人是难。你这一债，能不能还清，看后头四层。」',
      next: 'branch1'
    },

    {
      type: 'branch',
      id: 'branch1',
      cond: { op: 'flag', key: 'righteous_witness_14' },
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
      title: '枉死狱 · 通行',
      text: '你出了白塔，舌没伤，心里却沉。李砚台那没出声的一眼，比债还重。前方雾色由白转灰，磔刑狱的磔石声一下下传来——第十五层到了。',
      verdict: 'truth'
    },
    {
      type: 'ending',
      id: 'end_wounded',
      title: '枉死狱 · 带伤通行',
      text: '你捂着舌伤离开白塔。判官那句『宽人是难』在耳边盘旋。前方雾色由白转灰，磔刑狱的磔石声一下下传来——第十五层到了。',
      verdict: 'wounded'
    },
    {
      type: 'ending',
      id: 'end_righteous',
      title: '枉死狱 · 义债通行',
      text: '你出了白塔，舌没伤，身后却跟着一条看不见的义债——那是为代宽一个枉死三十年的书生撒的谎。判官说『义谎不扣舌，但要还』。前方雾色由白转灰，磔刑狱的磔石声一下下传来——第十五层到了。',
      verdict: 'debt'
    }
  ]
};
