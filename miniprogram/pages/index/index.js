// index.js
Page({
  data: {
    hotNames: ['梓涵', '一诺', '浩然', '欣怡', '思远', '雨晴', '明轩', '诗涵']
  },

  onLoad() {
    // Load hot names from server
    this.fetchHotNames();
  },

  fetchHotNames() {
    wx.request({
      url: 'https://your-api.com/api/hot-names',
      success: (res) => {
        if (res.data && res.data.names) {
          this.setData({ hotNames: res.data.names });
        }
      }
    });
  },

  goToInput() {
    wx.navigateTo({
      url: '/pages/input/input'
    });
  }
});
