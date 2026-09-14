import React, { useEffect } from 'react';
import { useDidShow, useDidHide } from '@tarojs/taro';
import { useGameStore } from './engine/store';
// 全局样式
import './app.scss';

function App(props) {
  const initFromSave = useGameStore((state) => state.initFromSave);

  useEffect(() => {
    // 启动时读取本地存档
    initFromSave();
  }, []);

  // 对应 onShow
  useDidShow(() => {});

  // 对应 onHide
  useDidHide(() => {});

  return props.children;
}

export default App;
