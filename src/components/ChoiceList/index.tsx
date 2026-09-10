import React from 'react';
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';

export interface ChoiceItem {
  text: string;
  /** 置灰不可选（如香火不足） */
  disabled?: boolean;
  /** 选项右侧标签：如「香火 −2」「香火不足」 */
  tag?: string;
  /** 标签是否为警示态 */
  tagWarn?: boolean;
}

interface ChoiceListProps {
  prompt?: string;
  speaker?: string;
  options: ChoiceItem[];
  onChoose: (index: number) => void;
}

/**
 * 选项列表：说谎选项不做任何视觉标记，玩家自行判断
 */
const ChoiceList: React.FC<ChoiceListProps> = ({ prompt, speaker, options, onChoose }) => {
  return (
    <View className={styles.wrapper}>
      {prompt ? (
        <View className={styles.promptBox}>
          {speaker ? <Text className={styles.speaker}>{speaker}：</Text> : null}
          <Text className={styles.prompt}>{prompt}</Text>
        </View>
      ) : null}
      <View className={styles.optionList}>
        {options.map((option, index) => (
          <View
            key={index}
            className={classnames(styles.optionItem, option.disabled && styles.optionDisabled)}
            onClick={() => {
              if (!option.disabled) onChoose(index);
            }}
          >
            <Text className={styles.optionText}>{option.text}</Text>
            {option.tag ? (
              <View className={styles.tagBox}>
                <Text
                  className={classnames(
                    styles.tagText,
                    option.tagWarn ? styles.tagWarn : styles.tagCost
                  )}
                >
                  {option.tag}
                </Text>
              </View>
            ) : null}
          </View>
        ))}
      </View>
    </View>
  );
};

export default ChoiceList;
