// 名字数据库 - 包含10万+名字数据（简化版示例）
// 实际项目中应该从数据库或API获取

// 男孩名字库
const boyNames = [
  // 单字名
  { name: '浩', meaning: '浩大、广阔', source: '诗词', wuxing: '水', popular: 98 },
  { name: '宇', meaning: '宇宙、空间', source: '诗词', wuxing: '土', popular: 95 },
  { name: '轩', meaning: '高大、气派', source: '成语', wuxing: '土', popular: 92 },
  { name: '哲', meaning: '智慧、聪明', source: '诗词', wuxing: '火', popular: 88 },
  { name: '睿', meaning: '睿智、聪慧', source: '诗词', wuxing: '金', popular: 90 },
  { name: '博', meaning: '博学、宽广', source: '诗词', wuxing: '水', popular: 93 },
  { name: '文', meaning: '文化、文雅', source: '诗词', wuxing: '水', popular: 85 },
  { name: '明', meaning: '明亮、聪明', source: '诗词', wuxing: '火', popular: 91 },
  { name: '轩', meaning: '高大、气派', source: '诗词', wuxing: '土', popular: 89 },
  { name: '晨', meaning: '早晨、阳光', source: '诗词', wuxing: '金', popular: 87 },
  
  // 双字名
  { name: '浩然', meaning: '正气广大，胸怀宽广', source: '《孟子》', wuxing: '水', popular: 96 },
  { name: '明轩', meaning: '聪明睿智，气宇轩昂', source: '成语', wuxing: '土', popular: 94 },
  { name: '思远', meaning: '思虑深远，志存高远', source: '《诗经》', wuxing: '木', popular: 91 },
  { name: '梓涵', meaning: '生机勃勃，涵养深厚', source: '诗词', wuxing: '木', popular: 89 },
  { name: '一诺', meaning: '一言九鼎，诚实守信', source: '成语', wuxing: '火', popular: 95 },
  { name: '沐晨', meaning: '如沐春风，晨光熹微', source: '诗词', wuxing: '水', popular: 86 },
  { name: '子墨', meaning: '文房四宝，诗书传家', source: '诗词', wuxing: '土', popular: 88 },
  { name: '亦辰', meaning: '卓尔不群，星辰璀璨', source: '诗词', wuxing: '土', popular: 84 },
  { name: '瑞霖', meaning: '吉祥如意，甘霖普降', source: '诗词', wuxing: '水', popular: 87 },
  { name: '锦程', meaning: '前程似锦，锦绣前程', source: '成语', wuxing: '金', popular: 90 },
  { name: '宇航', meaning: '遨游宇宙，探索未知', source: '现代', wuxing: '土', popular: 93 },
  { name: '熠辰', meaning: '光彩夺目，星辰璀璨', source: '诗词', wuxing: '火', popular: 85 },
  { name: '泽楷', meaning: '恩泽万物，楷模典范', source: '诗词', wuxing: '水', popular: 82 },
  { name: '昕宇', meaning: '晨光昕昕，宇宙无垠', source: '诗词', wuxing: '火', popular: 83 },
  { name: '瑾瑜', meaning: '美玉无瑕，光彩照人', source: '《诗经》', wuxing: '木', popular: 91 },
  { name: '奕辰', meaning: '神采奕奕，星辰大海', source: '诗词', wuxing: '木', popular: 88 },
  { name: '嘉树', meaning: '嘉言善行，树德立人', source: '《诗经》', wuxing: '木', popular: 86 },
  { name: '德晖', meaning: '德行高洁，春晖照人', source: '诗词', wuxing: '火', popular: 80 },
  { name: '圣哲', meaning: '圣贤智慧，哲理深远', source: '诗词', wuxing: '火', popular: 79 },
  { name: '俊彦', meaning: '俊杰人才，彦士贤人', source: '《诗经》', wuxing: '木', popular: 81 },
];

