import React from 'react';
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';

interface DialogueBubbleProps {
  speaker?: string;
  text: string;
  /** 是否为旁白（无说话人、样式更虚） */
  narrative?: boolean;
  onClick?: () => void;
}

/**
 * 对话气泡：深色半透明 0.92、圆角 14px、文字左对齐、无滚动条
 * 长文完整展示，点击空白处/气泡推进
 */
const DialogueBubble: React.FC<DialogueBubbleProps> = ({ speaker, text, narrative, onClick }) => {
  return (
    <View className={styles.wrapper} onClick={onClick}>
      {speaker ? (
        <View className={styles.speakerTag}>
          <Text className={styles.speakerText}>{speaker}</Text>
        </View>
      ) : null}
      <View className={classnames(styles.bubble, narrative && styles.narrative)}>
        <Text className={styles.text}>{text}</Text>
      </View>
      <View className={styles.continueHint}>
        <Text className={styles.continueText}>点击继续</Text>
      </View>
    </View>
  );
};

export default DialogueBubble;
