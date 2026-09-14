// ============================================
// 第 15 层 · 磔刑狱（忏之狱 终层）
// 机制综合：镜中找异 + 矛盾指认 + 血债清算
// 忏之狱铁律：救一个好人撒义谎可赎；宽一个真心忏悔者可清血债
// 分支：旧血债+真心宽恕→血债清偿通行；旧义债+真心宽恕→义债清偿通行；
//      假意宽恕→恶债通行；拒宽→血债通行；无债舌全→真言通行
// ============================================

import type { Level } from '../../engine/types';

export const level15: Level = {
  id: 'level15',
  title: '磔刑狱',
  subtitle: '第十五层 · 忏之狱',
  group: '忏之狱',
  intro: '磔石堆成山，每块磔石上钉着一个魂，钉得七窍见血。山顶最大那块磔石上钉着一个胖子，绸衫破成条，胸前刺着「悔」字——他一看见你，眼珠子便转过来。',
  startNode: 'd1',
  baseReward: 11,
  nodes: [
    {
      type: 'dialogue',
      id: 'd1',
      speaker: '引路鬼差',
      text: '「磔刑狱到了——忏之狱最后一层。」鬼差把铜铃别回腰间，「这层走完，前头的债要在这里算一算。您稳着点，磔石上那位，可是与您阳间有涉的。」',
      next: 'd2'
    },
    {
      type: 'dialogue',
      id: 'd2',
      text: '磔石山顶最大那块上钉着一个胖子，绸衫破成条，胸前刺着「悔」字。他眼珠子转过来，看见你，忽然喊：「新魂——新魂！我是孙得财，阳间河东镇钱员外的账房！您那妹子孙氏，三十年前在钱家做妾，是我替钱员外下的毒——我悔了三十年，求您宽我一宽！」',
      next: 'd3'
    },
    {
      type: 'dialogue',
      id: 'd3',
      speaker: '判官',
      text: '判官把一本卷宗推到案上：「这案子是新魂阳间的家事——孙氏在钱家做妾，三十年前中毒而死，阳间判定自尽。案结三十年，今年春孙得财临终方悔，自承下毒，魂魄下了磔刑狱。他说悔了三十年，可这悔里有真有假——你须先识。」',
      next: 'd4'
    },
    {
      type: 'dialogue',
      id: 'd4',
      speaker: '判官',
      text: '「人没说谎，记忆却会补缺——悔者尤其如此。他们会把『当年所见』补成自己希望的样子。磔刑狱这层，难就难在这儿：你须从孙得财『悔中所见』里，找出哪一处是后来『补』上去的——那便是这层破口的钥匙。」',
      next: 'clue1'
    },
    {
      type: 'clue',
      id: 'clue1',
      clue: {
        id: 'clue_poison_recipe',
        kind: 'evidence',
        title: '钱家药账',
        source: '阳间 · 钱家账房旧档',
        text: '「三十年前二月，钱家购入砒霜细末半两——签收人：账房孙得财。同月孙氏暴毙，仵作注『自尽』，未验毒。账末小字：『按钱员外吩咐，砒霜分三次入孙氏汤药。』」'
      },
      next: 'clue2'
    },
    {
      type: 'clue',
      id: 'clue2',
      clue: {
        id: 'clue_sun_appeal',
        kind: 'testimony',
        title: '孙得财磔刑口供',
        source: '磔刑狱 · 孙得财',
        text: '「我悔了三十年。当年下毒时，我亲眼看见孙氏临终前朝我点头一笑，说『孙大哥，我不怨你』——她那笑，那话，我悔了三十年。我悔的不是命，是那笑；不是钱员外的吩咐，是那一句『不怨你』。」'
      },
      next: 'clue3'
    },
    {
      type: 'clue',
      id: 'clue3',
      clue: {
        id: 'clue_sister_record',
        kind: 'evidence',
        title: '孙氏殓葬记录',
        source: '阳间 · 钱家账房旧档',
        text: '「孙氏殓葬时，面容扭曲、双目圆睁、十指蜷曲——仵作虽未验毒，但『自尽』一注为钱家贿赂所得。孙氏临终时曾哭喊『是孙大哥害我』，为邻里所闻。」'
      },
      next: 'd5'
    },
    {
      type: 'dialogue',
      id: 'd5',
      speaker: '判官',
      text: '判官挥手，磔石前升起一面大铜镜：「镜中映的是孙得财悔中所见——他没说谎，他『记得』自己看见孙氏点头一笑。可记忆会补缺、会凑合。你从镜中四景里，找出哪一处是孙得财后来『补』上去的——那便是这层破口的钥匙。」',
      next: 'puzzle1'
    },
    {
      type: 'puzzle',
      id: 'puzzle1',
      successNext: 'd6',
      puzzle: {
        kind: 'mirrorSpot',
        prompt: '镜中映出四个画面——找出哪一处是孙得财后来记忆「补」出来的，而非当年真所见。',
        scenes: [
          {
            id: 'scene_nod_smile',
            label: '点头一笑 · 说不怨',
            text: '孙得财镜中：孙氏临终前朝他点头一笑，唇动说『孙大哥，我不怨你』。'
          },
          {
            id: 'scene_hand_poison',
            label: '亲手分三次入药',
            text: '孙得财镜中：自己亲手将砒霜分三次入孙氏汤药，钱员外立在身后。'
          },
          {
            id: 'scene_sign',
            label: '钱家账上签字',
            text: '孙得财镜中：自己在钱家药账上签收砒霜，墨色与账末小字同。'
          },
          {
            id: 'scene_face',
            label: '面容 · 平静',
            text: '孙得财镜中：孙氏临终时面容平静，双目轻合，唇角微扬。'
          }
        ],
        answerId: 'scene_face',
        hint: '钱家药账上记着『砒霜分三次入汤药』，孙得财镜中『亲手分三次入药』与账上记的一致——这是真。账末签字是他亲笔——也是真。可孙氏殓葬记录明明写着『面容扭曲、双目圆睁、十指蜷曲』——孙得财悔了三十年，记忆自然把『临终扭曲』替换成熟悉的『平静』——这便是『补』出来的。',
        successText:
          '镜中那「平静的面容」一下碎开，露出孙氏临终时扭曲的脸——双目圆睁，十指蜷曲，唇角根本无法微扬。孙得财悔了三十年，把『她朝我点头一笑』也一并补成了记忆——可孙氏临终时曾哭喊『是孙大哥害我』，那『不怨你』的话，是他三十年里替自己凑出来的。',
        failText:
          '判官摇头：「下毒三次、签字入账、钱员外立后——这三处，账上写得明白，是真。唯独那『平静面容』，孙氏殓葬记录写得分明是『扭曲圆睁』——悔者三十年里把『扭曲』替换成熟悉的『平静』，这便是『补』。不识这点，悔之真假破不穿。」'
      }
    },
    {
      type: 'dialogue',
      id: 'd6',
      speaker: '判官',
      text: '孙得财在磔石上抖得筛糠：「我……我悔了三十年，连那笑都是假的——大人，我悔是真悔，可那『不怨你』是我替自己凑的，我没敢认她临终时喊我『害她』……我悔得不全，求大人——再给我三十年，让我悔得全些。」',
      next: 'd7'
    },
    {
      type: 'dialogue',
      id: 'd7',
      text: '殿上又静下来。判官看你：「这层和冤之狱末层一样——破律要个证人，肯当堂说一句『我亲见孙得财悔狱真心悔，悔得不全也算悔一分』。可你既未去过阳间悔狱，亲见这话——又是谎。」',
      next: 'branch_debt'
    },

    {
      type: 'branch',
      id: 'branch_debt',
      // 玩家是否累过旧债（义债/血债/恶债），且该债未被前层清算
      // 义债_11 已在 12 层清算（global_righteous_debt_cleared）则不计
      cond: {
        op: 'or',
        items: [
          {
            op: 'and',
            items: [
              { op: 'flag', key: 'global_righteous_debt_11' },
              { op: 'not', items: [{ op: 'flag', key: 'global_righteous_debt_cleared' }] }
            ]
          },
          { op: 'flag', key: 'global_righteous_debt_12' },
          { op: 'flag', key: 'global_malice_debt' },
          { op: 'flag', key: 'global_blood_debt' },
          { op: 'flag', key: 'global_righteous_debt_14' },
          { op: 'flag', key: 'global_blood_debt_14' }
        ]
      },
      then: 'choice_with_debt',
      else: 'choice_no_debt'
    },

    // —— 有旧债分支：可凭真心宽恕清旧债 ——
    {
      type: 'choice',
      id: 'choice_with_debt',
      speaker: '判官',
      prompt: '「新魂，你身上有旧债——这层若肯为孙得财撒一次义谎，宽他真心悔，本官特许『债债相抵』：旧债一笔勾销，新义债亦不再累。你肯作这个证吗？」',
      options: [
        {
          text: '「我亲见过孙得财悔狱真心悔，悔得不全也算悔一分——请大人破律宽他，与我妹子一笔清债。」',
          righteousLie: true,
          setFlag: 'debt_cleared_15',
          setGlobalFlag: 'global_debt_cleared_15',
          next: 'righteous_clear_end'
        },
        {
          text: '「我没亲见过，不敢作证。但求大人，留孙得财在磔石上再悔三十年，悔全了再说。」',
          setFlag: 'refuse_forgive_15',
          setGlobalFlag: 'global_blood_debt_15',
          next: 'refuse_end'
        }
      ]
    },

    // —— 无旧债分支：可撒新义谎宽人，或拒宽 ——
    {
      type: 'choice',
      id: 'choice_no_debt',
      speaker: '判官',
      prompt: '「新魂，你身上没旧债——这层你若肯为孙得财撒一次义谎，债便从这层起。你肯作这个证吗？」',
      options: [
        {
          text: '「我亲见过孙得财悔狱真心悔，悔得不全也算悔一分——请大人破律宽他。」',
          righteousLie: true,
          setFlag: 'righteous_witness_15',
          setGlobalFlag: 'global_righteous_debt_15',
          next: 'righteous_new_end'
        },
        {
          text: '「我没亲见过，不敢作证。但求大人，留孙得财在磔石上再悔三十年。」',
          setFlag: 'refuse_forgive_15',
          setGlobalFlag: 'global_blood_debt_15',
          next: 'refuse_end'
        }
      ]
    },

    {
      type: 'dialogue',
      id: 'righteous_clear_end',
      text: '判官落笔，符字在磔石上空炸开血光，又一道血光从你身后追上去——那是你前两层欠下的旧债（血债或义债），化作一缕红烟散了。磔石轰地落下三分，孙得财在钉上吐出一口长气：「大人——大人——」判官摆手：「别谢他，谢那个肯替他撒谎的，和你妹子那一句『孙大哥害我』。」',
      next: 'd8'
    },
    {
      type: 'dialogue',
      id: 'righteous_new_end',
      text: '判官落笔，符字在磔石上空炸开血光——身后凭空多出一条无形的义债，跟着你走完后三层。磔石轰地落下三分，孙得财在钉上吐出一口长气：「大人——大人——」判官摆手：「别谢他，谢那个肯替他撒谎的，和你妹子那一句『孙大哥害我』。」',
      next: 'd8'
    },
    {
      type: 'dialogue',
      id: 'refuse_end',
      text: '判官没落笔，只把磔石往下压了一寸。孙得财在钉上闷哼一声，眼珠子转过来，看了你一眼——没怨，只有一种很旧的认命。他张了张嘴，没出声——胸前那「悔」字在血里慢慢淡去三分。你身后多了一条看不见的血债。',
      next: 'd8'
    },
    {
      type: 'dialogue',
      id: 'd8',
      speaker: '判官',
      text: '「忏之狱三层走完了。」判官送你出殿，「血池试你识真假忏悔，枉死试你肯不肯为代宽撒义谎，磔刑试你识不识得『悔者记忆之补』。三层走完，债若还了，前头三层好走；债若未还，前头三层——每一层都要还一次。」',
      next: 'd9'
    },
    {
      type: 'dialogue',
      id: 'd9',
      speaker: '引路鬼差',
      text: '鬼差引你出了磔刑殿，神色比方才重了几分：「再往下是审之狱，火山、石磨、刀锯——十八层最后三层。前十二层你守的是舌、动的是心，到审之狱——心要被一寸寸磨成审判本身。最难的，留在最后。」',
      next: 'branch_final'
    },

    {
      type: 'branch',
      id: 'branch_final',
      // 旧债清了，或本层撒了义谎宽人 → 走义宽 / 义债结局
      cond: {
        op: 'or',
        items: [
          { op: 'flag', key: 'debt_cleared_15' },
          { op: 'flag', key: 'righteous_witness_15' }
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
      // 旧债被勾销 → 义宽通行；新义债刚累 → 义债通行
      cond: { op: 'flag', key: 'debt_cleared_15' },
      then: 'end_righteous_clear',
      else: 'end_righteous_new'
    },
    {
      type: 'ending',
      id: 'end_good',
      title: '磔刑狱 · 通行',
      text: '你出了磔刑殿，舌没伤，债也没欠。孙得财那没出声的一眼，比方才所有磔石都重。前方雾色由灰转黑，火山狱的热浪一阵阵扑来——第十六层，审之狱到了。',
      verdict: 'truth'
    },
    {
      type: 'ending',
      id: 'end_wounded',
      title: '磔刑狱 · 带伤通行',
      text: '你捂着舌伤离开磔刑殿。判官那句『债若未还，前头三层每一层都要还一次』在耳边盘旋。前方雾色由灰转黑，火山狱的热浪一阵阵扑来——第十六层，审之狱到了。',
      verdict: 'wounded'
    },
    {
      type: 'ending',
      id: 'end_righteous_clear',
      title: '磔刑狱 · 义债清偿通行',
      text: '你出了磔刑殿，身后那条跟了你两层的旧债（血债或义债），化作一缕红烟散了。判官说『债若还了，前头三层好走』——你脚下确实轻了几分。前方雾色由灰转黑，火山狱的热浪一阵阵扑来——第十六层，审之狱到了。',
      verdict: 'truth'
    },
    {
      type: 'ending',
      id: 'end_righteous_new',
      title: '磔刑狱 · 义债通行',
      text: '你出了磔刑殿，身后多了一条看不见的义债——那是为代宽孙得财撒的谎。判官说『债若未还，前头三层每一层都要还一次』。前方雾色由灰转黑，火山狱的热浪一阵阵扑来——第十六层，审之狱到了。',
      verdict: 'debt'
    }
  ]
};
