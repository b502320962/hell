// ============================================
// 第 1 层 · 拔舌狱（教学层）
// 教学点：守规（说谎扣舌）、因果簿收录、矛盾指认、对质失败扣舌
// ============================================

import type { Level } from '../../engine/types';

export const level01: Level = {
  id: 'level01',
  title: '拔舌狱',
  subtitle: '第一层 · 舌之狱',
  group: '舌之狱',
  intro: '铁索横空，舌钳悬顶。这里是说谎者坠入的第一层。',
  startNode: 'd1',
  baseReward: 5,
  nodes: [
    {
      type: 'dialogue',
      id: 'd1',
      speaker: '引路鬼差',
      text: '醒醒，新来的。过了这道坊门，阳间的路就断了。低头看看你脚下——黑的，不是夜，是忘川底。',
      next: 'd2'
    },
    {
      type: 'dialogue',
      id: 'd2',
      speaker: '引路鬼差',
      text: '这里是拔舌狱，地狱第一层。新来的阎王立下新规，十八层地狱，层层都贴着同一条符——',
      next: 'd3'
    },
    {
      type: 'dialogue',
      id: 'd3',
      text: '血红色的符字悬在半空，一笔一划像刚写完：「这里禁止说谎」。',
      next: 'd4'
    },
    {
      type: 'dialogue',
      id: 'd4',
      speaker: '引路鬼差',
      text: '规矩很简单：说谎，拔舌一条。人有三条舌的余量，拔尽了——就从这层的开头，重新爬。',
      next: 'c1'
    },
    {
      type: 'choice',
      id: 'c1',
      speaker: '引路鬼差',
      prompt: '鬼差拿铁笔挑起你的下巴：「报上来，你生前可说过谎？」',
      options: [
        {
          text: '「我一生诚实，从不说半句假话。」',
          isLie: true,
          tonguePenalty: 1,
          next: 'p1'
        },
        {
          text: '「说过，很多。我是揣着一肚子谎掉下来的。」',
          incense: 2,
          setFlag: 'confessed_at_gate',
          next: 'd5'
        }
      ]
    },
    {
      type: 'dialogue',
      id: 'p1',
      text: '符字骤然亮起！一把看不见的舌钳探入口中，舌尖一麻——像被人生生扯去了半截。第一条舌，没了。',
      next: 'p2'
    },
    {
      type: 'dialogue',
      id: 'p2',
      speaker: '引路鬼差',
      text: '「都到了这儿还嘴硬。记住疼，比记住规矩管用。」鬼差收回铁笔，「走吧，前头有个杀妻的谎鬼，正在过堂，看看别人怎么死的。」',
      next: 'd6'
    },
    {
      type: 'dialogue',
      id: 'd5',
      speaker: '引路鬼差',
      text: '鬼差愣了一下，笔尖在册子上顿了顿：「头一个上来就认的，少见。算你识相，记你两炷真言香火。」',
      next: 'd6'
    },
    {
      type: 'dialogue',
      id: 'd6',
      text: '对质台上跪着个青面鬼，浑身湿漉漉的，像刚从油锅里捞出来。他就是李四，生前杀了发妻，此刻还在喊冤。',
      next: 'd7'
    },
    {
      type: 'dialogue',
      id: 'd7',
      speaker: '李四',
      text: '「大人明鉴！小人冤啊！小人昨夜整夜都泡在城东赌坊里，压根没回过家，怎么可能害死发妻？」',
      next: 'clue1'
    },
    {
      type: 'clue',
      id: 'clue1',
      clue: {
        id: 'clue_lisi_testimony',
        kind: 'testimony',
        title: '李四的供词',
        source: '对质台 · 李四',
        text: '自称昨夜整夜都在城东赌坊，未曾回家，不可能害死发妻。'
      },
      next: 'd8'
    },
    {
      type: 'dialogue',
      id: 'd8',
      speaker: '引路鬼差',
      text: '鬼差把一卷皱巴巴的证词塞进你手里：「判官还没问你话。你既入了地狱，先学学怎么看谎。这是赌坊掌柜的证词，记进你的因果簿。」',
      next: 'clue2'
    },
    {
      type: 'clue',
      id: 'clue2',
      clue: {
        id: 'clue_boss_testimony',
        kind: 'testimony',
        title: '赌坊掌柜证词',
        source: '城东赌坊 · 王掌柜',
        text: '昨夜赌坊子时一到就上了门板。李四输得精光，亥时刚过就骂骂咧咧地走了，绝没留到天亮。'
      },
      next: 'd9'
    },
    {
      type: 'dialogue',
      id: 'd9',
      speaker: '判官',
      text: '堂上判官抬眼看向你：「新魂，本官方寸已乱。你来说——这满台的话里，哪一句是谎？指错了，同你妄言之罪。」',
      next: 'puzzle1'
    },
    {
      type: 'puzzle',
      id: 'puzzle1',
      successNext: 'd10',
      puzzle: {
        kind: 'contradiction',
        prompt: '比对因果簿中的证词，点破李四话里的谎话。',
        refClueId: 'clue_boss_testimony',
        hint: '李四说"整夜都在赌坊"，可掌柜说赌坊子时上门板、他亥时就走了。',
        statements: [
          {
            id: 'stmt_1',
            speaker: '李四',
            text: '「小人昨夜整夜都泡在城东赌坊里，压根没回过家。」'
          },
          {
            id: 'stmt_2',
            speaker: '李四',
            text: '「小人与发妻素来恩爱，连口角都不曾有过。」'
          },
          {
            id: 'stmt_3',
            speaker: '李四',
            text: '「小人输光了钱是真，可那也犯不上杀人啊。」'
          }
        ],
        answerStatementId: 'stmt_1',
        successText: '你指得没错。赌坊子时便已关门，他亥时就已离开——「整夜在赌坊」是句铁证如山的谎话。',
        failText: '判官将惊堂木一拍：「证据未到之处，休得妄言！」舌上又是一阵剧痛。'
      }
    },
    {
      type: 'dialogue',
      id: 'd10',
      text: '李四的脸在堂前一寸寸拉长，皮肉像泡发的纸一样剥落——他现了原形，果然是条靠谎话苟着的谎鬼。',
      next: 'd11'
    },
    {
      type: 'dialogue',
      id: 'd11',
      speaker: '判官',
      text: '「来人，拔舌！」判官转向你，目光在你脸上停了许久，「新魂，你能识别人间的谎。可本官方才问你——你自己的谎，可能也照实招了？」',
      next: 'branch1'
    },
    {
      type: 'branch',
      id: 'branch1',
      cond: { op: 'flag', key: 'confessed_at_gate' },
      then: 'd12_good',
      else: 'd12_bad'
    },
    {
      type: 'dialogue',
      id: 'd12_good',
      speaker: '判官',
      text: '判官翻了翻册子，神色稍缓：「坊门处便已招认，舌齿还齐整。也罢，第一层，准你通行。真言之路，从承认自己说谎开始。」',
      next: 'end1'
    },
    {
      type: 'dialogue',
      id: 'd12_bad',
      speaker: '判官',
      text: '判官冷笑：「进门便虚报诚实，舌上还带着钳伤。谎能识得别人的，却舍不得用在自己身上——带着伤往下走吧。第二层的规矩，只会更硬。」',
      next: 'end1'
    },
    {
      type: 'ending',
      id: 'end1',
      title: '拔舌狱 · 通行',
      text: '坊门在身后合拢，脚下的黑石阶梯继续向下延深。身后传来李四一声接一声的惨叫，很快被风吹散。',
      verdict: 'truth'
    }
  ]
};
