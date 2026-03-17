const express = require('express');
const router = express.Router();
const { getNames, generateNames, calculateScore } = require('../data/names');

// 获取热门名字
router.get('/hot-names', (req, res) => {
  const hotNames = getNames({ limit: 20, sortBy: 'popular' });
  res.json({ names: hotNames.map(n => n.name) });
});

// 生成名字
router.post('/generate-names', (req, res) => {
  const { surname, gender, birthday, hour, surnameType } = req.body;
  
  if (!surname || !gender || !birthday) {
    return res.status(400).json({ error: '缺少必要参数' });
  }

  // 获取名字列表并筛选
  const allNames = getNames({ gender, limit: 100 });
  
  // 生成推荐名字
  const recommendations = generateNames(allNames, {
    surname,
    gender,
    birthday,
    hour,
    surnameType
  });

  // 计算分数并返回
  const result = recommendations.map(name => ({
    ...name,
    score: calculateScore(name, { birthday, gender })
  })).sort((a, b) => b.score - a.score).slice(0, 12);

  res.json({ names: result });
});

// 名字详情
router.get('/name/:name', (req, res) => {
  const { name } = req.params;
  const nameInfo = getNames({ name })[0];
  
  if (!nameInfo) {
    return res.status(404).json({ error: '名字未找到' });
  }

  res.json(nameInfo);
});

// 名字打分
router.post('/score', (req, res) => {
  const { name, birthday, gender } = req.body;
  
  if (!name || !birthday || !gender) {
    return res.status(400).json({ error: '缺少必要参数' });
  }

  const score = calculateScore({ name }, { birthday, gender });
  res.json({ score });
});

module.exports = router;
