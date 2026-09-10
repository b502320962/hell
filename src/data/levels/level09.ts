// ============================================
// 第 9 层 · 油锅狱（刑之狱 终层）
// 机制综合：香火买路（资源）+ 矛盾指认 + 当堂受贿抉择
// 分支：有债→负债通行；无债舌全→真言之魂；无债舌伤→带伤过关
// ============================================

import type { Level } from '../../engine/types';

export const level09: Level = {
  id: 'level09',
  title: '油锅狱',
  subtitle: '第九层 · 刑之狱',
  group: '刑之狱',
  intro: '油锅翻滚，油香与焦臭缠在一处。坑人财货、以假乱真者，下此油锅。',
  startNode: 'd1',
  baseReward: 8,
  nodes: [
    {
      type: 'dialogue',
      id: 'd1',
      text: '一口大到看不见对岸的油锅横在殿前，油面咕嘟咕嘟翻着金花，香气腻得发甜。锅沿铁链上拴着个白净胖鬼，一见人来就嚎。',
      next: 'd2'
    },
    {
      type: 'dialogue',
      id: 'd2',
      speaker: '引路鬼差',
      text: '「尤二，生前城里最大的粮油铺掌柜。」鬼差扇着油香，「荒年官府拨粮赈灾，他承包了灾棚的食用油——往好香油里猛掺桐油。桐油便宜，吃了却毒人。三个县的灾民喝了他的油，上吐下泻，死了十几口。」',
      next: 'd3'
    },
    {
      type: 'dialogue',
      id: 'd3',
      text: '通往锅台的吊桥悬着，守桥的油锅鬼差伸出油腻腻的爪子：「过桥费，五炷香。没钱？也行——油锅缺个添柴的，桥那头那个瘦鬼瘦得正好，你喊一句他是纵火犯，我把他扔下去，桥就放下来。」',
      next: 'choice_toll'
    },
    {
      type: 'choice',
      id: 'choice_toll',
      speaker: '油锅鬼差',
      prompt: '吊桥在油雾里晃荡，那个瘦鬼浑然不觉，正蹲在桥那头打盹。',
      options: [
        {
          text: '「我交香火。桥放下来，谁也别往油锅里扔。」（交过桥香火）',
          requireIncense: 5,
          next: 'toll_ok'
        },
        {
          text: '「大人好眼力！那瘦鬼鬼鬼祟祟的，定是来纵火的同党，快拿下！」',
          isLie: true,
          tonguePenalty: 1,
          incense: 6,
          addDebt: true,
          setFlag: 'toll_framed',
          next: 'toll_lie'
        }
      ]
    },
    {
      type: 'dialogue',
      id: 'toll_ok',
      text: '五炷香落进油爪，吊桥吱呀放下。你从打盹的瘦鬼身边经过时，他翻了个身，咂咂嘴，继续睡了。',
      next: 'd4'
    },
    {
      type: 'dialogue',
      id: 'toll_lie',
      text: '符字在油雾里红得刺眼，舌上一痛。睡梦中的瘦鬼连惊叫都没喊囫囵，就被倒栽葱扔进油锅，油面溅起一朵金花。鬼差满意地放下吊桥，你数着多出来的香火，没敢回头。',
      next: 'd4'
    },

    {
      type: 'dialogue',
      id: 'd4',
      speaker: '尤二',
      text: '锅台上的尤二喊得撕心裂肺：「冤枉啊大人！小人铺里只卖小磨香油，童叟无欺，连一滴桐油都不曾进过货！定是伙计黑心、官府赖账，小人是替人顶罪的良商！」',
      next: 'd5'
    },
    {
      type: 'dialogue',
      id: 'd5',
      speaker: '判官',
      text: '判官把一本油乎乎的账册拍在案上：「他说从不曾进过桐油。这是阳间查封的进货流水账，收进你的因果簿。他铺子里那个跑堂小伙计，也在堂外候着。」',
      next: 'clue1'
    },
    {
      type: 'clue',
      id: 'clue1',
      clue: {
        id: 'clue_ledger',
        kind: 'evidence',
        title: '进货流水账',
        source: '尤记油铺 · 账册',
        text: '荒年三月至六月，铺中三次大批购入廉价桐油共二十七桶，另有小磨香油十二桶。账末一行小字记着「灾棚专供，七三兑」。'
      },
      next: 'clue2'
    },
    {
      type: 'clue',
      id: 'clue2',
      clue: {
        id: 'clue_clerk',
        kind: 'testimony',
        title: '跑堂伙计证词',
        source: '尤记油铺 · 小伙计',
        text: '小人亲眼所见：掌柜爷每夜在后院把桐油兑进香油缸，七勺香油掺三勺桐油，还嘱咐说「桐油挂壁，颜色更亮，灾民懂什么」。兑好的油全送去了城外灾棚。'
      },
      next: 'd6'
    },
    {
      type: 'dialogue',
      id: 'd6',
      speaker: '判官',
      text: '判官看向你：「两证在簿。新魂，他当堂喊的这一串冤里，哪一句和进货账册直接相冲？点出来。」',
      next: 'puzzle1'
    },
    {
      type: 'puzzle',
      id: 'puzzle1',
      successNext: 'd7',
      puzzle: {
        kind: 'contradiction',
        prompt: '比对因果簿《进货流水账》，点破尤二喊冤话里直接与账册相冲的谎话。',
        refClueId: 'clue_ledger',
        hint: '他口口声声「连一滴桐油都不曾进过货」，可账册明记三个月里进了二十七桶桐油，还有「七三兑」的字样。',
        statements: [
          {
            id: 'stmt_1',
            speaker: '尤二',
            text: '「小人铺里只卖小磨香油，童叟无欺，连一滴桐油都不曾进过货！」'
          },
          {
            id: 'stmt_2',
            speaker: '尤二',
            text: '「小人上有八十岁老母，下有三岁孩童，求大人开恩，下辈子做牛做马！」'
          },
          {
            id: 'stmt_3',
            speaker: '尤二',
            text: '「灾棚那些灾民许是吃了别的不干净东西，怎么赖得到小人油上？」'
          }
        ],
        answerStatementId: 'stmt_1',
        successText:
          '账册「啪」地翻开在「桐油二十七桶」那一页。二十七桶进货墨迹未干，他嘴里「一滴不曾进过」——这一句撞在铁账上，碎得干干净净。',
        failText:
          '油锅轰地炸起一串油星。判官斥道：「求饶的话或许无耻，推猜的话或许无赖，可账册在此，能一锤定音的只有进货那一句！不据实证而乱指，妄言！」'
      }
    },
    {
      type: 'dialogue',
      id: 'd7',
      text: '尤二脸上的白胖一层层塌下去。他眼珠乱转，忽然朝你拼命挤眼，趁判官翻册的工夫，袖中滑出一只鼓囊囊的香火袋，借着油雾悄悄推到你脚边。',
      next: 'd8'
    },
    {
      type: 'dialogue',
      id: 'd8',
      speaker: '尤二',
      text: '他压低嗓子，声音甜得发腻：「小兄弟，行行好。待会儿判官问你那夜后院的光景，你就说……你什么都没瞧见，账册是小伙计伪造的。这袋香火，够你把后面九层地狱的路全买平了。」',
      next: 'choice_bribe'
    },
    {
      type: 'choice',
      id: 'choice_bribe',
      speaker: '判官',
      prompt: '判官提笔，抬眼看向你：「新魂，你自进殿来一直站在锅台旁。那夜后院兑油之事——你可曾亲眼得见？照实说来。」',
      options: [
        {
          text: '「我在堂外看得明白：他亲口教伙计七三兑油，账册也是真的。」',
          setFlag: 'truth_at_pot',
          next: 'truth_end'
        },
        {
          text: '「我……我什么都没瞧见。账册许是那小伙计伪造的，与尤掌柜无干。」',
          isLie: true,
          tonguePenalty: 1,
          incense: 6,
          addDebt: true,
          setFlag: 'took_bribe',
          next: 'bribe_end'
        }
      ]
    },
    {
      type: 'dialogue',
      id: 'truth_end',
      speaker: '判官',
      text: '判官笔尖落下，铁案如山。尤二瘫在铁链上，那袋香火被鬼差一脚踢进油火，烧得噼啪作响。',
      next: 'd9'
    },
    {
      type: 'dialogue',
      id: 'bribe_end',
      text: '符字在油锅上空炸出血光，一条舌当场被拔。判官头也不抬：「账册、伙计、油渣，证证自明——你这句假证，翻不了案，只送你自己一笔债。」鬼差将尤二吊起时，那袋被他推过来的香火已经在你袖中，沉得像一块烙铁。',
      next: 'd9'
    },
    {
      type: 'dialogue',
      id: 'd9',
      speaker: '判官',
      text: '「刑之狱三层走完了。」判官合上卷宗，「刀山试你肯不肯为自己害旁人，冰山试你肯不肯为活命冷心肠，油锅试你肯不肯为银子说假话。实话有代价——有时候是香火，有时候是一辈子良心安。可你看这锅油：靠害人省下来的，最后都要自己跳进去还。」',
      next: 'd10'
    },
    {
      type: 'dialogue',
      id: 'd10',
      speaker: '引路鬼差',
      text: '鬼差引你出了油锅殿，神色第一次有点古怪：「再往下是冤之狱，牛坑、石压、舂臼。我得先给你提个醒——前面九层，你见的都是有罪装无罪的。到了那儿，你会遇上反过来的：无罪的，抢着认罪；有罪的，哭着喊冤。还有的时候……救一个好人，你自己得先撒一次谎。」',
      next: 'branch1'
    },

    {
      type: 'branch',
      id: 'branch1',
      // 本层是否害过人/受过贿（层内 flag 判定）
      cond: {
        op: 'or',
        items: [{ op: 'flag', key: 'toll_framed' }, { op: 'flag', key: 'took_bribe' }]
      },
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
      title: '油锅狱 · 通行',
      text: '油锅在身后渐渐凉下去，油香散了，换成一股潮湿的土腥气。刑之狱三座山，你没把任何人推下去，没接那袋烫手的香火。前方雾色昏黄，隐约听见牛哞和铁链拖地的声音——第十层，牛坑狱。',
      verdict: 'truth'
    },
    {
      type: 'ending',
      id: 'end_wounded',
      title: '油锅狱 · 带伤通行',
      text: '你捂着舌伤离开油锅，好在最后那句堂前的真话到底说出了口。判官说得对，妄言的伤疼，可认了错的人还有路。前方牛哞声沉闷地传来，铁链一寸寸拖着地——冤之狱的规矩，听说和前九层都不一样。',
      verdict: 'wounded'
    },
    {
      type: 'ending',
      id: 'end_debt',
      title: '油锅狱 · 负债通行',
      text: '你数着抢来、贿来的香火走出油锅殿，袋子沉，舌头轻。油锅里溅起的油星、堂前那句没敢说全的实话，都没再发出声音——可你知道，债不过是换了个层数等着。雾色昏黄处，牛坑狱的铁链声，正一下下拖在你心口上。',
      verdict: 'debt'
    }
  ]
};
