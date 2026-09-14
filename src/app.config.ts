export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/gallery/index',
    'pages/mine/index',
    'pages/game/index',
    'pages/settlement/index',
    'pages/ending/index'
  ],
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#0d0d10',
    navigationBarTitleText: '十八层地狱',
    navigationBarTextStyle: 'white',
    backgroundColor: '#0d0d10'
  },
  tabBar: {
    color: '#8a8a90',
    selectedColor: '#c9a227',
    backgroundColor: '#121216',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '入地狱',
        iconPath: 'assets/tabbar/home.svg',
        selectedIconPath: 'assets/tabbar/home-selected.svg'
      },
      {
        pagePath: 'pages/gallery/index',
        text: '图鉴',
        iconPath: 'assets/tabbar/tower.svg',
        selectedIconPath: 'assets/tabbar/tower-selected.svg'
      },
      {
        pagePath: 'pages/mine/index',
        text: '卷宗',
        iconPath: 'assets/tabbar/scroll.svg',
        selectedIconPath: 'assets/tabbar/scroll-selected.svg'
      }
    ]
  }
})
