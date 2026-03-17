// result.js
Page({
  data: {
    surname: '',
    names: []
  },

  onLoad(options) {
    if (options.data) {
      try {
        const data = JSON.parse(decodeURIComponent(options.data));
        this.setData({
          names: data.names || []
        });
      } catch (e) {
        console.error(e);
      }
    }
  },

  viewDetail(e) {
    const name = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: `/pages/detail/detail?name=${name}&surname=${this.data.surname}`
    });
  },

  collect(e) {
    const name = e.currentTarget.dataset.name;
    wx.showToast({
      title: '已收藏',
      icon: 'success'
    });
    // Save to local storage
    let favorites = wx.getStorageSync('favorites') || [];
    favorites.push(name);
    wx.setStorageSync('favorites', favorites);
  },

  share(e) {
    const name = e.currentTarget.dataset.name;
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  refresh() {
    wx.showLoading({ title: '换一批中...' });
    // Call API to get new names
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '已换一批',
        icon: 'success'
      });
    }, 500);
  },

  onShareAppMessage(res) {
    return {
      title: '智能起名 - 为宝宝起个好名字',
      path: '/pages/index/index'
    };
  }
});
