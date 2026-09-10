// ============================================
// 第 2 层 · 剪舌狱（舌之狱）
// 教学点：真话独木桥——真相由旁白先行给出，玩家须照实回答，
//         任一问说谎即扣舌，答错可原地重新作答（从第一问重来）
// ============================================

import type { Level } from '../../engine/types';

export const level02: Level = {
  id: 'level02',
  title: '剪舌狱',
  subtitle: '第二层 · 舌之狱',
  group: '舌之狱',
  intro: '铁剪悬梁，开合无声。这一层不审别人——审你自己。',
  startNode: 'd1',
  baseReward: 5,
  nodes: [
    {
      type: 'dialogue',
      id: 'd1',
      text: '坊门之后没有对质台，只有一张空荡荡的木椅。梁上垂着一把铁剪，剪口一张一合，像在等什么人开口。',
      next: 'd2'
    },
    {
      type: 'dialogue',
      id: 'd2',
      speaker: '剪刀婆',
      text: '「上一层你学的是识别人的谎。」一个佝偻的老妪从剪影下抬起头，「这一层，我只问你自己的事。三问，三答。照实说，剪子不落；掺一个字的假——」',
      next: 'd3'
    },
    {
      type: 'dialogue',
      id: 'd3',
      speaker: '剪刀婆',
      text: '铁剪「咔」地合上，又张开。「别怕，你生前那些事，本座都替你备好了。先看，看完再答。记性不好的人，最容易在这儿丢舌头。」',
      next: 'd4'
    },
    {
      type: 'dialogue',
      id: 'd4',
      text: '她一抖袖子，三段旧事浮在半空，像三盏快灭的灯——',
      next: 'mem1'
    },
    {
      type: 'dialogue',
      id: 'mem1',
      text: '【旧事一】你生前借过发小三两银子做本钱，后来生意折了，银子至死没还。发小临终前遣人来问，你躲在门后，没出声。',
      next: 'mem2'
    },
    {
      type: 'dialogue',
      id: 'mem2',
      text: '【旧事二】你母亲临终那晚，差人连跑三趟赌坊喊你回去。你正押着一把大的，听完只"嗯"了一声，直到天亮散场才往家走。灵堂的白幡已经挂起来了。',
      next: 'mem3'
    },
    {
      type: 'dialogue',
      id: 'mem3',
      text: '【旧事三】那年冬天，邻家孩童在冰面上哭喊救命，四周无人。你隔着篱笆听了片刻，拉紧棉袄，绕远路走了。第二天听说，孩子没救上来。',
      next: 'd5'
    },
    {
      type: 'dialogue',
      id: 'd5',
      speaker: '剪刀婆',
      text: '「都看清楚了？」老妪把铁剪往梁上一挂，「现在，答本座的话。记住——这里禁止说谎。」',
      next: 'puzzle1'
    },
    {
      type: 'puzzle',
      id: 'puzzle1',
      successNext: 'd6',
      puzzle: {
        kind: 'truthBridge',
        prompt: '三问三答。谎话出口，铁剪无情。',
        hint: '答案就在你刚看过的三段旧事里。怎么发生的，就怎么说。',
        questions: [
          {
            id: 'q1',
            prompt: '「发小那三两银子，你还了吗？」',
            options: [
              { text: '「银子我至死都欠着，他来讨时我连门都没敢开。」' },
              { text: '「早就还清了，我们之间一文不欠。」', isLie: true }
            ]
          },
          {
            id: 'q2',
            prompt: '「你母亲走的那晚，你守在床前吗？」',
            options: [
              { text: '「没有。我在赌坊押钱，天亮回去时，白幡都挂起来了。」' },
              { text: '「我守在她床前，送了她最后一程。」', isLie: true }
            ]
          },
          {
            id: 'q3',
            prompt: '「冰面上那孩子喊救命时，你做了什么？」',
            options: [
              { text: '「我假装没听见，拉紧棉袄，绕路走了。」' },
              { text: '「我冲过去跳进冰窟，把孩子拖上了岸。」', isLie: true }
            ]
          }
        ],
        successText:
          '三问答完，梁上的铁剪一动不动。剪刀婆盯着你看了许久：「……疼吗？」你没料到她会问这个。她说：「知道疼，就还剪不得。真话剜心，可剜的是腐肉。」',
        failText: '铁剪应声而落，舌头上像被剪去一截——不是肉，是你刚出口的那个字。「假的。」剪刀婆收回剪子，「从头再答，趁你还有舌。」'
      }
    },
    {
      type: 'dialogue',
      id: 'd6',
      speaker: '剪刀婆',
      text: '「拔舌狱治的是张嘴就来的谎，剪舌狱剪的是护着自己的谎。」老妪重新坐回剪影里，「前者欺人，后者欺心。你能把欺心的话咽回去，往下走的路，才算开了个头。」',
      next: 'branch1'
    },
    {
      type: 'branch',
      id: 'branch1',
      cond: { op: 'eq', key: 'tongue', value: 3 },
      then: 'end_good',
      else: 'end_wounded'
    },
    {
      type: 'ending',
      id: 'end_good',
      title: '剪舌狱 · 通行',
      text: '铁剪在身后合拢，发出一声轻响，像剪断了什么旧东西。石阶向下，雾气里隐隐浮出一棵树的轮廓，枝叶间寒光点点。',
      verdict: 'truth'
    },
    {
      type: 'ending',
      id: 'end_wounded',
      title: '剪舌狱 · 带伤通行',
      text: '你捂着嘴走下石阶，舌上的伤还在渗血。剪刀婆的声音从雾里追上来：「伤着下去也好——疼过的地方，记性最牢。」',
      verdict: 'wounded'
    }
  ]
};
