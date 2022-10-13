export default defineAppConfig({
  pages: ['pages/index/index'],
  window: {
    backgroundColor: '#fff',
    backgroundTextStyle: 'light',
    navigationStyle: 'custom',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Taro3',
    navigationBarTextStyle: 'black'
  },
  subPackages: [
    {
      root: 'package',
      pages: ['packageA/index', 'packageB/index', 'packageC/index']
    }
  ]
});
