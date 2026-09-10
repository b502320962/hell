import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import { useGameStore } from '@/engine/store';
import { getLevel } from '@/data/levels';
import { LEVEL_META } from '@/engine/levels-meta';
import styles from './index.module.scss';

const VERDICT_TEXT: Record<string, string> = {
  truth: '真言之魂 · 舌齿齐整',
  wounded: '带伤过关 · 余舌尚存',
  debt: '负债而行 · 后账待算'
};

const SettlementPage: React.FC = () => {
  const lastVerdict = useGameStore((s) => s.lastVerdict);

  useDidShow(() => {
    if (!lastVerdict) {
      console.warn('[Settlement] 无判词数据，返回图鉴');
      Taro.switchTab({ url: '/pages/gallery/index' });
    }
  });

  if (!lastVerdict) {
    return <View className={styles.page} />;
  }

  const currentMeta = LEVEL_META.find((item) => item.id === lastVerdict.levelId);
  const nextMeta = currentMeta ? LEVEL_META[currentMeta.index] : undefined; // index 已 +1，取下一层
  const nextLevelExists = nextMeta ? !!getLevel(nextMeta.id) : false;

  const handleNext = () => {
    if (nextMeta && nextLevelExists) {
      Taro.redirectTo({ url: `/pages/game/index?levelId=${nextMeta.id}` });
    } else {
      Taro.showToast({ title: '前路雾重，后续诸层将于续篇开启', icon: 'none', duration: 2000 });
    }
  };

  const handleGallery = () => {
    Taro.switchTab({ url: '/pages/gallery/index' });
  };

  return (
    <View className={styles.page}>
      <View className={styles.seal}>
        <Text className={styles.sealText}>行</Text>
      </View>
      <Text className={styles.title}>{lastVerdict.title}</Text>
      <Text className={styles.verdictTag}>{VERDICT_TEXT[lastVerdict.verdict] ?? '通行'}</Text>

      <View className={styles.card}>
        <Text className={styles.cardText}>{lastVerdict.text}</Text>
      </View>

      <View className={styles.card}>
        <View className={styles.rewardRow}>
          <Text className={styles.rewardLabel}>通行香火</Text>
          <Text className={styles.rewardValue}>+{lastVerdict.baseReward}</Text>
        </View>
        <View className={styles.rewardRow}>
          <Text className={styles.rewardLabel}>舌齿完好赏（余 {lastVerdict.tongueLeft} 条）</Text>
          <Text className={styles.rewardValue}>+{lastVerdict.tongueBonus}</Text>
        </View>
        <View className={styles.rewardRow}>
          <Text className={styles.rewardLabel}>合计</Text>
          <Text className={styles.rewardValue}>+{lastVerdict.totalReward} 香火</Text>
        </View>
      </View>

      <View className={styles.btnPrimary} onClick={handleNext}>
        <Text className={styles.btnPrimaryText}>下一层 · {nextMeta?.title ?? '雾中坊门'}</Text>
      </View>
      <View className={styles.btnGhost} onClick={handleGallery}>
        <Text className={styles.btnGhostText}>返回图鉴</Text>
      </View>
    </View>
  );
};

export default SettlementPage;
