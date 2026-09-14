import React, { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import classnames from 'classnames';
import type { PuzzleData } from '../../engine/types';
import type { Clue } from '../../engine/types';
import styles from './index.module.scss';

interface PuzzleHostProps {
  /** 所在谜题节点 id（用于调试与追踪） */
  puzzleId?: string;
  puzzle: PuzzleData;
  wrongCount: number;
  clues: Clue[];
  hintCost: number;
  canAffordHint: boolean;
  onHint: () => boolean;
  onSubmit: (success: boolean) => void;
}

interface Feedback {
  success: boolean;
  text: string;
}

/**
 * 谜题宿主：承接剧本中的 puzzle 节点
 * 矛盾指认 / 真话独木桥 / 审判定罪 / 镜中找异
 * 作答后先展示反馈文本，点击「继续」再向引擎结算
 */
const PuzzleHost: React.FC<PuzzleHostProps> = ({
  puzzle,
  wrongCount,
  clues,
  hintCost,
  canAffordHint,
  onHint,
  onSubmit
}) => {
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [hintShown, setHintShown] = useState(false);
  // 真话独木桥：当前题号
  const [bridgeIndex, setBridgeIndex] = useState(0);
  // 审判定罪：已选证据
  const [chosen, setChosen] = useState<string[]>([]);
  // 双谎指认：已点破的陈述
  const [found, setFound] = useState<string[]>([]);

  const handleHint = () => {
    if (onHint()) setHintShown(true);
  };

  const finishFeedback = (success: boolean, text: string) => {
    setFeedback({ success, text });
    // 失败在此一次性结算扣舌；成功则等玩家点击"继续"后跳转
    if (!success) {
      onSubmit(false);
    }
  };

  /** 反馈按钮：成功→引擎跳转；失败→本地重置作答态（扣舌已在答错时结算） */
  const handleFeedbackContinue = () => {
    if (!feedback) return;
    if (feedback.success) {
      onSubmit(true);
    } else {
      setFeedback(null);
      setBridgeIndex(0);
      setChosen([]);
      setFound([]);
    }
  };

  // —— 矛盾指认（单谎 / 双谎） ——
  const handleContradiction = (statementId: string) => {
    if (feedback) return;
    if (puzzle.kind !== 'contradiction') return;
    const answers = puzzle.answerStatementIds ?? [puzzle.answerStatementId];
    if (answers.includes(statementId)) {
      if (found.includes(statementId)) return;
      const next = [...found, statementId];
      setFound(next);
      // 双谎指认：全部点破才算通过
      if (next.length >= answers.length) {
        finishFeedback(true, puzzle.successText);
      }
    } else {
      finishFeedback(false, puzzle.failText);
    }
  };

  // —— 真话独木桥 ——
  const handleBridgeAnswer = (isLie: boolean | undefined) => {
    if (feedback || puzzle.kind !== 'truthBridge') return;
    if (isLie) {
      finishFeedback(false, puzzle.failText);
      return;
    }
    if (bridgeIndex + 1 >= puzzle.questions.length) {
      finishFeedback(true, puzzle.successText);
    } else {
      setBridgeIndex(bridgeIndex + 1);
    }
  };

  // —— 审判定罪 ——
  const toggleClue = (clueId: string) => {
    if (feedback) return;
    setChosen((prev) =>
      prev.includes(clueId) ? prev.filter((id) => id !== clueId) : [...prev, clueId]
    );
  };

  const submitJudgment = () => {
    if (feedback || puzzle.kind !== 'judgment') return;
    const correct =
      chosen.length === puzzle.answerClueIds.length &&
      puzzle.answerClueIds.every((id) => chosen.includes(id));
    finishFeedback(correct, correct ? puzzle.successText : puzzle.failText);
  };

  // —— 镜中找异 ——
  const handleMirrorSpot = (sceneId: string) => {
    if (feedback || puzzle.kind !== 'mirrorSpot') return;
    const success = sceneId === puzzle.answerId;
    finishFeedback(success, success ? puzzle.successText : puzzle.failText);
  };

  return (
    <View className={styles.wrapper}>
      <View className={styles.promptBox}>
        <Text className={styles.promptText}>{puzzle.prompt}</Text>
      </View>

      {/* 矛盾指认（单谎 / 双谎） */}
      {puzzle.kind === 'contradiction' ? (
        <View className={styles.statementList}>
          {puzzle.answerStatementIds && puzzle.answerStatementIds.length > 1 ? (
            <Text className={styles.multiProgress}>
              已点破 {found.length} / {puzzle.answerStatementIds.length} 处谎
            </Text>
          ) : null}
          {puzzle.statements.map((stmt) => {
            const foundThis = found.includes(stmt.id);
            return (
              <View
                key={stmt.id}
                className={classnames(
                  styles.statementCard,
                  foundThis && styles.cardChosen
                )}
                onClick={() => handleContradiction(stmt.id)}
              >
                <Text className={styles.speakerName}>{stmt.speaker}</Text>
                <Text className={styles.statementText}>{stmt.text}</Text>
                <Text className={styles.pickHint}>
                  {foundThis ? '√ 已点破' : '点此指认为谎话'}
                </Text>
              </View>
            );
          })}
        </View>
      ) : null}

      {/* 真话独木桥 */}
      {puzzle.kind === 'truthBridge' ? (
        <View className={styles.bridgeBox}>
          <Text className={styles.bridgeProgress}>
            第 {Math.min(bridgeIndex + 1, puzzle.questions.length)} 问 / 共{' '}
            {puzzle.questions.length} 问
          </Text>
          <View className={styles.promptBox}>
            <Text className={styles.promptText}>{puzzle.questions[bridgeIndex].prompt}</Text>
          </View>
          <View className={styles.optionList}>
            {puzzle.questions[bridgeIndex].options.map((opt, i) => (
              <View key={i} className={styles.optionItem} onClick={() => handleBridgeAnswer(opt.isLie)}>
                <Text className={styles.optionText}>{opt.text}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : null}

      {/* 审判定罪 */}
      {puzzle.kind === 'judgment' ? (
        <View className={styles.judgmentBox}>
          <Text className={styles.judgmentTarget}>待审：{puzzle.target}</Text>
          <ScrollView scrollY className={styles.clueScroll}>
            {clues.length === 0 ? (
              <Text className={styles.noClue}>因果簿中尚无证据，无法审判。</Text>
            ) : (
              clues.map((clue) => (
                <View
                  key={clue.id}
                  className={classnames(
                    styles.statementCard,
                    chosen.includes(clue.id) && styles.cardChosen
                  )}
                  onClick={() => toggleClue(clue.id)}
                >
                  <Text className={styles.speakerName}>{clue.title}</Text>
                  <Text className={styles.statementText}>{clue.text}</Text>
                </View>
              ))
            )}
          </ScrollView>
          <View
            className={classnames(styles.submitBtn, chosen.length === 0 && styles.btnDisabled)}
            onClick={submitJudgment}
          >
            <Text className={styles.submitText}>呈上证据链定罪（已选 {chosen.length} 条）</Text>
          </View>
        </View>
      ) : null}

      {/* 镜中找异 */}
      {puzzle.kind === 'mirrorSpot' ? (
        <View className={styles.statementList}>
          {puzzle.scenes.map((scene) => (
            <View
              key={scene.id}
              className={styles.statementCard}
              onClick={() => handleMirrorSpot(scene.id)}
            >
              <Text className={styles.speakerName}>{scene.label}</Text>
              <Text className={styles.statementText}>{scene.text}</Text>
              <Text className={styles.pickHint}>点此指认为异常</Text>
            </View>
          ))}
        </View>
      ) : null}

      {/* 提示 */}
      {!feedback && puzzle.hint ? (
        <View className={styles.hintArea}>
          {hintShown ? (
            <Text className={styles.hintText}>提示：{puzzle.hint}</Text>
          ) : (
            <View
              className={classnames(styles.hintBtn, !canAffordHint && styles.btnDisabled)}
              onClick={handleHint}
            >
              <Text className={styles.hintBtnText}>
                焚香火求提示（{hintCost} 香火{canAffordHint ? '' : '，香火不足'}）
              </Text>
            </View>
          )}
          {wrongCount >= 1 && !hintShown ? (
            <Text className={styles.retryHint}>已错 {wrongCount} 次，妄言也要拔舌。</Text>
          ) : null}
        </View>
      ) : null}

      {/* 结算反馈 */}
      {feedback ? (
        <View className={classnames(styles.feedback, feedback.success ? styles.fbSuccess : styles.fbFail)}>
          <Text className={styles.feedbackTitle}>{feedback.success ? '· 真相昭雪 ·' : '· 妄言 ·'}</Text>
          <Text className={styles.feedbackText}>{feedback.text}</Text>
          <View
            className={classnames(styles.continueBtn, feedback.success ? styles.btnSuccess : styles.btnFail)}
            onClick={handleFeedbackContinue}
          >
            <Text className={styles.continueText}>{feedback.success ? '继续' : '知道了，重新作答'}</Text>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default PuzzleHost;
