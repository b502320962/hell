import React from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import classnames from 'classnames';
import type { Clue } from '../../engine/types';
import styles from './index.module.scss';

interface ClueBookDrawerProps {
  open: boolean;
  clues: Clue[];
  onClose: () => void;
}

/**
 * 因果簿抽屉：证词/物证卡片，点击遮罩或合簿按钮关闭
 */
const ClueBookDrawer: React.FC<ClueBookDrawerProps> = ({ open, clues, onClose }) => {
  return (
    <View className={classnames(styles.mask, open && styles.maskOpen)} onClick={onClose}>
      <View
        className={classnames(styles.drawer, open && styles.drawerOpen)}
        onClick={(e) => e.stopPropagation()}
      >
        <View className={styles.header}>
          <Text className={styles.title}>因果簿</Text>
          <View className={styles.closeBtn} onClick={onClose}>
            <Text className={styles.closeText}>合簿</Text>
          </View>
        </View>

        <ScrollView scrollY className={styles.body}>
          {clues.length === 0 ? (
            <View className={styles.empty}>
              <Text className={styles.emptyText}>簿子上空空如也。证词与物证，会在断狱时自动收录。</Text>
            </View>
          ) : (
            clues.map((clue) => (
              <View key={clue.id} className={styles.card}>
                <View className={styles.cardHeader}>
                  <View
                    className={classnames(
                      styles.kindTag,
                      clue.kind === 'testimony' ? styles.tagTestimony : styles.tagEvidence
                    )}
                  >
                    <Text className={styles.kindText}>
                      {clue.kind === 'testimony' ? '证词' : '物证'}
                    </Text>
                  </View>
                  <Text className={styles.cardTitle}>{clue.title}</Text>
                </View>
                {clue.source ? <Text className={styles.source}>—— {clue.source}</Text> : null}
                <Text className={styles.cardText}>{clue.text}</Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default ClueBookDrawer;