// 女孩名字库
const girlNames = [
  // 单字名
  { name: '涵', meaning: '涵养、包容', source: '诗词', wuxing: '水', popular: 96 },
  { name: '怡', meaning: '愉快、快乐', source: '诗词', wuxing: '土', popular: 94 },
  { name: '欣', meaning: '欣喜、美好', source: '诗词', wuxing: '木', popular: 92 },
  { name: '诗', meaning: '诗意、优雅', source: '诗词', wuxing: '金', popular: 90 },
  { name: '雅', meaning: '高雅、文雅', source: '诗词', wuxing: '木', popular: 88 },
  { name: '琪', meaning: '美玉、珍贵', source: '诗词', wuxing: '木', popular: 91 },
  { name: '萱', meaning: '忘忧、快乐', source: '诗词', wuxing: '木', popular: 89 },
  { name: '晴', meaning: '晴天、晴朗', source: '诗词', wuxing: '火', popular: 87 },
  { name: '雨', meaning: '雨水、滋润', source: '诗词', wuxing: '水', popular: 85 },
  { name: '琳', meaning: '美玉、珍贵', source: '诗词', wuxing: '木', popular: 93 },
  
  // 双字名
  { name: '诗涵', meaning: '诗情画意，含苞待放', source: '《诗经》', wuxing: '水', popular: 95 },
  { name: '雨晴', meaning: '雨过天晴，清新美好', source: '诗词', wuxing: '火', popular: 93 },
  { name: '欣怡', meaning: '欣喜愉悦，心旷神怡', source: '诗词', wuxing: '土', popular: 91 },
  { name: '梓萱', meaning: '生机勃勃，美丽坚强', source: '诗词', wuxing: '木', popular: 89 },
  { name: '雅楠', meaning: '高雅大方，坚韧不拔', source: '成语', wuxing: '木', popular: 87 },
  { name: '思琪', meaning: '思念深厚，美好如花', source: '诗词', wuxing: '金', popular: 88 },
  { name: '瑾萱', meaning: '美玉无瑕，忘忧快乐', source: '诗词', wuxing: '木', popular: 90 },
  { name: '怡然', meaning: '怡然自得，悠然自乐', source: '诗词', wuxing: '土', popular: 86 },
  { name: '诗晴', meaning: '诗意盎然，晴空万里', source: '诗词', wuxing: '火', popular: 85 },
  { name: '雅欣', meaning: '高雅美丽，欣欣向荣', source: '诗词', wuxing: '木', popular: 84 },
  { name: '可欣', meaning: '温柔可爱，欣喜美好', source: '诗词', wuxing: '木', popular: 92 },
  { name: '佳怡', meaning: '美好佳肴，心旷神怡', source: '诗词', wuxing: '土', popular: 90 },
  { name: '梓晴', meaning: '生机盎然，晴空万里', source: '诗词', wuxing: '木', popular: 88 },
  { name: '思雨', meaning: '思绪如雨，润物无声', source: '诗词', wuxing: '水', popular: 86 },
  { name: '诗琪', meaning: '诗情画意，美玉无瑕', source: '诗词', wuxing: '木', popular: 91 },
  { name: '雅婷', meaning: '高雅美好，婷婷玉立', source: '诗词', wuxing: '火', popular: 87 },
  { name: '欣瑜', meaning: '欣喜美好，美玉无瑕', source: '诗词', wuxing: '金', popular: 85 },
  { name: '雪晴', meaning: '雪后初晴，清新美好', source: '诗词', wuxing: '水', popular: 89 },
  { name: '紫萱', meaning: '紫气东来，忘忧快乐', source: '诗词', wuxing: '木', popular: 88 },
  { name: '梦琪', meaning: '梦回唐朝，美玉无瑕', source: '诗词', wuxing: '木', popular: 90 },
];

// 名字库合并
const allNames = [...boyNames, ...girlNames];

// 获取名字
function getNames(options = {}) {
  let result = [...allNames];
  
  if (options.gender === 'boy') {
    result = result.filter(n => boyNames.includes(n));
  } else if (options.gender === 'girl') {
    result = result.filter(n => girlNames.includes(n));
  }
  
  if (options.name) {
    result = result.filter(n => n.name === options.name);
  }
  
  if (options.sortBy === 'popular') {
    result.sort((a, b) => b.popular - a.popular);
  }
  
  if (options.limit) {
    result = result.slice(0, options.limit);
  }
  
  return result;
}

// 生成推荐名字
function generateNames(names, options) {
  const { surname, gender, birthday, hour, surnameType } = options;
  
  // 根据出生日期计算八字五行（简化版）
  const bazi = calculateBazi(birthday, hour);
  const wuxing = calculateWuxing(bazi);
  
  // 筛选符合五行的名字
  let recommended = names.filter(n => {
    // 喜用神为木，选木属性名字
    if (wuxing.xiyong === '木') {
      return n.wuxing === '木';
    }
    // 喜用神为火，选火属性名字
    if (wuxing.xiyong === '火') {
      return n.wuxing === '火';
    }
    return true;
  });
  
  // 如果筛选后数量不够，返回原列表
  if (recommended.length < 10) {
    recommended = names.slice(0, 20);
  }
  
  // 随机打乱并返回
  return recommended.sort(() => Math.random() - 0.5).slice(0, 12);
}

// 计算八字（简化版）
function calculateBazi(birthday, hour) {
  // 实际需要专业的八字计算
  // 这里返回简化示例
  return {
    year: '庚子',
    month: '戊子', 
    day: '丙子',
    hour: hour ? '戊子' : '丙子'
  };
}

// 计算五行喜用神（简化版）
function calculateWuxing(bazi) {
  // 实际需要专业命理分析
  // 这里随机返回示例
  const xiyongOptions = ['木', '火', '土', '金', '水'];
  return {
    xiyong: xiyongOptions[Math.floor(Math.random() * xiyongOptions.length)],
    bazi
  };
}

// 计算名字分数
function calculateScore(nameObj, options = {}) {
  const { birthday, gender } = options;
  
  let score = 70; // 基础分
  
  // 寓意得分
  if (nameObj.meaning) score += 10;
  
  // 出处得分
  if (nameObj.source) score += 5;
  
  // 流行度得分
  if (nameObj.popular) {
    score += Math.min(nameObj.popular / 10, 10);
  }
  
  // 五行平衡加分（简化）
  if (nameObj.wuxing) score += 5;
  
  // 限制分数在60-100之间
  return Math.min(Math.max(Math.round(score), 60), 100);
}

module.exports = {
  getNames,
  generateNames,
  calculateScore,
  boyNames,
  girlNames
};
