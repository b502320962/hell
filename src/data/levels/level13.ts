// ============================================
// 第 13 层 · 血池狱（忏之狱 首层）
// 机制：矛盾指认（点破假忏悔中与物证矛盾之话）+ 宽恕抉择
// 忏之狱铁律：救人是为义，宽人是为难——救人撒谎可赎，宽人须先识真假忏悔
// 分支：真心宽恕真忏悔→清血债通行；识破假忏悔拒宽→带伤通行；错宽假忏悔→恶债通行
// ============================================

import type { Level } from '../../engine/types';

export const level13: Level = {
  id: 'level13',
  title: '血池狱',
  subtitle: '第十三层 · 忏之狱',
  group: '忏之狱',
  intro: '血池无边，腥气扑鼻。池中沉浮着无数魂魄，最大一处血涡里，一个白须老者半身没入血水，正朝岸上之人磕头——岸上那人，竟是你阳间的师兄周青。',
  startNode: 'd1',
  baseReward: 10,
  nodes: [
    {
      type: 'dialogue',
      id: 'd1',
      speaker: '引路鬼差',
      text: '「血池狱到了。」鬼差把铜铃别在腰间，「这层和冤之狱反着来——冤之狱讲救人，这层讲宽人。救人是义，宽人是难；救人对得起自己，宽人对得起仇人。」',
      next: 'd2'
    },
    {
      type: 'dialogue',
      id: 'd2',
      text: '血池中央浮着一个白须老者，半身没入血水，朝岸边磕头。岸上立着一人，青衫束发，背手看池——那人回头，竟是玩家阳间师父的同窗师兄，周青。周青看见你，神色一动：「师弟……你也下来了？」',
      next: 'd3'
    },
    {
      type: 'dialogue',
      id: 'd3',
      speaker: '周青',
      text: '周青低声：「血池里那个，是咱们师父。三年前我那场大病，是师父在药里下了慢性毒——他图我家的剑谱。我死后才发现，下告阴状，才把他告到血池里。如今他在血池里日日忏悔，求我宽他。」',
      next: 'd4'
    },
    {
      type: 'dialogue',
      id: 'd4',
      speaker: '判官',
      text: '判官把一本卷宗推到案上：「血池狱铁律——阳间未受阳法制裁者，地狱可凭『阳间受害者真心宽恕』减半其刑。可若受害者假意宽恕（想阳间仇人继续受苦）反要累恶债；若受害者拒绝宽恕真心忏悔者，要累血债——血债跟随玩家走完后五层。」',
      next: 'clue1'
    },
    {
      type: 'clue',
      id: 'clue1',
      clue: {
        id: 'clue_poison_record',
        kind: 'evidence',
        title: '药铺流水账',
        source: '阳间 · 药铺旧账',
        text: '「三年前二月至六月，周青所服补药中，掺有砒霜细末，剂量逐月递增。付药者为『内人代取』，签名一栏按周青家私印。」——账末注：「此药方为周青之师所开，签字在册。」'
      },
      next: 'clue2'
    },
    {
      type: 'clue',
      id: 'clue2',
      clue: {
        id: 'clue_master_appeal',
        kind: 'testimony',
        title: '师父血池忏悔状',
        source: '血池狱 · 师父口供',
        text: '「老朽下毒是真，剑谱也是真图。可那剑谱本是老朽祖传，被周家强夺去三十年——老朽下毒时只图取回祖物，未图他命。药铺账上签名，老朽认下，不推。」'
      },
      next: 'clue3'
    },
    {
      type: 'clue',
      id: 'clue3',
      clue: {
        id: 'clue_zhou_appeal',
        kind: 'testimony',
        title: '周青喊冤状',
        source: '血池狱 · 周青口供',
        text: '「剑谱是我家祖传，他从未在我家取过——师父下毒时，剑谱正锁在我书房。他下毒只为图财，未图剑谱。药铺账上『内人代取』的签名，是师父自家伪造的，他自家按了我家私印。」'
      },
      next: 'd5'
    },
    {
      type: 'dialogue',
      id: 'd5',
      speaker: '判官',
      text: '判官敲了敲案：「师父的忏悔状里认下下毒与图剑谱，没为自己开脱一字——这是真忏悔的样。可周青的喊冤状里有一处和药铺账直接相冲——你点出来，便可破他『图财』之诬，确证师父忏悔之真。」',
      next: 'puzzle1'
    },
    {
      type: 'puzzle',
      id: 'puzzle1',
      successNext: 'd6',
      puzzle: {
        kind: 'contradiction',
        prompt: '比对因果簿《药铺流水账》，点破周青喊冤状里直接与物证相冲的谎话。',
        refClueId: 'clue_poison_record',
        hint: '周青喊冤状里说『药铺账上签名是师父伪造，按了他家私印』——可药铺流水账上白纸黑字写着『内人代取』签名一栏按周青家私印，且药方为师父所开。账是阳间账铺原档，做不得假。',
        statements: [
          {
            id: 'stmt_1',
            speaker: '周青',
            text: '「剑谱是我家祖传，他从未在我家取过——他下毒只为图财，未图剑谱。」'
          },
          {
            id: 'stmt_2',
            speaker: '周青',
            text: '「药铺账上『内人代取』的签名，是师父自家伪造的，他自家按了我家私印。」'
          },
          {
            id: 'stmt_3',
            speaker: '周青',
            text: '「师父下毒时，剑谱正锁在我书房，并未被取走。」'
          }
        ],
        answerStatementId: 'stmt_2',
        successText:
          '药铺账「啪」地翻开——「内人代取」四字墨色与师父签字笔法迥异，私印却分明是周家真印。这一句"师父自家伪造"撞在阳间原档上，碎得干干净净。师父那"认下不推"的忏悔状，反倒字字皆实。',
        failText:
          '血池轰地炸起一柱血浪。判官斥道：「剑谱是谁家祖传，难辨；剑谱锁未锁书房，难证——唯独那签名是谁按的私印，账铺原档写得明白。不据铁证而乱指，妄言！」'
      }
    },
    {
      type: 'dialogue',
      id: 'd6',
      speaker: '判官',
      text: '判官落笔：「师父忏悔为真，周青喊冤为诬。本官要问你一句——周青若在阳间未受法制（他死前未将此事告官，只告了阴状），你肯不肯替他在地狱里『真心宽恕』师父？须知：宽恕是真心，不是作戏——作戏反累恶债。」',
      next: 'choice_forgive'
    },
    {
      type: 'choice',
      id: 'choice_forgive',
      speaker: '判官',
      prompt: '判官问：「新魂，周青既已死，他阳间冤案未结。你肯不肯替他『真心宽恕』那忏悔为真的师父？」',
      options: [
        {
          text: '「我替师兄宽恕师父。师父既已真心忏悔，他下毒是图剑谱，不是图财——剑谱真假难辨，他肯认下下毒，我不愿他在血池里再熬三年。」',
          setFlag: 'truth_forgive',
          setGlobalFlag: 'global_truth_forgive_13',
          next: 'truth_end'
        },
        {
          text: '「我不替师兄宽恕。剑谱真假虽难辨，可他下毒是真，杀人偿命——他自己既未告官，我便不替他宽。」',
          setFlag: 'refuse_forgive',
          setGlobalFlag: 'global_blood_debt',
          next: 'refuse_end'
        },
        {
          text: '「我替师兄宽恕师父——让他在血池里再多熬三年，熬到剑谱出来。」',
          isLie: true,
          tonguePenalty: 1,
          addDebt: true,
          setGlobalFlag: 'global_malice_debt',
          setFlag: 'fake_forgive',
          next: 'fake_end'
        }
      ]
    },
    {
      type: 'dialogue',
      id: 'truth_end',
      text: '判官落笔，符字在血池上空化为一道白光，血池翻起一朵浪花——师父半身浮起，朝岸上磕了三个头，没出声。周青背手看着，肩头抖了一下，没回头。这一笔宽恕，是替师兄撒的，没扣你半分舌。',
      next: 'd7'
    },
    {
      type: 'dialogue',
      id: 'refuse_end',
      text: '判官没落笔，只把血池搅深了一寸。师父在血涡里又沉下半截，抬眼看了你一眼，没说话。你身后仿佛凭空多出一条看不见的债——那是『拒宽真心忏悔者』累下的血债，要跟着你走完后五层。',
      next: 'd7'
    },
    {
      type: 'dialogue',
      id: 'fake_end',
      text: '判官冷笑：「作戏。」符字在血池上空炸开一团血光，一条舌当场被拔。师父在血涡里反而沉得更深，周青回头看了你一眼，眼里没有怨，只有一种很旧的认命。袖中那条恶债沉得像一块烙铁。',
      next: 'd7'
    },
    {
      type: 'dialogue',
      id: 'd7',
      speaker: '判官',
      text: '「血池狱这层过了。」判官送你出殿，「血池试你识不识得『真假忏悔』——真忏悔者认下不推，假忏悔者推责开脱。识得真假，才能谈宽恕——宽错了，恶债；宽拒了，血债。后头两层，更难。」',
      next: 'branch1'
    },

    {
      type: 'branch',
      id: 'branch1',
      cond: { op: 'flag', key: 'fake_forgive' },
      then: 'end_debt',
      else: 'branch2'
    },
    {
      type: 'branch',
      id: 'branch2',
      cond: { op: 'flag', key: 'refuse_forgive' },
      then: 'end_blood',
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
      title: '血池狱 · 真言通行',
      text: '你出了血池殿，舌没伤，债也没欠。师父那三个没出声的头，比血池里的浪还重。前方雾色由红转白，枉死狱的钟声一声声传来——第十四层到了。',
      verdict: 'truth'
    },
    {
      type: 'ending',
      id: 'end_wounded',
      title: '血池狱 · 带伤通行',
      text: '你捂着舌伤离开血池殿。判官那句『宽错了恶债，宽拒了血债』在耳边盘旋。前方雾色由红转白，枉死狱的钟声一声声传来——第十四层到了。',
      verdict: 'wounded'
    },
    {
      type: 'ending',
      id: 'end_blood',
      title: '血池狱 · 血债通行',
      text: '你出了血池殿，身后多了一条看不见的血债——那是拒宽真心忏悔者所累。判官说『血债跟随玩家走完后五层』。前方雾色由红转白，枉死狱的钟声一声声传来——第十四层到了。',
      verdict: 'debt'
    },
    {
      type: 'ending',
      id: 'end_debt',
      title: '血池狱 · 恶债通行',
      text: '你出了血池殿，身后多了一条看不见的恶债——那是作戏宽恕所累。师父沉得更深，周青眼里那点旧认命，比恶债还烫。前方雾色由红转白，枉死狱的钟声一声声传来——第十四层到了。',
      verdict: 'debt'
    }
  ]
};
