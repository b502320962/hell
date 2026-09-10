import React from 'react';
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';

interface TopStatusBarProps {
  tongue: number;
  maxTongue: number;
  incense: number;
  clueCount: number;
  onOpenBook: () => void;
}

/**
 * 顶部极简状态栏：单行，舌（朱砂印点）｜香火｜因果簿入口
 */
const TopStatusBar: React.FC<TopStatusBarProps> = ({
  tongue,
  maxTongue,
  incense,
  clueCount,
  onOpenBook
}) => {
  return (
    <View className={styles.bar}>
      <View className={styles.group}>
        <Text className={styles.label}>舌</Text>
        <View className={styles.pips}>
          {Array.from({ length: maxTongue }).map((_, index) => (
            <View
              key={index}
              className={classnames(styles.pip, index < tongue ? styles.pipAlive : styles.pipDead)}
            />
          ))}
        </View>
      </View>

      <View className={styles.group}>
        <Text className={styles.label}>香火</Text>
        <Text className={styles.value}>{incense}</Text>
      </View>

      <View className={styles.bookButton} onClick={onOpenBook}>
        <Text className={styles.bookText}>因果簿</Text>
        {clueCount > 0 ? (
          <View className={styles.badge}>
            <Text className={styles.badgeText}>{clueCount}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default TopStatusBar;
