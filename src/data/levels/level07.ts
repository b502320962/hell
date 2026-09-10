// ============================================
// 第 7 层 · 刀山狱（刑之狱）
// 教学点：谎言代价（资源管理）——真话也要交"香火买路钱"；
//         说谎可抢别人的香火、拔舌并背债。三卡口逐次加码
// ============================================

import type { Level } from '../../engine/types';

export const level07: Level = {
  id: 'level07',
  title: '刀山狱',
  subtitle: '第七层 · 刑之狱',
  group: '刑之狱',
  intro: '刀刃成山，刃口朝上。攀山者每挪一步，都要在实话和别人的背上选一个。',
  startNode: 'd1',
  baseReward: 7,
  nodes: [
    {
      type: 'dialogue',
      id: 'd1',
      text: '眼前是一座望不见顶的刀山，密密麻麻的刀刃全部刀尖朝上，刃口泛着冷白的光。亡魂们排成一串往上爬，每过一道卡口，都要被守卡的剃刀鬼拦住盘问。',
      next: 'd2'
    },
    {
      type: 'dialogue',
      id: 'd2',
      speaker: '引路鬼差',
      text: '「前六层的规矩是不许说谎。到了这儿，规矩没改——可实话有了价。」鬼差朝山上努努嘴，「剃刀鬼收香火买路钱：你肯交，照实答，刀刃自己分开给你让路；交不起，又想过卡……有的是法子。」',
      next: 'd3'
    },
    {
      type: 'dialogue',
      id: 'd3',
      speaker: '引路鬼差',
      text: '他压低声音：「提醒你一句——也有人不交钱，指着旁边一起爬的冤魂，编句瞎话让剃刀鬼把人拖走，踩着空出来的刃面过去，还能顺手摸走那亡魂的香火袋。刀山不拦活人……不，不拦聪明鬼。只是账，地狱替你记着。」',
      next: 'd4'
    },
    {
      type: 'dialogue',
      id: 'd4',
      text: '你抬头望去，刀山上三道卡口依次隐在血雾里。你攥了攥香火袋，向第一道卡口攀去。',
      next: 'cp1'
    },

    // —— 第一道卡口 ——
    {
      type: 'choice',
      id: 'cp1',
      speaker: '剃刀鬼甲',
      prompt: '「站住！报上名来——你是自己爬上山的，还是被人推搡着、身不由己滚到这儿来的？」',
      options: [
        {
          text: '「我自己一步步爬上来的。身前的罪，我自己认。」（交香火买路钱）',
          requireIncense: 2,
          next: 'cp1_ok'
        },
        {
          text: '「是身后那个老鬼一路把我推上来的！不干我事，你们拿他！」',
          isLie: true,
          tonguePenalty: 1,
          incense: 3,
          addDebt: true,
          setFlag: 'framed_1',
          next: 'cp1_lie'
        }
      ]
    },
    {
      type: 'dialogue',
      id: 'cp1_ok',
      speaker: '剃刀鬼甲',
      text: '剃刀鬼掂了掂香火，面无表情地把一排刀尖按了下去：「认账的，过。」刀刃在你脚下让出一条窄窄的路。',
      next: 'cp2_intro'
    },
    {
      type: 'dialogue',
      id: 'cp1_lie',
      text: '符字骤亮，刀尖弹起咬住你的舌头——一条舌没了。两个剃刀鬼不由分说把身后的老鬼拖下刀山，他哭喊的声音越来越远。你捡起他遗落的香火袋，脚步没停。',
      next: 'cp2_intro'
    },
    {
      type: 'dialogue',
      id: 'cp2_intro',
      text: '第二道卡口前，刀刃更密了。一个年轻媳妇抱着半袋香火，正抖着嘴唇往前挪。',
      next: 'cp2'
    },

    // —— 第二道卡口 ——
    {
      type: 'choice',
      id: 'cp2',
      speaker: '剃刀鬼乙',
      prompt: '「你怀里揣的香火，从哪儿来的？是断狱挣的清白香火，还是半道上从别人身上摸的？说清楚。」',
      options: [
        {
          text: '「一层层断狱挣来的，每炷都见得了光。」（交香火买路钱）',
          requireIncense: 3,
          next: 'cp2_ok'
        },
        {
          text: '「是前头那小媳妇的，她偷拿别人香火，我替你们逮住她！」',
          isLie: true,
          tonguePenalty: 1,
          incense: 4,
          addDebt: true,
          setFlag: 'framed_2',
          next: 'cp2_lie'
        }
      ]
    },
    {
      type: 'dialogue',
      id: 'cp2_ok',
      speaker: '剃刀鬼乙',
      text: '香火落进鬼爪，刀丛左右分开。剃刀鬼乙瞟你一眼：「你袋里的香火比别人干净些——闻得出来。过。」',
      next: 'cp3_intro'
    },
    {
      type: 'dialogue',
      id: 'cp2_lie',
      text: '舌上再添一道刀口。小媳妇哭嚎着被拖入刀丛，怀里的香火撒了一地，被你拢进了自己的袋子。符字在血雾里冷冷亮着，像在记数。',
      next: 'cp3_intro'
    },
    {
      type: 'dialogue',
      id: 'cp3_intro',
      text: '第三道卡口立在刀山顶，雾最重，风里全是铁器的腥味。卡口前只剩一个瞎眼老叟，拄着刃尖探路。',
      next: 'cp3'
    },

    // —— 第三道卡口 ——
    {
      type: 'choice',
      id: 'cp3',
      speaker: '剃刀鬼丙',
      prompt: '「最后一问。山上这些亡魂，你可曾为了自己过卡，把谁推下去过？想好了再答——刀山顶上，风声会替死人作证。」',
      options: [
        {
          text: '「没有。我交我的香火，走我的刃，没踩过任何人。」（交香火买路钱）',
          requireIncense: 4,
          next: 'cp3_ok'
        },
        {
          text: '「那瞎老头方才推了我一把！要不是我躲得快，掉下去的就是我——先拿他问罪！」',
          isLie: true,
          tonguePenalty: 1,
          incense: 5,
          addDebt: true,
          setFlag: 'framed_3',
          next: 'cp3_lie'
        }
      ]
    },
    {
      type: 'dialogue',
      id: 'cp3_ok',
      speaker: '剃刀鬼丙',
      text: '剃刀鬼久久地盯着你，忽然把整排刀刃按平：「香火不差，脚下也干净。刀山千万亡魂，肯一路掏钱不掏良心的，不多。过吧。」',
      next: 'branch1'
    },
    {
      type: 'dialogue',
      id: 'cp3_lie',
      text: '第三条舌伤几乎要了你的命。瞎眼老叟被推下刀山时没有喊，只在坠落前轻轻「咦」了一声——像在奇怪，自己明明什么也没做。风把他的香火袋卷到你脚边，沉甸甸的。',
      next: 'branch1'
    },

    {
      type: 'branch',
      id: 'branch1',
      // 本层是否嫁祸过旁人（层内 flag 判定，与跨层债务分开）
      cond: {
        op: 'or',
        items: [
          { op: 'flag', key: 'framed_1' },
          { op: 'flag', key: 'framed_2' },
          { op: 'flag', key: 'framed_3' }
        ]
      },
      then: 'end_debt',
      else: 'end_good'
    },
    {
      type: 'ending',
      id: 'end_good',
      title: '刀山狱 · 通行',
      text: '刀山在身后合拢，无数刀尖重新竖起。你的香火袋瘪了大半，可舌头还齐整，身上没背一条命债。下山的风冷得反常——前面白茫茫一片，连刀刃上都结了冰。',
      verdict: 'truth'
    },
    {
      type: 'ending',
      id: 'end_debt',
      title: '刀山狱 · 负债通行',
      text: '你摸着鼓鼓的香火袋下了刀山，舌上的伤一跳一跳地疼。那些被你推下去的亡魂没有声音，可你知道账记在哪儿——刀山上的符字一笔一划，写的全是你编过的瞎话。前面冰雾弥漫，冷得像在等什么人还债。',
      verdict: 'debt'
    }
  ]
};
