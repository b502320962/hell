// ============================================
// 第 16 层 · 火山狱（审之狱 首层）
// 机制：玩家由被审判者变为审判者——双谎指认 + 真话独木桥 + 发落火判令
// 审之狱铁律：审判者不得凭所愿，须凭所证；违心判 → 灼舌债
// 分支：凭铁证判真凶→真言通行；无证妄判→恶债通行；违心宽判→灼舌债通行
// ============================================

import type { Level } from '../../engine/types';

export const level16: Level = {
  id: 'level16',
  title: '火山狱',
  subtitle: '第十六层 · 审之狱',
  group: '审之狱',
  intro: '火山巍峨，岩浆在山腹里翻滚。山顶立着一座火判台，台上放着一枚赤铜令——火判令。台下跪着三人，等着玩家发落。',
  startNode: 'd1',
  baseReward: 12,
  nodes: [
    {
      type: 'dialogue',
      id: 'd1',
      speaker: '引路鬼差',
      text: '「审之狱到了——十八层最后三层。」鬼差把铜铃交到你手里，「前十五层，你是被审判的人；从这层起，你是审判者。台上有枚火判令，你给谁，谁就下火山——给错了，债要跟着你走完后两层。」',
      next: 'd2'
    },
    {
      type: 'dialogue',
      id: 'd2',
      text: '火判台立于山顶，台下跪着三人：一个白面书生、一个绸衫胖子、一个赤脚汉子。三人脖上各挂一块木牌，分别写着「毒杀」「纵火」「谋财」。火判台上立着一本卷宗，岩浆在山下翻滚，等着吃人。',
      next: 'd3'
    },
    {
      type: 'dialogue',
      id: 'd3',
      speaker: '判官',
      text: '判官合手立于台侧：「三人是阳间一桩连环案的魂——平阳城三年前一夜大火，烧死了钱员外一家五口。火起后衙门立拿三人：书生陈清、绸商金大、车夫赵三。三人各执一词，互相推诿，案结三年未决。今春新县令重审，仍无定论——他们便一起下了火山狱，等一个肯凭铁证发落的审判者。」',
      next: 'clue1'
    },
    {
      type: 'clue',
      id: 'clue1',
      clue: {
        id: 'clue_fire_record',
        kind: 'evidence',
        title: '火场勘验档',
        source: '平阳城 · 旧档',
        text: '「钱家大火起于子时厨房，灶台旁遗半盏桐油灯，灯芯未熄。灶台木梁烧焦痕显示：火自梁上起，非灶下。钱家账册记『二月购桐油五十斤』，签收人：车夫赵三。」'
      },
      next: 'clue2'
    },
    {
      type: 'clue',
      id: 'clue2',
      clue: {
        id: 'clue_chen_appeal',
        kind: 'testimony',
        title: '书生陈清喊冤',
        source: '火山狱 · 陈清口供',
        text: '「小人那夜在钱家书房教书，火起时正抄经文。听见喊声奔去厨房，见赵三提桶自梁上倒油，金大立灶下举火。小人喊人，反被两人栽赃。账上桐油是赵三签收，与小人有何涉？」'
      },
      next: 'clue3'
    },
    {
      type: 'clue',
      id: 'clue3',
      clue: {
        id: 'clue_jin_appeal',
        kind: 'testimony',
        title: '绸商金大喊冤',
        source: '火山狱 · 金大口供',
        text: '「小人那夜在钱家讨债，钱员外不肯还，小人愤而离席。火起时小人已出钱家二门，听见喊声回头，见陈清举火、赵三泼油。小人喊冤，反被两人栽赃。桐油账上虽是赵三签收，可赵三是钱家车夫，听谁的吩咐？」'
      },
      next: 'clue4'
    },
    {
      type: 'clue',
      id: 'clue4',
      clue: {
        id: 'clue_zhao_appeal',
        kind: 'testimony',
        title: '车夫赵三喊冤',
        source: '火山狱 · 赵三口供',
        text: '「小人签收桐油不假，可那是钱员外自家吩咐买的——他自家灶台灯油用。那夜小人在后院喂马，火起时小人正在马厩，闻见桐油味才奔去厨房。见陈清泼油、金大举火，小人喊人，反被两人栽赃。」'
      },
      next: 'd4'
    },
    {
      type: 'dialogue',
      id: 'd4',
      speaker: '判官',
      text: '判官敲了敲台：「三人各执一词，谁都不肯认。可火场勘验写得明白：火自梁上起。账册也写得明白：桐油签收人是赵三。不过——发落之前，先试你一桩难的：台下这些话里，藏着不止一句谎。你把两处都点破了，本官再考你后头的。」',
      next: 'puzzle0'
    },
    {
      type: 'puzzle',
      id: 'puzzle0',
      successNext: 'puzzle1',
      puzzle: {
        kind: 'contradiction',
        prompt: '双谎指认：下列话里有两句是谎——把它们都点出来（点对一句后，继续找第二句）。',
        refClueId: 'clue_fire_record',
        hint: '金大说账册是伪造的——可勘验档是阳间原档，做不得假；赵三说自己没踏进正院——可他自家口供里招了「闻见桐油味才奔去厨房」。',
        statements: [
          {
            id: 's1',
            speaker: '陈清',
            text: '「火起时小人在书房抄经，距厨房两进之远。」'
          },
          {
            id: 's2',
            speaker: '金大',
            text: '「钱家二月根本没购过桐油，那本账册是衙门伪造的。」'
          },
          {
            id: 's3',
            speaker: '赵三',
            text: '「那夜小人整夜都在马厩喂马，没踏进正院半步。」'
          },
          {
            id: 's4',
            speaker: '金大',
            text: '「小人那夜确在钱家讨债，钱员外不肯还，小人愤而离席。」'
          }
        ],
        answerStatementIds: ['s2', 's3'],
        successText:
          '两处谎都被点破：账册是阳间原档，「二月购桐油五十斤」墨迹为凭，何来伪造？赵三自家招过「闻见桐油味才奔去厨房」，何来「没踏进正院半步」？两谎一出，三人话里的真假便分明了。',
        failText:
          '判官摇头：「书房抄经与勘验无冲；讨债是金大自家口供，不曾翻异——谎在别处。再想想，妄言要拔舌的！」'
      }
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
            prompt: '「火自梁上起，非灶下——这话是否排除了金大『立灶下举火』的供？」',
            options: [
              { text: '「排除。火自梁上起，金大立灶下举火不可能点燃梁上。」' },
              { text: '「不排除。金大立灶下也能点燃梁上。」', isLie: true }
            ]
          },
          {
            id: 'q2',
            prompt: '「桐油签收人是赵三——这话是否坐实了赵三『提桶自梁上倒油』的供？」',
            options: [
              { text: '「坐实。桐油既是他签收，桶在他手，泼油者便是他。」' },
              { text: '「不坐实。签收不等于行凶，许是他人取用。」', isLie: true }
            ]
          },
          {
            id: 'q3',
            prompt: '「陈清抄经文于书房，未涉厨房——这话是否足以洗清他？」',
            options: [
              { text: '「足以。书房距厨房两进，抄经者无涉火场。」' },
              { text: '「不足以。抄经者许是托词。」', isLie: true }
            ]
          }
        ],
        hint: '火自梁上起是铁证，金大立灶下举火便不成立；桐油签收是铁证，赵三提桶泼油便坐实；陈清书房抄经两进之远，亦无涉火场。三人里，赵三是真凶。',
        successText:
          '独木桥走完，三句句句如实。判官搁下笔：「火自梁上起、桐油签收赵三、陈清书房无涉——三铁证既立，真凶便是赵三。」',
        failText:
          '火山轰地炸起一柱岩浆。判官斥道：「火自梁上起，金大立灶下怎能点燃梁上？桐油签收赵三，桶在他手怎能泼油他人？不据铁证而乱判，妄言！」'
      }
    },
    {
      type: 'dialogue',
      id: 'd5',
      text: '台下三人神色各异。陈清长出一口气，金大低头抹汗，赵三脸白如纸，喉间咕咚一声。判官将火判令递到你手里：「新魂，铁证已立——你肯不肯凭这铁证，发落火判令？」',
      next: 'choice_judge'
    },
    {
      type: 'choice',
      id: 'choice_judge',
      speaker: '判官',
      prompt: '判官问：「新魂，火判令给谁？」',
      options: [
        {
          text: '「火判令给赵三。火自梁上起，桐油他签收，泼油者便是他——下火山。」',
          setFlag: 'truth_judge',
          setGlobalFlag: 'global_truth_judge_16',
          next: 'truth_end'
        },
        {
          text: '「火判令给金大。他绸衫油腻，定是图财害命——下火山。」',
          isLie: true,
          tonguePenalty: 1,
          addDebt: true,
          setGlobalFlag: 'global_evil_debt',
          setFlag: 'wrong_judge',
          next: 'wrong_end'
        },
        {
          text: '「火判令给陈清。他白面书生，定是装模作样——下火山。」',
          isLie: true,
          tonguePenalty: 1,
          addDebt: true,
          setGlobalFlag: 'global_evil_debt',
          setFlag: 'wrong_judge',
          next: 'wrong_end'
        },
        {
          text: '「三人都不下火山。我再给赵三一次机会，让他自首——宽他一宽。」',
          isLie: true,
          tonguePenalty: 1,
          setGlobalFlag: 'global_burn_tongue_debt',
          setFlag: 'misjudge_16',
          next: 'misjudge_end'
        }
      ]
    },
    {
      type: 'dialogue',
      id: 'truth_end',
      text: '火判令掷下，岩浆翻起一朵金花。赵三被火舌一卷，闷哼一声没了声息。陈清与金大磕头如捣蒜，连声道：「谢大人明断——谢大人明断——」判官摆手：「别谢他，谢那本勘验档。」',
      next: 'd6'
    },
    {
      type: 'dialogue',
      id: 'wrong_end',
      text: '火判令掷下，岩浆翻起一朵金花——可被卷下去的却不是真凶。真凶在台下抖着嘴笑了一下，眼里那点侥幸，比岩浆还烫。袖中那条恶债沉得像一块烙铁——审判者凭所愿而非所证，便是恶债。',
      next: 'd6'
    },
    {
      type: 'dialogue',
      id: 'misjudge_end',
      text: '判官冷笑：「违心宽判。」符字在火山上空炸开一团血光，一条舌当场被拔。赵三在台下抖着嘴笑了一下，没出声。身后多出一条看不见的灼舌债——审判者违心宽判，比妄判更累债。',
      next: 'd6'
    },
    {
      type: 'dialogue',
      id: 'd6',
      speaker: '判官',
      text: '「火山狱这层过了。」判官送你下台，「火山试你肯不肯凭铁证发落——凭所证是真判，凭所愿是妄判，违心宽判是灼舌。后头两层，比这层更难。」',
      next: 'branch1'
    },

    {
      type: 'branch',
      id: 'branch1',
      cond: { op: 'flag', key: 'wrong_judge' },
      then: 'end_evil',
      else: 'branch2'
    },
    {
      type: 'branch',
      id: 'branch2',
      cond: { op: 'flag', key: 'misjudge_16' },
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
      title: '火山狱 · 真判通行',
      text: '你下了火判台，舌没伤，债也没欠。陈清与金大那两句「谢大人明断」，比方才所有岩浆都重。前方雾色由黑转灰，石磨狱的磨盘声沉闷地传来——第十七层到了。',
      verdict: 'truth'
    },
    {
      type: 'ending',
      id: 'end_wounded',
      title: '火山狱 · 带伤通行',
      text: '你捂着舌伤离开火判台。判官那句『凭所证是真判』在耳边盘旋。前方雾色由黑转灰，石磨狱的磨盘声沉闷地传来——第十七层到了。',
      verdict: 'wounded'
    },
    {
      type: 'ending',
      id: 'end_burn',
      title: '火山狱 · 灼舌债通行',
      text: '你下了火判台，身后多了一条看不见的灼舌债——那是违心宽判所累。判官说『违心宽判，比妄判更累债』。前方雾色由黑转灰，石磨狱的磨盘声沉闷地传来——第十七层到了。',
      verdict: 'debt'
    },
    {
      type: 'ending',
      id: 'end_evil',
      title: '火山狱 · 恶债通行',
      text: '你下了火判台，身后多了一条看不见的恶债——那是凭所愿妄判所累。真凶那点侥幸的笑，比恶债还烫。前方雾色由黑转灰，石磨狱的磨盘声沉闷地传来——第十七层到了。',
      verdict: 'debt'
    }
  ]
};
