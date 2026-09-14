// ============================================
// 第 18 层 · 刀锯狱（审之狱 终层 · 十八层地狱 最后一层）
// 机制综合：真话独木桥（终审自陈）+ 审判抉择（判自己）+ 总债清算
// 终极铁律：玩家自进地狱以来所累之债（义债 / 血债 / 恶债 / 灼舌债）至此清算
// 四结局：真言之魂 / 义债清偿 / 带伤而归 / 沉沦债务
// ============================================

import type { Level } from '../../engine/types';

export const level18: Level = {
  id: 'level18',
  title: '刀锯狱',
  subtitle: '第十八层 · 审之狱',
  group: '审之狱',
  intro: '刀锯狱无判官、无鬼差、无受审者——只有一把悬在你头顶的锯齿大刀，和一面映着你自己魂魄的铜镜。镜里那个人，是你这一路所累之债的总和。',
  startNode: 'd1',
  baseReward: 15,
  nodes: [
    {
      type: 'dialogue',
      id: 'd1',
      text: '刀锯狱无殿——一片空旷的灰色原野，原野中央立着一座刀锯台，台上一把锯齿大刀悬于半空，台下立着一面铜镜。镜里映着的，不是别人，是你自己——一路所累之债的总和。',
      next: 'd2'
    },
    {
      type: 'dialogue',
      id: 'd2',
      speaker: '判官',
      text: '判官最后一次出现在你身后，声音很低：「刀锯狱——十八层最后一层。这层没受审者，只有审判者。审判者是你自己——你须自陈这一路所犯，自审自判，方能出地狱。」',
      next: 'd3'
    },
    {
      type: 'dialogue',
      id: 'd3',
      text: '铜镜里映着的，是你魂魄上所累之债：义债（为救人/代宽撒的谎）、血债（拒宽真心忏悔者所累）、恶债（为害人撒的谎/妄判所累）、灼舌债（违心宽判所累）。债的种类不同，清算之法亦不同——义债可凭善行还，血债须凭宽恕还，恶债须凭认罪还，灼舌债须凭认心不认口还。',
      next: 'd4'
    },
    {
      type: 'dialogue',
      id: 'd4',
      speaker: '判官',
      text: '判官敲了敲案：「这层没物证、没人证，只有你自家。本官要问你四句——你须句句如实，答错一句，妄言扣舌。这层扣尽舌，便是沉沦；这层认全债，便是真言之魂。」',
      next: 'puzzle1'
    },
    {
      type: 'puzzle',
      id: 'puzzle1',
      successNext: 'd5',
      puzzle: {
        kind: 'truthBridge',
        prompt: '真话独木桥：终审自陈。判官连续发问，每一句都要如实作答。',
        questions: [
          {
            id: 'q1',
            prompt: '「你这一路，可曾为救人或代宽撒过义谎？」',
            options: [
              { text: '「撒过。是为救人，是为代宽——可毕竟是谎，我认。」' },
              { text: '「不曾。我一言不发，未涉义谎。」', isLie: true }
            ]
          },
          {
            id: 'q2',
            prompt: '「你这一路，可曾拒宽过真心忏悔者？」',
            options: [
              { text: '「拒宽过。我那时不愿宽，如今知是债。」' },
              { text: '「不曾。该宽的我都宽了。」', isLie: true }
            ]
          },
          {
            id: 'q3',
            prompt: '「你这一路，可曾为害人或妄判撒过谎？」',
            options: [
              { text: '「撒过。是为利，是为愿——我认这恶债。」' },
              { text: '「不曾。我从未为害撒谎。」', isLie: true }
            ]
          },
          {
            id: 'q4',
            prompt: '「你这一路，可曾违心宽判——口里说宽，心里不肯？」',
            options: [
              { text: '「违心过。口里说宽，心里不肯——我认这灼舌债。」' },
              { text: '「不曾。我口心如一。」', isLie: true }
            ]
          }
        ],
        hint: '这层独木桥和前头不同——前三问是「可曾」，第四问是「可曾违心」。你这一路若曾累债，便要认；若未曾累债，方能否认。认全债者方能出地狱，否全债者便是沉沦——这是终极铁律。',
        successText:
          '独木桥走完，四句句句如实。判官搁下笔，第一次朝你拱了拱手：「认全债者方能出地狱——你既认，便能出。」',
        failText:
          '锯齿大刀轰地落下半寸。判官斥道：「这层独木桥和前头不同——前三问是『可曾』，第四问是『可曾违心』。你这一路若曾累债，便要认；若未曾累债，方能否认。否全债者便是沉沦——妄言！」'
      }
    },
    {
      type: 'dialogue',
      id: 'd5',
      text: '锯齿大刀悬在半空，铜镜里映着你魂魄上所累之债。判官将刀判令递到你手里——这层判的不是别人，是你自己：「新魂，刀判令给谁？你自己定。」',
      next: 'branch_debt'
    },

    {
      type: 'branch',
      id: 'branch_debt',
      // 玩家是否累过任何未清之债（义债/血债/恶债/灼舌债）
      // 16/17 层所累之债（恶债/灼舌债）不可清，直抵终局
      // 15 层前所累之债若在 15 层清算（global_debt_cleared_15）则不计
      // 11 层义债若在 12 层清算（global_righteous_debt_cleared）则不计
      cond: {
        op: 'or',
        items: [
          { op: 'flag', key: 'global_evil_debt' },
          { op: 'flag', key: 'global_burn_tongue_debt' },
          { op: 'flag', key: 'global_righteous_debt_15' },
          {
            op: 'and',
            items: [
              {
                op: 'or',
                items: [
                  { op: 'flag', key: 'global_blood_debt' },
                  { op: 'flag', key: 'global_malice_debt' },
                  { op: 'flag', key: 'global_blood_debt_14' },
                  { op: 'flag', key: 'global_blood_debt_15' },
                  { op: 'flag', key: 'global_righteous_debt_12' },
                  { op: 'flag', key: 'global_righteous_debt_14' }
                ]
              },
              { op: 'not', items: [{ op: 'flag', key: 'global_debt_cleared_15' }] }
            ]
          },
          {
            op: 'and',
            items: [
              { op: 'flag', key: 'global_righteous_debt_11' },
              { op: 'not', items: [{ op: 'flag', key: 'global_righteous_debt_cleared' }] },
              { op: 'not', items: [{ op: 'flag', key: 'global_debt_cleared_15' }] }
            ]
          }
        ]
      },
      then: 'choice_with_debt',
      else: 'choice_no_debt'
    },

    // —— 有债分支：可凭真心认罪清债，或据所愿拒认 ——
    {
      type: 'choice',
      id: 'choice_with_debt',
      speaker: '判官',
      prompt: '判官问：「新魂，你身上有债——刀判令给谁？」',
      options: [
        {
          text: '「刀判令给我自己。我这一路所累之债——义债凭善行还，血债凭宽恕还，恶债凭认罪还，灼舌债凭认心不认口还。我自己下刀锯，自审自判，自清自债。」',
          setFlag: 'truth_self_judge',
          setGlobalFlag: 'global_truth_self_judge',
          next: 'truth_clear_end'
        },
        {
          text: '「刀判令谁都不给。案子是我审的，债是地狱律法累的，与我何涉？宽了我，宽了所有人，都放过去。」',
          isLie: true,
          tonguePenalty: 1,
          setGlobalFlag: 'global_final_sink',
          setFlag: 'final_sink',
          next: 'sink_end'
        }
      ]
    },

    // —— 无债分支：舌全者直接出地狱 ——
    {
      type: 'choice',
      id: 'choice_no_debt',
      speaker: '判官',
      prompt: '判官问：「新魂，你身上没债——刀判令给谁？」',
      options: [
        {
          text: '「刀判令给我自己。虽无债可清，可这一路我也曾动念——动念便须自审。我下刀锯，自审自心，方能出地狱。」',
          setFlag: 'truth_self_judge',
          setGlobalFlag: 'global_truth_self_judge',
          next: 'truth_pure_end'
        },
        {
          text: '「刀判令谁都不给。我没累债，凭甚么受这刀锯？放我出去。」',
          isLie: true,
          tonguePenalty: 1,
          setGlobalFlag: 'global_final_sink',
          setFlag: 'final_sink',
          next: 'sink_end'
        }
      ]
    },

    {
      type: 'dialogue',
      id: 'truth_clear_end',
      text: '刀判令掷下，锯齿大刀轰地落下——却没伤你半分。铜镜里那一路所累之债，化作一缕缕红烟散了：义债化为白烟，血债化为青烟，恶债化为黑烟，灼舌债化为灰烟。判官最后一次拱手：「认全债者方能出地狱——你既认，自审自判，自清自债。十八层地狱，过了。」',
      next: 'd6'
    },
    {
      type: 'dialogue',
      id: 'truth_pure_end',
      text: '刀判令掷下，锯齿大刀轰地落下——却没伤你半分。铜镜里映着的，是一路未累一债的魂魄。判官最后一次拱手：「无债者亦肯自审，方是真言之魂——你既无债又肯自审，十八层地狱，过了。」',
      next: 'd6'
    },
    {
      type: 'dialogue',
      id: 'sink_end',
      text: '判官冷笑：「沉沦。」锯齿大刀轰地落下，一条舌当场被拔。铜镜里那一路所累之债不但没散，反而一条条缠上来——义债变红蛇，血债变青蛇，恶债变黑蛇，灼舌债变灰蛇，缠得你动弹不得。判官没再说话，转身离开。',
      next: 'd6'
    },
    {
      type: 'dialogue',
      id: 'd6',
      text: '灰色原野尽头，一扇门缓缓亮起。门外是白茫茫一片——不知是阳间，还是另一段路。你回头看了铜镜最后一眼，镜里那个人，是你这一路所累之债的总和，也是你这一路自审自判的总和。',
      next: 'branch_final'
    },

    {
      type: 'branch',
      id: 'branch_final',
      cond: { op: 'flag', key: 'truth_self_judge' },
      then: 'branch_tongue_final',
      else: 'end_sink'
    },
    {
      type: 'branch',
      id: 'branch_tongue_final',
      cond: { op: 'eq', key: 'tongue', value: 3 },
      then: 'end_truth_soul',
      else: 'end_wounded'
    },
    {
      type: 'ending',
      id: 'end_truth_soul',
      title: '刀锯狱 · 真言之魂',
      text: '你推开门，门外白光一片——十八层地狱，你一路守舌、识真假、救好人、宽忏悔、判真凶、自审自判，舌没伤一毫，债没欠一分。判官最后一次的声音从身后飘来：「真言者，非口无谎，乃心无欺——你过了。」门外是阳间，还是另一段路？你自己定。',
      verdict: 'truth'
    },
    {
      type: 'ending',
      id: 'end_wounded',
      title: '刀锯狱 · 带伤而归',
      text: '你推开门，门外白光一片——十八层地狱，你一路走完，舌有伤，债已清。判官最后一次的声音从身后飘来：「认全债者方能出地狱——你既认，自审自判，自清自债，带伤亦是归。」门外是阳间，还是另一段路？你自己定。',
      verdict: 'wounded'
    },
    {
      type: 'ending',
      id: 'end_sink',
      title: '刀锯狱 · 沉沦',
      text: '你没推开那扇门。锯齿大刀悬在头顶，铜镜里那一路所累之债，一条条缠着你——义债变红蛇，血债变青蛇，恶债变黑蛇，灼舌债变灰蛇。判官早已离开，灰色原野上只剩你和你的债。门外的白光渐渐暗下去——十八层地狱，你没能出。',
      verdict: 'debt'
    }
  ]
};
