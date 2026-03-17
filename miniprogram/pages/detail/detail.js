// detail.js
Page({
  data: {
    surname: '',
    name: '',
    score: 0,
    meaning: '',
    source: '',
    wuxing: '木',
    strokes: 12,
    tone: '阴平',
    structure: '上下',
    scores: {
      sound: 85,
      shape: 90,
      meaning: 95,
      wuxing: 80
    }
  },

  onLoad(options) {
    const { name, surname } = options;
    if (name) {
      this.setData({ name, surname: surname || '' });
      this.loadNameDetail(name);
    }
  },

  loadNameDetail(name) {
    // Mock data - in real app, fetch from server
    const detailData = {
      '浩然': {
        score: 95,
        meaning: '正气广大，胸怀宽广。出自《孟子·公孙丑上》："我善养吾浩然之气。"指盛大刚直的气概。',
        source: '《孟子》',
        wuxing: '水',
        strokes: 12,
        tone: '阳平',
        structure: '上下',
        scores: { sound: 90, shape: 88, meaning: 98, wuxing: 85 }
      },
      '明轩': {
        score: 92,
        meaning: '聪明睿智，气宇轩昂。明亮有才智，气度不凡。',
        source: '成语',
        wuxing: '土',
        strokes: 12,
        tone: '阳平',
        structure: '左右',
        scores: { sound: 92, shape: 90, meaning: 88, wuxing: 82 }
      },
      '诗涵': {
        score: 94,
        meaning: '诗情画意，含苞待放。富有诗意，心灵美好。',
        source: '《诗经》',
        wuxing: '水',
        strokes: 13,
        tone: '阴平',
        structure: '左右',
        scores: { sound: 95, shape: 90, meaning: 96, wuxing: 88 }
      }
    };

    const data = detailData[name] || {
      score: 88,
      meaning: '寓意美好，富有内涵。',
      source: '诗词',
      wuxing: '木',
      strokes: 10,
      tone: '阴平',
      structure: '上下',
      scores: { sound: 85, shape: 88, meaning: 90, wuxing: 80 }
    };

    this.setData({ ...data });
  },

  collect() {
    wx.showToast({
      title: '已收藏',
      icon: 'success'
    });
    
    // Save to local storage
    let favorites = wx.getStorageSync('favorites') || [];
    const fullName = this.data.surname + this.data.name;
    if (!favorites.includes(fullName)) {
      favorites.push(fullName);
      wx.setStorageSync('favorites', favorites);
    }
  },

  onShareAppMessage() {
    return {
      title: `推荐名字：${this.data.surname}${this.data.name}`,
      path: `/pages/detail/detail?name=${this.data.name}&surname=${this.data.surname}`
    };
  }
});
