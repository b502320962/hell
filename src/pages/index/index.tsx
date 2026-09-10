import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useGameStore } from '@/engine/store';
import { firstUncompleted } from '@/engine/levels-meta';
import { getLevel } from '@/data/levels';
import styles from './index.module.scss';

const IndexPage: React.FC = () => {
  const completed = useGameStore((s) => s.completed);

  const hasProgress = completed.length > 0;

  const handleEnter = () => {
    // 进入第一个已开放且已实装的层（当前为第一层）
    const target = firstUncompleted(completed);
    const level = getLevel(target.id);
    Taro.navigateTo({ url: `/pages/game/index?levelId=${level ? target.id : 'level01'}` });
  };

  const handleGallery = () => {
    Taro.switchTab({ url: '/pages/gallery/index' });
  };

  return (
    <View className={styles.page}>
      <View className={styles.top}>
        <Text className={styles.ghostSeal}>狱</Text>
        <Text className={styles.title}>十八层地狱</Text>
        <Text className={styles.subtitle}>这 里 禁 止 说 谎</Text>

        <View className={styles.ruleCard}>
          <Text className={styles.ruleText}>
            说谎者，拔舌一条；舌尽者，从头再爬。
            {'\n'}
            证词收录于因果簿，识破谎言方可下行。
            {'\n'}
            十八层之下，终判你生前身后的真。
          </Text>
        </View>
      </View>

      <View className={styles.bottom}>
        <View className={styles.btnPrimary} onClick={handleEnter}>
          <Text className={styles.btnPrimaryText}>{hasProgress ? '继续审判' : '入 地 狱'}</Text>
        </View>
        <View className={styles.btnGhost} onClick={handleGallery}>
          <Text className={styles.btnGhostText}>查看十八层图鉴</Text>
        </View>
        {hasProgress ? (
          <Text className={styles.progressHint}>已通关 {completed.length} 层，香火与判词均已存档</Text>
        ) : null}
      </View>
    </View>
  );
};

export default IndexPage;
