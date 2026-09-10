import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { useGameStore } from '@/engine/store';
import { firstUncompleted } from '@/engine/levels-meta';
import { getLevel } from '@/data/levels';
import styles from './index.module.scss';

/** 四种终局结局（第十八层审判后解锁） */
const FINALE_ENDINGS = [
  { id: 'end_truth', name: '诚实善终' },
  { id: 'end_reincarnate', name: '带债转世' },
  { id: 'end_tongueless', name: '拔舌永狱' },
  { id: 'end_reversal', name: '真相之下' }
];

const MinePage: React.FC = () => {
  const incense = useGameStore((s) => s.incense);
  const debt = useGameStore((s) => s.debt);
  const completed = useGameStore((s) => s.completed);
  const endings = useGameStore((s) => s.endings);
  const resetAll = useGameStore((s) => s.resetAll);

  const handleContinue = () => {
    const target = firstUncompleted(completed);
    const level = getLevel(target.id);
    Taro.navigateTo({ url: `/pages/game/index?levelId=${level ? target.id : 'level01'}` });
  };

  const handleReset = () => {
    Taro.showModal({
      title: '焚毁卷宗',
      content: '香火、债务、通关记录都将抹去，确定重来吗？',
      confirmText: '焚毁',
      confirmColor: '#b03a2e',
      cancelText: '再想想',
      success: (res) => {
        if (res.confirm) {
          resetAll();
          Taro.showToast({ title: '卷宗已焚，前尘尽忘', icon: 'none' });
        }
      }
    }).catch((err) => console.error('[Mine] 弹窗失败', err));
  };

  return (
    <View className={styles.page}>
      <View className={styles.header}>
        <Text className={styles.headerTitle}>卷 宗</Text>
        <Text className={styles.headerDesc}>阳间带来的账，地狱里一笔一笔记着</Text>
      </View>

      <View className={styles.card}>
        <Text className={styles.cardTitle}>名下账目</Text>
        <View className={styles.statRow}>
          <Text className={styles.statLabel}>真言香火</Text>
          <Text className={styles.statValue}>{incense} 炷</Text>
        </View>
        <View className={styles.statRow}>
          <Text className={styles.statLabel}>谎言债务</Text>
          <Text className={classnames(styles.statValue, debt > 0 && styles.statValueWarn)}>
            {debt} 笔
          </Text>
        </View>
        <View className={styles.statRow}>
          <Text className={styles.statLabel}>已通关层数</Text>
          <Text className={styles.statValue}>{completed.length} / 18</Text>
        </View>
        <View className={styles.statRow}>
          <Text className={styles.statLabel}>舌</Text>
          <Text className={styles.statValue}>每层重置 3 条</Text>
        </View>
      </View>

      <View className={styles.card}>
        <Text className={styles.cardTitle}>终局结局 · 共四种</Text>
        <View className={styles.endingGrid}>
          {FINALE_ENDINGS.map((ending) => {
            const open = endings.includes(ending.id);
            return (
              <View key={ending.id} className={styles.endingItem}>
                <Text className={classnames(styles.endingName, open && styles.endingNameOpen)}>
                  {open ? ending.name : '？？？'}
                </Text>
                <Text className={classnames(styles.endingState, open && styles.endingStateOpen)}>
                  {open ? '已证' : '待第十八层审判'}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      <View className={styles.btnPrimary} onClick={handleContinue}>
        <Text className={styles.btnPrimaryText}>继续审判</Text>
      </View>
      <View className={styles.btnDanger} onClick={handleReset}>
        <Text className={styles.btnDangerText}>焚毁卷宗（清档）</Text>
      </View>
    </View>
  );
};

export default MinePage;
