// input.js
Page({
  data: {
    surname: '',
    gender: '',
    birthday: '',
    hour: null,
    surnameType: 0,
    hours: ['子时', '丑时', '寅时', '卯时', '辰时', '巳时', '午时', '未时', '申时', '酉时', '戌时', '亥时'],
    surnameTypes: ['汉族', '少数民族', '复姓', '其他'],
    canGenerate: false
  },

  onLoad(options) {
    // Pre-fill if data passed
    if (options.surname) {
      this.setData({ surname: options.surname });
      this.checkCanGenerate();
    }
  },

  onSurnameInput(e) {
    this.setData({ surname: e.detail.value });
    this.checkCanGenerate();
  },

  selectGender(e) {
    this.setData({ gender: e.currentTarget.dataset.gender });
    this.checkCanGenerate();
  },

  onBirthdayChange(e) {
    this.setData({ birthday: e.detail.value });
    this.checkCanGenerate();
  },

  onHourChange(e) {
    this.setData({ hour: e.detail.value });
  },

  onSurnameTypeChange(e) {
    this.setData({ surnameType: e.detail.value });
  },

  checkCanGenerate() {
    const canGenerate = this.data.surname && this.data.gender && this.data.birthday;
    this.setData({ canGenerate });
  },

  generateNames() {
    if (!this.data.canGenerate) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }

    wx.showLoading({ title: '生成中...' });

    // Call API
    wx.request({
      url: 'https://your-api.com/api/generate-names',
      method: 'POST',
      data: {
        surname: this.data.surname,
        gender: this.data.gender,
        birthday: this.data.birthday,
        hour: this.data.hour,
        surnameType: this.data.surnameType
      },
      success: (res) => {
        wx.hideLoading();
        if (res.data && res.data.names) {
          wx.navigateTo({
            url: `/pages/result/result?data=${encodeURIComponent(JSON.stringify(res.data))}`
          });
        } else {
          wx.showToast({
            title: '生成失败，请重试',
            icon: 'none'
          });
        }
      },
      fail: () => {
        wx.hideLoading();
        // Demo data for testing
        const demoData = {
          names: this.getDemoNames()
        };
        wx.navigateTo({
          url: `/pages/result/result?data=${encodeURIComponent(JSON.stringify(demoData))}`
        });
      }
    });
  },

  getDemoNames() {
    const boyNames = [
      { name: '浩然', score: 95, meaning: '正气广大，胸怀宽广', source: '《孟子》' },
      { name: '明轩', score: 92, meaning: '聪明睿智，气宇轩昂', source: '成语' },
      { name: '思远', score: 90, meaning: '思虑深远，志存高远', source: '《诗经》' },
      { name: '梓涵', score: 88, meaning: '生机勃勃，涵养深厚', source: '诗词' },
      { name: '一诺', score: 93, meaning: '一言九鼎，诚实守信', source: '成语' },
      { name: '欣怡', score: 91, meaning: '欣喜愉悦，心旷神怡', source: '诗词' }
    ];
    
    const girlNames = [
      { name: '诗涵', score: 94, meaning: '诗情画意，含苞待放', source: '《诗经》' },
      { name: '雨晴', score: 92, meaning: '雨过天晴，清新美好', source: '诗词' },
      { name: '欣怡', score: 90, meaning: '欣喜愉悦，心旷神怡', source: '诗词' },
      { name: '梓萱', score: 89, meaning: '生机勃勃，美丽坚强', source: '诗词' },
      { name: '雅楠', score: 91, meaning: '高雅大方，坚韧不拔', source: '成语' },
      { name: '思琪', score: 88, meaning: '思念深厚，美好如花', source: '诗词' }
    ];

    return this.data.gender === 'boy' ? boyNames : girlNames;
  }
});
