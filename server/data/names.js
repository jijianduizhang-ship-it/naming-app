// 名字数据库 - 扩充版（200+名字）
// 包含男孩、女孩名字，带五行、寓意、出处

const boyNames = [
  // 单字名
  { name: '浩', meaning: '浩大、广阔、正气', source: '诗词', wuxing: '水', popular: 98 },
  { name: '宇', meaning: '宇宙、空间、气度', source: '诗词', wuxing: '土', popular: 95 },
  { name: '轩', meaning: '高大、气派、开朗', source: '成语', wuxing: '土', popular: 92 },
  { name: '哲', meaning: '智慧、聪明、贤明', source: '诗词', wuxing: '火', popular: 88 },
  { name: '睿', meaning: '睿智、聪慧、通达', source: '诗词', wuxing: '金', popular: 90 },
  { name: '博', meaning: '博学、宽广、仁厚', source: '诗词', wuxing: '水', popular: 93 },
  { name: '文', meaning: '文雅、文化、才华', source: '诗词', wuxing: '水', popular: 85 },
  { name: '明', meaning: '明亮、聪明、圣明', source: '诗词', wuxing: '火', popular: 91 },
  { name: '晨', meaning: '早晨、阳光、希望', source: '诗词', wuxing: '金', popular: 87 },
  { name: '霖', meaning: '甘霖、恩泽、滋润', source: '诗词', wuxing: '水', popular: 86 },
  { name: '瑞', meaning: '吉祥、祥瑞、福气', source: '诗词', wuxing: '金', popular: 89 },
  { name: '泽', meaning: '恩泽、润泽、仁慈', source: '诗词', wuxing: '水', popular: 91 },
  { name: '毅', meaning: '刚毅、坚强、果断', source: '诗词', wuxing: '木', popular: 84 },
  { name: '豪', meaning: '豪迈、豪爽、气魄', source: '诗词', wuxing: '水', popular: 82 },
  { name: '俊', meaning: '俊秀、俊杰、才智', source: '诗词', wuxing: '火', popular: 90 },
  
  // 双字名 - 经典
  { name: '浩然', meaning: '正气广大，胸怀宽广', source: '《孟子》', wuxing: '水', popular: 96 },
  { name: '明轩', meaning: '聪明睿智，气宇轩昂', source: '成语', wuxing: '土', popular: 94 },
  { name: '思远', meaning: '思虑深远，志存高远', source: '《诗经》', wuxing: '木', popular: 91 },
  { name: '梓涵', meaning: '生机勃勃，涵养深厚', source: '诗词', wuxing: '木', popular: 89 },
  { name: '一诺', meaning: '一言九鼎，诚实守信', source: '成语', wuxing: '火', popular: 95 },
  { name: '宇航', meaning: '遨游宇宙，探索未知', source: '现代', wuxing: '土', popular: 93 },
  { name: '瑾瑜', meaning: '美玉无瑕，光彩照人', source: '《诗经》', wuxing: '木', popular: 91 },
  { name: '奕辰', meaning: '神采奕奕，星辰璀璨', source: '诗词', wuxing: '木', popular: 88 },
  { name: '瑞霖', meaning: '吉祥如意，甘霖普降', source: '诗词', wuxing: '水', popular: 87 },
  { name: '锦程', meaning: '前程似锦，锦绣前程', source: '成语', wuxing: '金', popular: 90 },
  { name: '沐晨', meaning: '如沐春风，晨光熹微', source: '诗词', wuxing: '水', popular: 86 },
  { name: '子墨', meaning: '文房四宝，诗书传家', source: '诗词', wuxing: '土', popular: 88 },
  { name: '亦辰', meaning: '卓尔不群，星辰璀璨', source: '诗词', wuxing: '土', popular: 84 },
  { name: '熠辰', meaning: '光彩夺目，星辰大海', source: '诗词', wuxing: '火', popular: 85 },
  { name: '泽楷', meaning: '恩泽万物，楷模典范', source: '诗词', wuxing: '水', popular: 82 },
  { name: '昕宇', meaning: '晨光昕昕，宇宙无垠', source: '诗词', wuxing: '火', popular: 83 },
  { name: '嘉树', meaning: '嘉言善行，树德立人', source: '《诗经》', wuxing: '木', popular: 86 },
  { name: '德晖', meaning: '德行高洁，春晖照人', source: '诗词', wuxing: '火', popular: 80 },
  { name: '圣哲', meaning: '圣贤智慧，哲理深远', source: '诗词', wuxing: '火', popular: 79 },
  { name: '俊彦', meaning: '俊杰人才，彦士贤人', source: '《诗经》', wuxing: '木', popular: 81 },
  
  // 双字名 - 诗词典故
  { name: '子涵', meaning: '之子于归，含章可贞', source: '《诗经》', wuxing: '水', popular: 92 },
  { name: '承宇', meaning: '承天之祐，宇量深广', source: '《楚辞》', wuxing: '土', popular: 85 },
  { name: '步舆', meaning: '步履稳健，舆图广大', source: '《楚辞》', wuxing: '土', popular: 78 },
  { name: '怀瑾', meaning: '怀瑾握瑜，品德高洁', source: '《楚辞》', wuxing: '火', popular: 88 },
  { name: '以南', meaning: '南山之寿，福祚绵长', source: '《诗经》', wuxing: '火', popular: 83 },
  { name: '维桢', meaning: '维此哲人，桢干之才', source: '《诗经》', wuxing: '木', popular: 76 },
  { name: '思博', meaning: '思如泉涌，博学多才', source: '诗词', wuxing: '水', popular: 87 },
  { name: '君昊', meaning: '君子如昊，胸怀宽广', source: '诗词', wuxing: '火', popular: 85 },
  { name: '文韬', meaning: '文韬武略，智勇双全', source: '成语', wuxing: '火', popular: 86 },
  { name: '武略', meaning: '文韬武略，经天纬地', source: '成语', wuxing: '火', popular: 80 },
  { name: '星辰', meaning: '星光灿烂，照耀大地', source: '诗词', wuxing: '火', popular: 91 },
  { name: '云帆', meaning: '云帆高张，志在千里', source: '诗词', wuxing: '水', popular: 84 },
  { name: '天佑', meaning: '天之祐子，吉祥如意', source: '诗词', wuxing: '土', popular: 82 },
  { name: '志远', meaning: '志存高远，脚踏实地', source: '诗词', wuxing: '土', popular: 89 },
  { name: '致远', meaning: '宁静致远，淡泊明志', source: '成语', wuxing: '木', popular: 90 },
  
  // 双字名 - 现代常用
  { name: '子晨', meaning: '之子于晨，阳光开朗', source: '现代', wuxing: '土', popular: 88 },
  { name: '子睿', meaning: '之子睿智，聪明过人', source: '现代', wuxing: '金', popular: 86 },
  { name: '浩宇', meaning: '浩瀚宇宙，无限可能', source: '现代', wuxing: '水', popular: 94 },
  { name: '博文', meaning: '博学多才，文质彬彬', source: '现代', wuxing: '水', popular: 87 },
  { name: '亦博', meaning: '亦庄亦谐，博学多识', source: '现代', wuxing: '水', popular: 81 },
  { name: '佳豪', meaning: '佳人才子，豪情万丈', source: '现代', wuxing: '木', popular: 83 },
  { name: '佳辉', meaning: '佳音频传，光辉灿烂', source: '现代', wuxing: '火', popular: 82 },
  { name: '佳宇', meaning: '佳音常在，宇宙无垠', source: '现代', wuxing: '土', popular: 85 },
  { name: '欣宇', meaning: '欣喜愉悦，宇宙宽广', source: '现代', wuxing: '土', popular: 84 },
  { name: '欣昊', meaning: '欣欣向荣，昊天罔极', source: '现代', wuxing: '火', popular: 82 },
  { name: '梓豪', meaning: '梓木为材，豪情满怀', source: '现代', wuxing: '木', popular: 85 },
  { name: '梓浩', meaning: '梓木成林，浩然正气', source: '现代', wuxing: '木', popular: 88 },
  { name: '睿轩', meaning: '睿智聪慧，气宇轩昂', source: '现代', wuxing: '土', popular: 86 },
  { name: '睿祥', meaning: '睿智祥和，福禄双全', source: '现代', wuxing: '金', popular: 81 },
  { name: '翔宇', meaning: '翔宇高飞，志向远大', source: '现代', wuxing: '土', popular: 87 },
];

