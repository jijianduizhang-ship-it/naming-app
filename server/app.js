const express = require('express');
const cors = require('cors');
const nameRoutes = require('./routes/names');
const adminRoutes = require('./routes/admin');
const { getNames } = require('./data/names');

const app = express();
const PORT = process.env.PORT || 3000;

// DeepSeek API 配置（从数据库读取）
let DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || 'sk-c2f2ce816b3f43b09b6740f702ad3f36';
let DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/v1/chat/completions';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', nameRoutes);
app.use('/api/admin', adminRoutes);

// AI 生成名字接口
app.post('/api/ai-generate-names', async (req, res) => {
  const { surname, gender, birthday, preferences, nameLength } = req.body;
  
  if (!surname || !gender || !birthday) {
    return res.status(400).json({ error: '缺少必要参数' });
  }

  // 根据名字字数确定是单字还是双字
  const nameLen = parseInt(nameLength) || 3;
  const nameCharCount = nameLen === 2 ? '1个' : '2个';
  
  try {
    // 构建 prompt
    const genderText = gender === 'boy' ? '男孩' : '女孩';
    const prompt = `你是一个专业的起名大师。请根据以下信息为宝宝生成10个寓意美好的名字：

1. 姓氏：${surname}
2. 性别：${genderText}
3. 出生日期：${birthday}
4. 偏好：${preferences || '寓意美好、诗词典故、五行平衡'}
5. 名字字数：${nameLen}个字（即名${nameCharCount}字）

要求：
- 名字要富有诗意、出自诗词典故
- 每个名字要有寓意解释和出处
- 格式为JSON数组，每个名字包含：name(名字，即名的部分，不含姓氏)、meaning(寓意)、source(出处)、wuxing(五行)
- 只要返回JSON，不要其他内容
- 注意：name字段只需要返回名的部分，不需要包含姓氏`;

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: '你是一个专业的起名大师，擅长根据诗词典故、五行八字为宝宝起名。请用JSON格式返回结果。' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.9,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error('DeepSeek API 请求失败');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // 解析 JSON
    let names = [];
    try {
      // 尝试提取 JSON
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        names = JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error('解析AI返回数据失败', e);
    }

    // 如果解析失败，使用本地数据
    if (!names || names.length === 0) {
      const localNames = getNames({ gender, limit: 10 });
      names = localNames.map(n => ({
        name: n.name,
        meaning: n.meaning,
        source: n.source,
        wuxing: n.wuxing,
        score: Math.floor(Math.random() * 10) + 90
      }));
    }

    res.json({ names, source: 'ai' });
  } catch (error) {
    console.error('AI生成名字失败:', error);
    // 失败时返回本地数据
    const localNames = getNames({ gender, limit: 10 });
    res.json({ 
      names: localNames.map(n => ({
        name: n.name,
        meaning: n.meaning,
        source: n.source,
        wuxing: n.wuxing,
        score: Math.floor(Math.random() * 10) + 90
      })),
      source: 'local',
      error: error.message 
    });
  }
});

// AI 名字打分接口
app.post('/api/ai-score', async (req, res) => {
  const { name, birthday, gender } = req.body;
  
  if (!name || !birthday) {
    return res.status(400).json({ error: '缺少必要参数' });
  }

  try {
    const prompt = `请为名字"${name}"打分并分析：

1. 音韵评分（0-100）：名字的发音是否朗朗上口
2. 字形评分（0-100）：名字的字形是否美观
3. 寓意评分（0-100）：名字的寓意是否美好
4. 五行评分（0-100）：名字是否符合八字五行

请以JSON格式返回：
{"sound": 分数, "shape": 分数, "meaning": 分数, "wuxing": 分数, "total": 总分, "advice": 简短建议}`;

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: '你是一个专业的姓名学大师，擅长分析名字的吉凶祸福。请用JSON格式返回结果。' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // 解析 JSON
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const result = JSON.parse(jsonMatch[0]);
        return res.json(result);
      }
    } catch (e) {
      console.error('解析AI返回数据失败');
    }
    
    // 默认返回
    res.json({
      sound: 85,
      shape: 88,
      meaning: 90,
      wuxing: 82,
      total: 86,
      advice: '名字整体不错，建议结合八字进一步分析'
    });
  } catch (error) {
    console.error('AI打分失败:', error);
    res.json({
      sound: 85,
      shape: 88,
      meaning: 90,
      wuxing: 82,
      total: 86,
      advice: '名字整体不错'
    });
  }
});

// 兑换接口（需要 mysql2/promise）
app.post('/api/redeem', async (req, res) => {
  const { code } = req.body;
  
  if (!code) {
    return res.status(400).json({ success: false, message: '请输入兑换码' });
  }

  try {
    const mysql = require('mysql2/promise');
    const pool = mysql.createPool({
      host: process.env.DB_HOST || '43.139.124.235',
      user: process.env.DB_USER || 'xingming',
      password: process.env.DB_PASSWORD || 'FY6KYSarpbEnYCFt',
      database: process.env.DB_NAME || 'xingming',
      waitForConnections: true,
      connectionLimit: 2
    });

    // 查询兑换码
    const [rows] = await pool.execute(
      'SELECT * FROM redeem_codes WHERE code = ? AND status = 1',
      [code.toUpperCase()]
    );
    
    if (!rows[0]) {
      await pool.end();
      return res.json({ success: false, message: '兑换码无效' });
    }
    
    const redeemCode = rows[0];
    
    // 检查是否过期
    if (redeemCode.expired_at && new Date(redeemCode.expired_at) < new Date()) {
      await pool.end();
      return res.json({ success: false, message: '兑换码已过期' });
    }
    
    // 检查使用次数
    if (redeemCode.max_use > 0 && redeemCode.used_count >= redeemCode.max_use) {
      await pool.end();
      return res.json({ success: false, message: '兑换码已使用完' });
    }
    
    // 更新使用次数
    await pool.execute(
      'UPDATE redeem_codes SET used_count = used_count + 1 WHERE id = ?',
      [redeemCode.id]
    );
    
    await pool.end();
    
    res.json({ 
      success: true, 
      message: '兑换成功',
      amount: redeemCode.amount 
    });
  } catch (error) {
    console.error('兑换错误:', error);
    res.json({ success: false, message: '兑换失败，请稍后重试' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
