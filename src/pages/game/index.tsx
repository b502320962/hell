import React, { useEffect, useMemo, useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro, { useLoad } from '@tarojs/taro';
import {
  useGameStore,
  MAX_TONGUE,
  hintCostFor,
  wrongPenalty
} from '@/engine/store';
import { getLevel } from '@/data/levels';
import { evalCond } from '@/engine/conditions';
import type {
  BranchNode,
  ChoiceNode,
  ClueNode,
  DialogueNode,
  EndingNode,
  PuzzleNode
} from '@/engine/types';
import TopStatusBar from '@/components/TopStatusBar';
import DialogueBubble from '@/components/DialogueBubble';
import ChoiceList from '@/components/ChoiceList';
import ClueBookDrawer from '@/components/ClueBookDrawer';
import PuzzleHost from '@/components/PuzzleHost';
import styles from './index.module.scss';

const GamePage: React.FC = () => {
  const levelId = useGameStore((s) => s.levelId);
  const nodeId = useGameStore((s) => s.nodeId);
  const tongue = useGameStore((s) => s.tongue);
  const incense = useGameStore((s) => s.incense);
  const clues = useGameStore((s) => s.clues);
  const levelFlags = useGameStore((s) => s.levelFlags);
  const globalFlags = useGameStore((s) => s.globalFlags);
  const wrongAttempts = useGameStore((s) => s.wrongAttempts);
  const hintCount = useGameStore((s) => s.hintCount);
  const levelFailed = useGameStore((s) => s.levelFailed);

  const startLevel = useGameStore((s) => s.startLevel);
  const restartLevel = useGameStore((s) => s.restartLevel);
  const goTo = useGameStore((s) => s.goTo);
  const addClueAndAdvance = useGameStore((s) => s.addClueAndAdvance);
  const applyChoice = useGameStore((s) => s.applyChoice);
  const puzzleOutcome = useGameStore((s) => s.puzzleOutcome);
  const spendHint = useGameStore((s) => s.spendHint);
  const finishLevel = useGameStore((s) => s.finishLevel);
  const exitLevel = useGameStore((s) => s.exitLevel);

  const [bookOpen, setBookOpen] = useState(false);

  useLoad((options) => {
    const target = options?.levelId || 'level01';
    console.info('[Game] 加载关卡', target);
    startLevel(target);
  });

  const level = useMemo(() => getLevel(levelId), [levelId]);
  const node = useMemo(
    () => level?.nodes.find((item) => item.id === nodeId),
    [level, nodeId]
  );

  // 分支节点：进入即求值跳转
  useEffect(() => {
    if (node?.type === 'branch') {
      const branch = node as BranchNode;
      const ctx = {
        tongue,
        incense,
        debt: useGameStore.getState().debt,
        flags: { ...globalFlags, ...levelFlags },
        clueIds: clues.map((clue) => clue.id)
      };
      const matched = evalCond(branch.cond, ctx);
      const target = matched ? branch.then : branch.else;
      if (target) {
        console.info('[Game] 分支判定', branch.id, matched ? '→then' : '→else', target);
        goTo(target);
      }
    }
  }, [node, tongue, incense, globalFlags, levelFlags, clues, goTo]);

  const handleDialogueAdvance = (dialogue: DialogueNode) => {
    if (dialogue.next) goTo(dialogue.next);
  };

  const handleClueAdvance = (clueNode: ClueNode) => {
    addClueAndAdvance(clueNode.clue, clueNode.next);
  };

  const handleChoose = (choiceNode: ChoiceNode, index: number) => {
    const option = choiceNode.options[index];
    if (!option) return;
    const result = applyChoice(option);
    if (result.unaffordable) {
      Taro.showToast({ title: '香火不足，真话也买不了路', icon: 'none', duration: 1600 });
      return;
    }
    if (result.lie) {
      Taro.vibrateShort({ type: 'heavy' }).catch(() => {});
      Taro.showToast({
        title: result.tongueAfter <= 0 ? '舌已拔尽！' : '谎话被识破，拔舌一条！',
        icon: 'none',
        duration: 1600
      });
    }
  };

  const handlePuzzleSubmit = (puzzleNode: PuzzleNode, success: boolean) => {
    if (!success) {
      Taro.vibrateShort({ type: 'medium' }).catch(() => {});
      const penalty = wrongPenalty((wrongAttempts[puzzleNode.id] ?? 0) + 1);
      Taro.showToast({
        title: penalty > 1 ? `妄言！连错拔舌${penalty}条` : '妄言！拔舌一条',
        icon: 'none',
        duration: 1400
      });
    }
    puzzleOutcome(puzzleNode.id, success, puzzleNode.successNext, puzzleNode.failNext);
  };

  const handleFinish = (ending: EndingNode) => {
    finishLevel(ending);
    Taro.redirectTo({ url: '/pages/settlement/index' });
  };

  const handleRestart = () => {
    restartLevel();
  };

  const handleExit = () => {
    exitLevel();
    Taro.switchTab({ url: '/pages/gallery/index' });
  };

  if (!level || !node) {
    return (
      <View className={styles.page}>
        <View className={styles.content}>
          <Text>坊门未开……</Text>
        </View>
      </View>
    );
  }

  return (
    <View className={styles.page}>
      <TopStatusBar
        tongue={tongue}
        maxTongue={MAX_TONGUE}
        incense={incense}
        clueCount={clues.length}
        onOpenBook={() => setBookOpen(true)}
      />

      <View className={styles.sceneHeader}>
        <Text className={styles.subtitle}>{level.subtitle}</Text>
        <Text className={styles.title}>{level.title}</Text>
        <View className={styles.sealLine} />
      </View>

      <View className={styles.content}>
        {node.type === 'dialogue' ? (
          <DialogueBubble
            speaker={node.speaker}
            text={node.text}
            narrative={!node.speaker}
            onClick={() => handleDialogueAdvance(node)}
          />
        ) : null}

        {node.type === 'clue' ? (
          <DialogueBubble
            speaker="因果簿"
            text={`【${node.clue.title}】${node.clue.text}`}
            onClick={() => handleClueAdvance(node)}
          />
        ) : null}

        {node.type === 'choice' ? (
          <ChoiceList
            speaker={node.speaker}
            prompt={node.prompt}
            options={node.options.map((option) => {
              const cost = option.requireIncense;
              const tooPoor = typeof cost === 'number' && incense < cost;
              return {
                text: option.text,
                disabled: tooPoor,
                tag: typeof cost === 'number' ? (tooPoor ? `需香火 ${cost}` : `香火 −${cost}`) : undefined,
                tagWarn: tooPoor
              };
            })}
            onChoose={(index) => handleChoose(node, index)}
          />
        ) : null}

        {node.type === 'puzzle' ? (
          <PuzzleHost
            key={node.id}
            puzzle={node.puzzle}
            puzzleId={node.id}
            wrongCount={wrongAttempts[node.id] ?? 0}
            clues={clues}
            hintCost={hintCostFor(hintCount)}
            canAffordHint={incense >= hintCostFor(hintCount)}
            onHint={spendHint}
            onSubmit={(success) => handlePuzzleSubmit(node, success)}
          />
        ) : null}

        {node.type === 'ending' ? (
          <View className={styles.endingBox}>
            <Text className={styles.endingTitle}>{node.title}</Text>
            <DialogueBubble text={node.text} onClick={() => handleFinish(node)} />
          </View>
        ) : null}
      </View>

      <ClueBookDrawer open={bookOpen} clues={clues} onClose={() => setBookOpen(false)} />

      {levelFailed ? (
        <View className={styles.failMask}>
          <View className={styles.failCard}>
            <Text className={styles.failTitle}>舌 已 拔 尽</Text>
            <Text className={styles.failText}>
              三条舌都被拔得干干净净。黑雾一卷，你又回到了这层地狱的坊门前——这一次，想清楚再开口。
            </Text>
            <View className={styles.failBtns}>
              <View className={styles.primaryBtn} onClick={handleRestart}>
                <Text className={styles.primaryBtnText}>重来本层</Text>
              </View>
              <View className={styles.ghostBtn} onClick={handleExit}>
                <Text className={styles.ghostBtnText}>返回图鉴</Text>
              </View>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default GamePage;
