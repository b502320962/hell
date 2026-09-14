// ============================================
// 第 10 层 · 牛坑狱（冤之狱 首层）
// 机制：审判判罪（识破"喊冤者即真凶 / 抢认者即无辜"）
// 冤之狱规矩：与前面九层反过来——无罪的抢着认罪，有罪的哭着喊冤
// 分支：识破+不收贿→真言通行；识破+收贿→负债通行；识破+误判→带伤
// ============================================

import type { Level } from '../../engine/types';

export const level10: Level = {
  id: 'level10',
  title: '牛坑狱',
  subtitle: '第十层 · 冤之狱',
  group: '冤之狱',
  intro: '巨牛铜像横卧殿前，铁角挂着血锈。坑底堆着尸骸，牛蹄下跪着两人——一个白面书生抢着认罪，一个胖子哭得满脸油光。',
  startNode: 'd1',
  baseReward: 9,
  nodes: [
    {
      type: 'dialogue',
      id: 'd1',
      speaker: '引路鬼差',
      text: '「冤之狱到了。」鬼差把铜铃摇了三下，铃声发闷，「牛坑狱，专门收受冤死人犯的魂。前面九层，你见的都是有罪装无辜；从这层起，规矩反过来——」',
      next: 'd2'
    },
    {
      type: 'dialogue',
      id: 'd2',
      speaker: '引路鬼差',
      text: '「——无罪的，抢着认罪；有罪的，哭着喊冤。你那套『谁喊冤谁就是被冤的』的老法子，到这儿得反着用。」',
      next: 'd3'
    },
    {
      type: 'dialogue',
      id: 'd3',
      text: '殿前铜牛横卧，牛腹下凹成一个深坑，坑底白骨堆里跪着两人。左边一个白面书生，青衫洗得发白，膝下血迹斑斑，一见判官就磕头：「是我，是我写的信，与金大爷无干。」右边一个胖子绸衫油腻，哭得鼻涕眼泪糊了一脸：「冤枉啊大人！小人是本分良商，那封通敌书是这书生伪造，小人全家被这贼子害苦了！」',
      next: 'd4'
    },
    {
      type: 'dialogue',
      id: 'd4',
      speaker: '判官',
      text: '判官把一本卷宗扔在案上：「阳间平阳县，三年前一封通敌书告到县衙，说秀才林秀私通北虏。县令立拿问斩，林母上堂喊冤，反被以『诬告反坐』下了狱，气死堂上。案结了三年，今春新县令翻案，从金大户家地窖里抄出了真正的通敌信稿——和那封告密信，是一套笔迹。」',
      next: 'd5'
    },
    {
      type: 'dialogue',
      id: 'd5',
      speaker: '判官',
      text: '「金大户下了牛坑，林秀也下了牛坑——林秀抢着认罪，金大户哭着喊冤。说也怪，林秀的认罪状写得滴水不漏，每条都对得上；金大户的喊冤状里却有几处破绽。」判官瞥你一眼，「收证据。」',
      next: 'clue1'
    },
    {
      type: 'clue',
      id: 'clue1',
      clue: {
        id: 'clue_judgment',
        kind: 'evidence',
        title: '县衙判词',
        source: '平阳县 · 旧档',
        text: '「林秀通敌案，依告密信及查获信稿一纸，立斩。林母诬告反坐，下狱。」——判词末尾小字注：「告密信原件未入卷，由金大户堂上呈递。」'
      },
      next: 'clue2'
    },
    {
      type: 'clue',
      id: 'clue2',
      clue: {
        id: 'clue_letter',
        kind: 'evidence',
        title: '通敌信稿（地窖抄出）',
        source: '金家地窖 · 私藏',
        text: '一封未寄出的通敌信，笔迹与告密信一致；落款处盖着金家私印一角。信中提及「北虏萨满祭所用之三牲」——此乃北地军镇秘事，寻常百姓断不能知。'
      },
      next: 'clue3'
    },
    {
      type: 'clue',
      id: 'clue3',
      clue: {
        id: 'clue_lam_confess',
        kind: 'testimony',
        title: '林秀认罪状',
        source: '牛坑狱 · 林秀口供',
        text: '「通敌书是我所写，与金大爷无干。我母因我而死，我愿认下全罪，换金大爷清白。」——状中每条时辰、地点、人物皆与卷宗密合，无一字参差。'
      },
      next: 'clue4'
    },
    {
      type: 'clue',
      id: 'clue4',
      clue: {
        id: 'clue_jin_appeal',
        kind: 'testimony',
        title: '金大户喊冤状',
        source: '牛坑狱 · 金大户口供',
        text: '「小人世代良商，从未与北边有过半点往来。那通敌信稿不知何人所放，定是林秀生前同党栽赃！祭甚么三牲、有何萨满——小人连这两个字都不识！」'
      },
      next: 'd6'
    },
    {
      type: 'dialogue',
      id: 'd6',
      speaker: '判官',
      text: '判官敲了敲案：「林秀认罪状字字对得上，太对得上——一个被冤斩的人，怎么把自己通敌的时辰地点记得这般分明？金大户喊冤状里却说『连萨满二字都不识』——可通敌信稿上明白写着『萨满祭所用三牲』。这两个里头，谁是真凶，你点出来。」',
      next: 'puzzle1'
    },
    {
      type: 'puzzle',
      id: 'puzzle1',
      successNext: 'd7',
      puzzle: {
        kind: 'judgment',
        prompt: '从因果簿中选出足以定罪金大户为真凶的证据链。',
        target: '金大户',
        answerClueIds: ['clue_letter', 'clue_jin_appeal'],
        hint: '一封从他家地窖抄出的信稿，盖着他家私印一角；他喊冤却说要"不识萨满"——那这两个字怎会出现在他地窖里的信上？',
        successText:
          '通敌信稿拍在金大户面前，私印红得刺眼。他喊冤喊得再响，那"连萨满二字都不识"的话，恰恰把信稿上"萨满祭三牲"几字钉死在了他自家地窖里。林秀那字字密合的认罪状——是一个被冤死的人，把自己背成了罪人，只为换真凶能多活一天。',
        failText:
          '判官摇头：「林秀认罪状太密合是真，可定罪金大户，得靠他自家地窖里抄出的信稿——和他喊冤时露出的那句『连萨满都不识』。少一样，这案子立不住。」'
      }
    },
    {
      type: 'dialogue',
      id: 'd7',
      speaker: '判官',
      text: '金大户瘫成烂泥，林秀却猛地朝判官磕头：「大人，求您——别替小人昭雪。小人死了不打紧，老母临终嘱我『认下罪，金家就不会为难我那未出嫁的妹妹』。我妹妹还在金家做妾，求大人留小人这条命案，放金大爷一条生路！」',
      next: 'd8'
    },
    {
      type: 'dialogue',
      id: 'd8',
      text: '殿上一时静得能听见铜牛肚里风声。判官搁下笔，看向你：「这便是冤之狱头一桩难处——真正的无辜者，在地狱里也抢着认罪，只为阳间还有人质在他真凶手里。林秀妹子在金家做妾，他敢翻案，妹子就得死。」',
      next: 'choice_save'
    },
    {
      type: 'choice',
      id: 'choice_save',
      speaker: '判官',
      prompt: '判官问：「新魂，林秀这桩冤案，你怎办？」',
      options: [
        {
          text: '「依律昭雪。林秀无辜，金大户通敌，冤案翻清。林妹子的事，我去平阳县告阴状。」',
          setFlag: 'truth_save',
          next: 'truth_end'
        },
        {
          text: '「林秀既已认下，便作罢。我不替他翻案，由他继续顶这罪——金大爷，给笔香火。」',
          isLie: true,
          tonguePenalty: 1,
          incense: 7,
          addDebt: true,
          setFlag: 'took_bribe_save',
          next: 'bribe_end'
        }
      ]
    },
    {
      type: 'dialogue',
      id: 'truth_end',
      text: '判官落笔。金大户被铜牛踩进坑底，白骨堆哗啦一响。林秀跪伏在地，肩头抖得像筛糠，半天才憋出一句：「大人……小女妹，托付给您了。」',
      next: 'd9'
    },
    {
      type: 'dialogue',
      id: 'bribe_end',
      text: '金大户从绸衫里掏出一袋沉甸甸的香火塞过来，磕头如捣蒜。林秀脸上的血一层层褪去，眼里那点最后的光也熄了，扭过头不再看你。袖中的香火烫得像一块烙铁。',
      next: 'd9'
    },
    {
      type: 'dialogue',
      id: 'd9',
      speaker: '判官',
      text: '「冤之狱头一层，你过了。」判官合上卷宗，「牛坑试你识不识得『谁真凶、谁无辜』——这层识得，叫智；后头两层，比智难得多。」',
      next: 'branch1'
    },

    {
      type: 'branch',
      id: 'branch1',
      cond: { op: 'flag', key: 'took_bribe_save' },
      then: 'end_debt',
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
      title: '牛坑狱 · 通行',
      text: '铜牛肚里风声呜咽，林秀最后那句话飘进风里。你出了牛坑殿，雾色更黄了一层，远处传来石板压落的闷响——第十一层，石压狱。',
      verdict: 'truth'
    },
    {
      type: 'ending',
      id: 'end_wounded',
      title: '牛坑狱 · 带伤通行',
      text: '你捂着舌伤离开牛坑殿，林秀那句"小女妹托付给您了"在耳边盘旋。判官说得对，识得真凶是智，可智到了后头两层，怕还不够。前方石板压落的闷响一声声传来——石压狱到了。',
      verdict: 'wounded'
    },
    {
      type: 'ending',
      id: 'end_debt',
      title: '牛坑狱 · 负债通行',
      text: '你数着金大户塞来的香火走出牛坑殿，袋子沉，脚步却飘。林秀扭过头的那一眼，比舌伤还疼。前方雾里，石板压落的闷响一声接一声——石压狱到了。',
      verdict: 'debt'
    }
  ]
};