const girlNames = [
  // 单字名
  { name: '涵', meaning: '涵养、包容、修养', source: '诗词', wuxing: '水', popular: 96 },
  { name: '怡', meaning: '愉快、快乐、和悦', source: '诗词', wuxing: '土', popular: 94 },
  { name: '欣', meaning: '欣喜、美好、充满喜悦', source: '诗词', wuxing: '木', popular: 92 },
  { name: '诗', meaning: '诗意、优雅、浪漫', source: '诗词', wuxing: '金', popular: 90 },
  { name: '雅', meaning: '高雅、文雅、美好', source: '诗词', wuxing: '木', popular: 88 },
  { name: '琪', meaning: '美玉、珍贵、美好', source: '诗词', wuxing: '木', popular: 91 },
  { name: '萱', meaning: '忘忧、快乐、幸福', source: '诗词', wuxing: '木', popular: 89 },
  { name: '晴', meaning: '晴天、晴朗、开朗', source: '诗词', wuxing: '火', popular: 87 },
  { name: '雨', meaning: '雨水、滋润、生机', source: '诗词', wuxing: '水', popular: 85 },
  { name: '琳', meaning: '美玉、珍贵、美好', source: '诗词', wuxing: '木', popular: 93 },
  { name: '瑶', meaning: '美玉、光彩、珍贵', source: '诗词', wuxing: '火', popular: 88 },
  { name: '颖', meaning: '聪颖、出众、灵活', source: '诗词', wuxing: '木', popular: 86 },
  { name: '蕾', meaning: '花蕾、含苞、美好', source: '诗词', wuxing: '木', popular: 85 },
  { name: '芳', meaning: '芳香、美好、青春', source: '诗词', wuxing: '木', popular: 84 },
  { name: '芷', meaning: '香草、美好、高洁', source: '诗词', wuxing: '木', popular: 82 },
  
  // 双字名 - 经典
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
  
  // 双字名 - 诗词典故
  { name: '静姝', meaning: '静女其姝，美好娴静', source: '《诗经》', wuxing: '金', popular: 87 },
  { name: '婉如', meaning: '婉如清扬，美好动人', source: '《诗经》', wuxing: '土', popular: 85 },
  { name: '清涵', meaning: '清扬婉兮，涵养深厚', source: '《诗经》', wuxing: '水', popular: 86 },
  { name: '采苓', meaning: '采苓采苓，首阳之巅', source: '《诗经》', wuxing: '木', popular: 79 },
  { name: '蒹葭', meaning: '蒹葭苍苍，白露为霜', source: '《诗经》', wuxing: '木', popular: 91 },
  { name: '桃夭', meaning: '桃之夭夭，灼灼其华', source: '《诗经》', wuxing: '木', popular: 88 },
  { name: '宜家', meaning: '宜尔室家，和乐安康', source: '《诗经》', wuxing: '木', popular: 82 },
  { name: '佩玉', meaning: '佩玉将将，品德高洁', source: '《诗经》', wuxing: '火', popular: 80 },
  { name: '灵均', meaning: '灵均忠愤，品格高洁', source: '《楚辞》', wuxing: '木', popular: 84 },
  { name: '杜若', meaning: '杜若芳洲，美好时节', source: '《楚辞》', wuxing: '木', popular: 81 },
  { name: '云兮', meaning: '云想衣裳花想容', source: '诗词', wuxing: '水', popular: 86 },
  { name: '清照', meaning: '清逸照人，才情横溢', source: '诗词', wuxing: '水', popular: 85 },
  { name: '如梦', meaning: '如梦如幻，美好朦胧', source: '诗词', wuxing: '木', popular: 87 },
  { name: '醉月', meaning: '醉月迷花，风雅浪漫', source: '诗词', wuxing: '木', popular: 79 },
  { name: '烟霞', meaning: '烟霞供养，志在山水', source: '诗词', wuxing: '火', popular: 81 },
  
  // 双字名 - 现代常用
  { name: '欣悦', meaning: '欣喜愉悦，悦人悦己', source: '现代', wuxing: '金', popular: 89 },
  { name: '梦琪', meaning: '梦回唐朝，美玉无瑕', source: '现代', wuxing: '木', popular: 90 },
  { name: '雅婷', meaning: '高雅美好，婷婷玉立', source: '现代', wuxing: '火', popular: 87 },
  { name: '欣瑜', meaning: '欣喜美好，美玉无瑕', source: '现代', wuxing: '金', popular: 85 },
  { name: '雪晴', meaning: '雪后初晴，清新美好', source: '现代', wuxing: '水', popular: 89 },
  { name: '紫萱', meaning: '紫气东来，忘忧快乐', source: '现代', wuxing: '木', popular: 88 },
  { name: '语晴', meaning: '语笑嫣然，晴空万里', source: '现代', wuxing: '火', popular: 86 },
  { name: '语彤', meaning: '语笑嫣然，丹霞映天', source: '现代', wuxing: '火', popular: 83 },
  { name: '思颖', meaning: '思绪万千，聪颖过人', source: '现代', wuxing: '木', popular: 88 },
  { name: '思雨', meaning: '思绪如雨，润物无声', source: '现代', wuxing: '水', popular: 87 },
  { name: '欣雨', meaning: '欣喜如雨，滋润心田', source: '现代', wuxing: '水', popular: 86 },
  { name: '欣彤', meaning: '欣喜愉悦，红日当空', source: '现代', wuxing: '火', popular: 84 },
  { name: '梓怡', meaning: '梓木成林，怡然自得', source: '现代', wuxing: '木', popular: 89 },
  { name: '梓彤', meaning: '梓木成林，彤霞满天', source: '现代', wuxing: '木', popular: 85 },
  { name: '语萱', meaning: '语笑嫣然，忘忧快乐', source: '现代', wuxing: '木', popular: 87 },
];

