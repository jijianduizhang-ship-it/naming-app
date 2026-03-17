// profile.js
Page({
  data: {
    favorites: [],
    history: []
  },

  onShow() {
    this.loadData();
  },

  onLoad() {
    this.loadData();
  },

  loadData() {
    const favorites = wx.getStorageSync('favorites') || [];
    const history = wx.getStorageSync('history') || [];
    this.setData({ favorites, history });
  },

  viewFavorites() {
    if (this.data.favorites.length === 0) {
      wx.showToast({
        title: '暂无收藏',
        icon: 'none'
      });
      return;
    }
    
    wx.showModal({
      title: '我的收藏',
      content: this.data.favorites.join('\n'),
      showCancel: false
    });
  },

  viewHistory() {
    if (this.data.history.length === 0) {
      wx.showToast({
        title: '暂无历史',
        icon: 'none'
      });
      return;
    }
    
    const historyText = this.data.history.slice(-10).reverse().join('\n');
    wx.showModal({
      title: '历史记录',
      content: historyText,
      showCancel: false
    });
  },

  shareApp() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  contactSupport() {
    wx.showModal({
      title: '意见反馈',
      content: '请添加客服微信：xxx',
      showCancel: false
    });
  },

  onShareAppMessage() {
    return {
      title: '智能起名 - 为宝宝起个好名字',
      path: '/pages/index/index'
    };
  }
});
