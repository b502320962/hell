import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';

/** 终局结局页：第十八层通关后开启，当前为占位页 */
const EndingPage: React.FC = () => {
  const handleBack = () => {
    Taro.switchTab({ url: '/pages/index/index' });
  };

  return (
    <View className={styles.page}>
      <Text className={styles.seal}>终</Text>
      <Text className={styles.title}>第十八层 · 刀锯狱</Text>
      <Text className={styles.desc}>
        终极审判尚未开庭。
        {'\n'}
        当你带着舌、债与一路的真走到第十八层，
        {'\n'}
        四种结局自会在刀锯之下各归其位。
      </Text>
      <View className={styles.btn} onClick={handleBack}>
        <Text className={styles.btnText}>回到阳间路口</Text>
      </View>
    </View>
  );
};

export default EndingPage;