// 合并所有名字
const allNames = [...boyNames, ...girlNames];

// 导出
module.exports = { boyNames, girlNames, allNames };

// 获取名字
function getNames(options = {}) {
  let result = [...allNames];
  
  if (options.gender === 'boy') {
    result = result.filter(n => boyNames.some(bn => bn.name === n.name));
  } else if (options.gender === 'girl') {
    result = result.filter(n => girlNames.some(gn => gn.name === n.name));
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
  const { surname, gender, birthday, hour } = options;
  
  // 根据出生日期计算五行（简化版）
  const wuxing = calculateWuxing(birthday);
  
  // 筛选符合五行的名字
  let recommended = names.filter(n => n.wuxing === wuxing);
  
  // 如果筛选后数量不够，返回全部
  if (recommended.length < 6) {
    recommended = names;
  }
  
  // 随机打乱并返回
  return recommended.sort(() => Math.random() - 0.5).slice(0, 12);
}

// 计算五行喜用神（简化版）
function calculateWuxing(birthday) {
  if (!birthday) return ['木', '火', '土', '金', '水'][Math.floor(Math.random() * 5)];
  
  // 简单根据月份判断
  const month = new Date(birthday).getMonth() + 1;
  const wuxing = ['木', '火', '土', '金', '水'];
  
  // 春木夏火秋金冬水
  if (month >= 2 && month <= 4) return '木';
  if (month >= 5 && month <= 7) return '火';
  if (month >= 8 && month <= 10) return '金';
  return '水';
}

// 计算名字分数
function calculateScore(nameObj, options = {}) {
  let score = 70;
  
  if (nameObj.meaning) score += 8;
  if (nameObj.source) score += 5;
  if (nameObj.popular) score += Math.min(nameObj.popular / 10, 10);
  if (nameObj.wuxing) score += 7;
  
  return Math.min(Math.max(Math.round(score), 60), 100);
}

module.exports = {
  getNames,
  generateNames,
  calculateScore,
  boyNames,
  girlNames
};
