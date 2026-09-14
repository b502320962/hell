import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { useGameStore } from '@/engine/store';
import { LEVEL_GROUPS, LEVEL_META, isLevelUnlocked, type LevelMeta } from '@/engine/levels-meta';
import { getLevel } from '@/data/levels';
import styles from './index.module.scss';

interface GalleryCell {
  meta: LevelMeta;
  done: boolean;
  unlocked: boolean;
  implemented: boolean;
}

const GalleryPage: React.FC = () => {
  const completed = useGameStore((s) => s.completed);

  const cellsByGroup = LEVEL_GROUPS.map((group) => {
    const metas = LEVEL_META.filter((meta) => meta.group === group.name);
    const cells: GalleryCell[] = group.levels.map((_title, i) => {
      const meta = metas[i];
      const done = completed.includes(meta.id);
      const unlocked = isLevelUnlocked(meta.id, completed);
      return {
        meta,
        done,
        unlocked,
        implemented: !!getLevel(meta.id)
      };
    });
    return { group, cells };
  });

  const handleTap = (cell: GalleryCell) => {
    if (!cell.unlocked) {
      Taro.showToast({ title: '雾中坊门，通关前一层方可进入', icon: 'none', duration: 1800 });
      return;
    }
    if (!cell.implemented) {
      Taro.showToast({ title: '此层尚在雾中，续篇将开', icon: 'none', duration: 1800 });
      return;
    }
    Taro.navigateTo({ url: `/pages/game/index?levelId=${cell.meta.id}` });
  };

  return (
    <View className={styles.page}>
      <View className={styles.header}>
        <Text className={styles.headerTitle}>十 八 层 图 鉴</Text>
        <Text className={styles.headerDesc}>已通关 {completed.length} / 18 层 · 自上而下，层层深入</Text>
      </View>

      {cellsByGroup.map(({ group, cells }) => (
        <View key={group.name} className={styles.group}>
          <View className={styles.groupHeader}>
            <Text className={styles.groupName}>{group.name}</Text>
            <Text className={styles.groupDesc}>{group.desc}</Text>
          </View>
          <View className={styles.levelGrid}>
            {cells.map((cell) => (
              <View
                key={cell.meta.id}
                className={classnames(
                  styles.levelCard,
                  cell.done && styles.levelDone,
                  cell.unlocked && !cell.done && styles.levelOpen,
                  !cell.unlocked && styles.levelLocked
                )}
                onClick={() => handleTap(cell)}
              >
                <View className={styles.levelLeft}>
                  <View
                    className={classnames(
                      styles.levelIndex,
                      cell.unlocked && !cell.done && styles.levelIndexOpen
                    )}
                  >
                    <Text className={styles.levelIndexText}>
                      {cell.unlocked ? cell.meta.index : '？'}
                    </Text>
                  </View>
                  <Text
                    className={classnames(
                      styles.levelName,
                      !cell.unlocked && styles.levelNameLocked
                    )}
                  >
                    {cell.unlocked ? cell.meta.title : '未 知 之 狱'}
                  </Text>
                </View>
                {cell.done ? (
                  <Text className={classnames(styles.levelStatus, styles.statusDone)}>已通行 · 印</Text>
                ) : cell.unlocked ? (
                  <Text className={styles.levelStatus}>{cell.implemented ? '可入' : '雾中'}</Text>
                ) : (
                  <Text className={styles.fogMark}>≋</Text>
                )}
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default GalleryPage;
