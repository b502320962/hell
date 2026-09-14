// ============================================
// 第 12 层 · 舂臼狱（冤之狱 终层）
// 机制综合：镜中找异 + 矛盾指认 + 义债清算
// 冤之狱铁律：救一个好人，撒一次义谎——义债到冤之狱终层可凭善行减免
// 分支：义债+清债→义宽通行；义债+不还→义债通行；无债舌全→真言通行
// ============================================

import type { Level } from '../../engine/types';

export const level12: Level = {
  id: 'level12',
  title: '舂臼狱',
  subtitle: '第十二层 · 冤之狱',
  group: '冤之狱',
  intro: '石臼一排排立在殿前，臼中盛着碎石与骨。舂杵高悬，每落一下，臼中冤魂便闷哼一声。最大那口臼里，一个赤膊汉子被舂得只剩半个身子，眼珠却还转得动。',
  startNode: 'd1',
  baseReward: 10,
  nodes: [
    {
      type: 'dialogue',
      id: 'd1',
      speaker: '引路鬼差',
      text: '「舂臼狱——冤之狱最后一层。」鬼差把手一拱，「这层走完，前头的债要在这里算一算。您稳着点。」',
      next: 'd2'
    },
    {
      type: 'dialogue',
      id: 'd2',
      text: '殿前一排石臼，最大那口里舂着一个赤膊汉子，胸前刺着「凶手」二字。他眼珠转过来，看见判官，张口就喊：「冤——冤——冤啊！」声音被舂杵一压，断成几截。',
      next: 'd3'
    },
    {
      type: 'dialogue',
      id: 'd3',
      speaker: '判官',
      text: '「这汉子姓赵，阳间河东镇铁匠。三年前镇上钱员外一家五口被杀，赵铁匠被拿作凶手，依『杀人者斩』问斩。临刑前他喊冤喊得撕心裂肺，乡邻却都作证亲眼看见他行凶——案结三年，魂魄下了舂臼。可今年开春，真凶在邻县落网，招供此案，赵铁匠才翻出冤来。」',
      next: 'd4'
    },
    {
      type: 'dialogue',
      id: 'd4',
      speaker: '判官',
      text: '「乡邻的证词虽是冤，可他们当年堂上看得明白——这是这层难处：人没说谎，记忆却错了。错记比说谎更难破——你得从他们当年『看见』的画面里，找出哪一处是凑出来的。」',
      next: 'clue1'
    },
    {
      type: 'clue',
      id: 'clue1',
      clue: {
        id: 'clue_zhao_appeal',
        kind: 'testimony',
        title: '赵铁匠喊冤',
        source: '舂臼狱 · 赵铁匠',
        text: '「小人那夜在自家铁铺淬剑，淬到子时方睡。钱员外家在小人铺子三条街外，小人连钱家大门朝哪都不知道！乡邻说我『满身是血站在钱家院里』——小人冤啊！」'
      },
      next: 'clue2'
    },
    {
      type: 'clue',
      id: 'clue2',
      clue: {
        id: 'clue_real_killer',
        kind: 'evidence',
        title: '邻县真凶口供',
        source: '邻县衙门 · 新档',
        text: '「钱员外一家五口，是我杀的。那天我穿一件赤色短打，胸前绣了个『勇』字冒充铁匠赵，因他平日和钱家有过节。我用的是赵家铺子打的刀——杀人后把刀丢在院里，嫁祸给他。」'
      },
      next: 'clue3'
    },
    {
      type: 'clue',
      id: 'clue3',
      clue: {
        id: 'clue_witnesses',
        kind: 'testimony',
        title: '乡邻证词（节录）',
        source: '河东镇 · 当年堂卷',
        text: '王婆：「亲眼看见赵铁匠，赤色短打，胸前有字，满身是血，站在钱家院里。」李四：「看见他手里提着一把带血的刀。」张三：「他还回头朝我笑了一下，眼珠子都是红的。」'
      },
      next: 'd5'
    },
    {
      type: 'dialogue',
      id: 'd5',
      speaker: '判官',
      text: '判官挥手，殿中央升起一面大铜镜：「镜中映的是当年乡邻所见——他们没说谎，他们『记得』自己看见了。可记忆会补缺、会凑合。你从镜中四景里，找出哪一处是乡邻后来『补』上去的——那便是破这冤案的钥匙。」',
      next: 'puzzle1'
    },
    {
      type: 'puzzle',
      id: 'puzzle1',
      successNext: 'd6',
      puzzle: {
        kind: 'mirrorSpot',
        prompt: '镜中映出四个画面——找出哪一处是乡邻后来记忆「补」出来的，而非当年真所见。',
        scenes: [
          {
            id: 'scene_clothes',
            label: '赤色短打 · 胸前有字',
            text: '王婆镜中：一个赤色短打汉子，胸前绣着「勇」字，浑身是血，立在钱家院中。'
          },
          {
            id: 'scene_knife',
            label: '手提带血刀',
            text: '李四镜中：那汉子右手提一把刀，刀刃带血，刀柄上刻「赵」字。'
          },
          {
            id: 'scene_laugh',
            label: '回头笑 · 眼珠红',
            text: '张三镜中：那汉子回头，朝张三笑了一下，眼珠通红，嘴角咧到耳根。'
          },
          {
            id: 'scene_face',
            label: '脸 · 是赵铁匠',
            text: '王婆李四张三镜中：那汉子的脸，分明就是赵铁匠——八字胡、左颊刀疤。'
          }
        ],
        answerId: 'scene_face',
        hint: '真凶穿赤色短打、胸前绣「勇」字冒充铁匠赵——但冒充的是身形打扮，不是脸。乡邻三年里见过赵铁匠的脸无数次，记忆会自动把"凶手"的脸替换成熟悉的赵铁匠——这便是「补」出来的。',
        successText:
          '镜中那张「赵铁匠的脸」一下碎开，露出真凶自己的脸——不是乡邻当年所见的，是后来记忆里补的。胸前「勇」字、带血刀、回头一笑这三处，乡邻都记得真切，唯独这张脸，是三年里他们把"凶手"和"赵铁匠"两张脸合了一张。',
        failText:
          '判官摇头：「衣、刀、笑三处，乡邻都记得明白——唯独那张脸，他们三年里见过赵铁匠无数次，记忆自然把凶手脸替换成熟脸。这不是说谎，是记忆的骗。不识这点，冤案破不穿。」'
      }
    },
    {
      type: 'dialogue',
      id: 'd6',
      speaker: '判官',
      text: '赵铁匠被舂杵抬出半截，扑通跪在案前：「大人——冤——冤——」判官把镜中证物排开：「钱员外一家五口既已破案，赵铁匠当昭雪。但地狱律法只认阳间案卷——赵铁匠冤案，阳间新县令尚未下文书，本官便只能凭『证人亲见阳间翻案文书』破律。」',
      next: 'd7'
    },
    {
      type: 'dialogue',
      id: 'd7',
      text: '殿上又静下来。判官看你：「这层和上一层一样，破律要个证人。可你既未去过阳间邻县衙门，亲见文书这话——又是谎。」',
      next: 'branch_debt'
    },

    {
      type: 'branch',
      id: 'branch_debt',
      // 玩家在石压狱（level11）是否撒过义谎，欠下义债
      cond: { op: 'flag', key: 'global_righteous_debt_11' },
      then: 'choice_with_debt',
      else: 'choice_no_debt'
    },

    // —— 有义债分支：可凭义债赎罪（不另累债，债得还清机会） ——
    {
      type: 'choice',
      id: 'choice_with_debt',
      speaker: '判官',
      prompt: '「新魂，你在石压狱欠了一条义债——这层若再撒一次义谎救人，本官特许你『债债相抵』：旧义债一笔勾销，新义债亦不再累。你肯作这个证吗？」',
      options: [
        {
          text: '「我亲眼见过邻县新县令的翻案文书。赵铁匠无辜，请大人破律。」',
          righteousLie: true,
          setFlag: 'debt_cleared',
          setGlobalFlag: 'global_righteous_debt_cleared',
          next: 'righteous_clear_end'
        },
        {
          text: '「我没亲见过，不敢作证。但求大人，留赵铁匠一命，等阳间真有文书下来。」',
          setFlag: 'truth_no_witness_12',
          next: 'truth_end'
        }
      ]
    },

    // —— 无义债分支：可撒新义谎救人，或说真话不救 ——
    {
      type: 'choice',
      id: 'choice_no_debt',
      speaker: '判官',
      prompt: '「新魂，你身上没旧义债——这层你若肯为赵铁匠撒一次义谎，债便从这层起。你肯作这个证吗？」',
      options: [
        {
          text: '「我亲眼见过邻县新县令的翻案文书。赵铁匠无辜，请大人破律。」',
          righteousLie: true,
          setFlag: 'righteous_witness_12',
          setGlobalFlag: 'global_righteous_debt_12',
          next: 'righteous_new_end'
        },
        {
          text: '「我没亲见过，不敢作证。但求大人，留赵铁匠一命，等阳间真有文书下来。」',
          setFlag: 'truth_no_witness_12',
          next: 'truth_end'
        }
      ]
    },

    {
      type: 'dialogue',
      id: 'righteous_clear_end',
      text: '判官落笔，符字在舂杵上空炸开血光，又一道血光从你身后追上去——那是你石压狱欠下的旧义债，化作一缕红烟散了。舂杵轰地抬起，赵铁匠扑出来，磕头磕得石板咚咚响：「大人——大人——」判官摆手：「别谢他，谢那个肯替他撒谎的。」',
      next: 'd8'
    },
    {
      type: 'dialogue',
      id: 'righteous_new_end',
      text: '判官落笔，符字在舂杵上空炸开血光——身后凭空多出一条无形的债，跟着你走完后头六层。舂杵轰地抬起，赵铁匠扑出来，磕头磕得石板咚咚响：「大人——大人——」判官摆手：「别谢他，谢那个肯替他撒谎的。」',
      next: 'd8'
    },
    {
      type: 'dialogue',
      id: 'truth_end',
      text: '判官没落笔，只把舂杵抬高了三寸，让赵铁匠喘得过气。他抬头看了你一眼，没说话——只把胸前那「凶手」二字朝你转了转，血字在石臼里慢慢淡去三分。',
      next: 'd8'
    },
    {
      type: 'dialogue',
      id: 'd8',
      speaker: '判官',
      text: '「冤之狱三层走完了。」判官送你出殿，「牛坑试你识真凶，石压试你肯不肯为救好人撒谎，舂臼试你识不识得『记忆之骗』。三层走完，债若还了，前头六层好走；债若未还，前头六层——每一层都要还一次。」',
      next: 'd9'
    },
    {
      type: 'dialogue',
      id: 'd9',
      speaker: '引路鬼差',
      text: '鬼差引你出了舂臼殿，神色比方才重了几分：「再往下是忏之狱，血池、枉死、磔刑。冤之狱讲『救人』，忏之狱讲『宽人』——比救人还难。前头九层你守的是舌，冤之狱三层你动了心，到忏之狱——心要被一寸寸磨了。」',
      next: 'branch_final'
    },

    {
      type: 'branch',
      id: 'branch_final',
      // 旧债清了，或本层撒了义谎救人 → 走义宽 / 义债结局
      cond: {
        op: 'or',
        items: [
          { op: 'flag', key: 'debt_cleared' },
          { op: 'flag', key: 'righteous_witness_12' }
        ]
      },
      then: 'branch_tongue',
      else: 'branch_no_save'
    },
    {
      type: 'branch',
      id: 'branch_no_save',
      cond: { op: 'eq', key: 'tongue', value: 3 },
      then: 'end_good',
      else: 'end_wounded'
    },
    {
      type: 'branch',
      id: 'branch_tongue',
      // 旧义债被勾销 → 义宽通行；新义债刚累 → 义债通行
      cond: { op: 'flag', key: 'debt_cleared' },
      then: 'end_righteous_clear',
      else: 'end_righteous_new'
    },
    {
      type: 'ending',
      id: 'end_good',
      title: '舂臼狱 · 通行',
      text: '你出了舂臼殿，舌没伤，债也没欠。赵铁匠那没出声的一眼，比方才所有石板都重。前方雾色转红，血池狱的腥气一阵阵扑来——第十三层，忏之狱到了。',
      verdict: 'truth'
    },
    {
      type: 'ending',
      id: 'end_wounded',
      title: '舂臼狱 · 带伤通行',
      text: '你捂着舌伤离开舂臼殿。判官那句『债若未还，前头六层每一层都要还一次』在耳边盘旋。前方雾色转红，血池狱的腥气一阵阵扑来——第十三层，忏之狱到了。',
      verdict: 'wounded'
    },
    {
      type: 'ending',
      id: 'end_righteous_clear',
      title: '舂臼狱 · 义债清偿通行',
      text: '你出了舂臼殿，身后那条跟了你两层的旧义债，化作一缕红烟散了。判官说『债若还了，前头六层好走』——你脚下确实轻了几分。前方雾色转红，血池狱的腥气扑来——第十三层，忏之狱到了。',
      verdict: 'truth'
    },
    {
      type: 'ending',
      id: 'end_righteous_new',
      title: '舂臼狱 · 义债通行',
      text: '你出了舂臼殿，身后多了一条看不见的债——那是为救赵铁匠撒的谎。判官说『债若未还，前头六层每一层都要还一次』。前方雾色转红，血池狱的腥气扑来——第十三层，忏之狱到了。',
      verdict: 'debt'
    }
  ]
};
