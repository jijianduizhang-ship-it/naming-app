const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'naming-app-secret-key-2026';

// 内置管理员账户（用于快速验证）
const BUILTIN_ADMIN = {
  username: 'admin',
  password: '$2b$10$x/mh8FfBDgFTXRjyewvjhegKvp9afwwBtv5sXD1SEzDajFe2zhce6' // admin123
};

// 数据库连接池（延迟初始化）
let pool;

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || '43.139.124.235',
      user: process.env.DB_USER || 'xingming',
      password: process.env.DB_PASSWORD || 'FY6KYSarpbEnYCFt',
      database: process.env.DB_NAME || 'xingming',
      waitForConnections: true,
      connectionLimit: 2,
      queueLimit: 0,
      connectTimeout: 10000,
      acquireTimeout: 10000
    });
  }
  return pool;
}

// 中间件: 验证管理员token
async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: '未登录' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const [rows] = await getPool().query('SELECT id, username, status FROM admins WHERE id = ?', [decoded.id]);
    if (!rows[0] || rows[0].status !== 1) {
      return res.status(403).json({ error: '账号已被禁用' });
    }
    req.admin = rows[0];
    next();
  } catch (e) {
    return res.status(401).json({ error: '登录已过期' });
  }
}

// 登录
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: '请输入用户名和密码' });
  }
  try {
    let admin = null;
    
    // 优先检查内置管理员
    if (username === BUILTIN_ADMIN.username) {
      const isMatch = await bcrypt.compare(password, BUILTIN_ADMIN.password);
      if (isMatch) {
        admin = { id: 0, username: BUILTIN_ADMIN.username, status: 1 };
      }
    }
    
    // 如果不是内置管理员，查询数据库
    if (!admin) {
      const [rows] = await getPool().query('SELECT * FROM admins WHERE username = ?', [username]);
      if (!rows[0]) {
        return res.status(401).json({ error: '用户名或密码错误' });
      }
      admin = rows[0];
    }
    
    if (admin.status !== 1) {
      return res.status(403).json({ error: '账号已被禁用' });
    }
    
    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, username: admin.username });
  } catch (e) {
    console.error('登录错误:', e);
    res.status(500).json({ error: '服务器错误' });
  }
});

// ===== 用户管理 =====

// 获取用户列表
router.get('/users', authMiddleware, async (req, res) => {
  const { page = 1, pageSize = 20, keyword, status } = req.query;
  try {
    let where = '1=1';
    const params = [];
    if (keyword) {
      where += ' AND (nickname LIKE ? OR openid LIKE ?)';
      params.push(`%${keyword}%`, `%${keyword}%`);
    }
    if (status !== undefined) {
      where += ' AND status = ?';
      params.push(status);
    }
    const offset = (page - 1) * pageSize;
    const [rows] = await getPool().query(
      `SELECT * FROM users WHERE ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, parseInt(pageSize), offset]
    );
    const [[{ total }]] = await getPool().query(
      `SELECT COUNT(*) as total FROM users WHERE ${where}`,
      params
    );
    res.json({ list: rows, total, page: parseInt(page), pageSize: parseInt(pageSize) });
  } catch (e) {
    console.error('获取用户列表错误:', e);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 禁用/启用用户
router.post('/users/:id/toggle', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await getPool().query('SELECT status FROM users WHERE id = ?', [id]);
    if (!rows[0]) {
      return res.status(404).json({ error: '用户不存在' });
    }
    const newStatus = rows[0].status === 1 ? 0 : 1;
    await getPool().query('UPDATE users SET status = ? WHERE id = ?', [newStatus, id]);
    res.json({ success: true, status: newStatus });
  } catch (e) {
    res.status(500).json({ error: '服务器错误' });
  }
});

// 修改用户余额
router.post('/users/:id/credits', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { credits } = req.body;
  if (credits === undefined || isNaN(credits)) {
    return res.status(400).json({ error: '请输入有效的余额' });
  }
  try {
    await getPool().query('UPDATE users SET credits = ? WHERE id = ?', [credits, id]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: '服务器错误' });
  }
});

// ===== 兑换码管理 =====

// 获取兑换码列表
router.get('/codes', authMiddleware, async (req, res) => {
  const { page = 1, pageSize = 20, status } = req.query;
  try {
    let where = '1=1';
    const params = [];
    if (status !== undefined) {
      where += ' AND status = ?';
      params.push(status);
    }
    const offset = (page - 1) * pageSize;
    const [rows] = await getPool().query(
      `SELECT rc.*, a.username as creator_name FROM redeem_codes rc 
       LEFT JOIN admins a ON rc.created_by = a.id 
       WHERE ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, parseInt(pageSize), offset]
    );
    const [[{ total }]] = await getPool().query(
      `SELECT COUNT(*) as total FROM redeem_codes WHERE ${where}`,
      params
    );
    res.json({ list: rows, total, page: parseInt(page), pageSize: parseInt(pageSize) });
  } catch (e) {
    console.error('获取兑换码列表错误:', e);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 生成兑换码
router.post('/codes', authMiddleware, async (req, res) => {
  const { amount, maxUse = 1, expiredAt, count = 1 } = req.body;
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: '请输入有效的兑换次数' });
  }
  try {
    const codes = [];
    for (let i = 0; i < count; i++) {
      const code = generateCode();
      const [result] = await getPool().query(
        'INSERT INTO redeem_codes (code, amount, max_use, expired_at, created_by) VALUES (?, ?, ?, ?, ?)',
        [code, amount, maxUse, expiredAt || null, req.admin.id]
      );
      codes.push({ id: result.insertId, code, amount, maxUse });
    }
    res.json({ success: true, codes });
  } catch (e) {
    console.error('生成兑换码错误:', e);
    res.status(500).json({ error: '服务器错误' });
  }
});

// 禁用/启用兑换码
router.post('/codes/:id/toggle', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await getPool().query('SELECT status FROM redeem_codes WHERE id = ?', [id]);
    if (!rows[0]) {
      return res.status(404).json({ error: '兑换码不存在' });
    }
    const newStatus = rows[0].status === 1 ? 0 : 1;
    await getPool().query('UPDATE redeem_codes SET status = ? WHERE id = ?', [newStatus, id]);
    res.json({ success: true, status: newStatus });
  } catch (e) {
    res.status(500).json({ error: '服务器错误' });
  }
});

// ===== 起名记录 =====

// 获取起名记录
router.get('/records', authMiddleware, async (req, res) => {
  const { page = 1, pageSize = 20, gender, startDate, endDate } = req.query;
  try {
    let where = '1=1';
    const params = [];
    if (gender) {
      where += ' AND gender = ?';
      params.push(gender);
    }
    if (startDate) {
      where += ' AND DATE(created_at) >= ?';
      params.push(startDate);
    }
    if (endDate) {
      where += ' AND DATE(created_at) <= ?';
      params.push(endDate);
    }
    const offset = (page - 1) * pageSize;
    const [rows] = await getPool().query(
      `SELECT nr.*, u.nickname, u.openid FROM name_records nr 
       LEFT JOIN users u ON nr.user_id = u.id 
       WHERE ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, parseInt(pageSize), offset]
    );
    const [[{ total }]] = await getPool().query(
      `SELECT COUNT(*) as total FROM name_records WHERE ${where}`,
      params
    );
    res.json({ list: rows, total, page: parseInt(page), pageSize: parseInt(pageSize) });
  } catch (e) {
    console.error('获取记录错误:', e);
    res.status(500).json({ error: '服务器错误' });
  }
});

// ===== 数据统计 =====

router.get('/stats', authMiddleware, async (req, res) => {
  try {
    // 用户统计
    const [[{ totalUsers, activeUsers, disabledUsers }]] = await getPool().query(
      `SELECT 
        COUNT(*) as totalUsers,
        SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) as activeUsers,
        SUM(CASE WHEN status = 0 THEN 1 ELSE 0 END) as disabledUsers
       FROM users`
    );
    // 兑换码统计
    const [[{ totalCodes, usedCodes }]] = await getPool().query(
      `SELECT 
        COUNT(*) as totalCodes,
        SUM(used_count) as usedCodes
       FROM redeem_codes WHERE status = 1`
    );
    // 起名记录统计
    const [[{ totalRecords, aiRecords, localRecords }]] = await getPool().query(
      `SELECT 
        COUNT(*) as totalRecords,
        SUM(CASE WHEN source = 'ai' THEN 1 ELSE 0 END) as aiRecords,
        SUM(CASE WHEN source = 'local' THEN 1 ELSE 0 END) as localRecords
       FROM name_records`
    );
    // 今日统计
    const [[{ todayRecords, todayUsers }]] = await getPool().query(
      `SELECT 
        (SELECT COUNT(*) FROM name_records WHERE DATE(created_at) = CURDATE()) as todayRecords,
        (SELECT COUNT(DISTINCT user_id) FROM name_records WHERE DATE(created_at) = CURDATE()) as todayUsers`
    );
    // 最近7天趋势
    const [trend] = await getPool().query(
      `SELECT DATE(created_at) as date, COUNT(*) as count 
       FROM name_records 
       WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) 
       GROUP BY DATE(created_at) 
       ORDER BY date`
    );
    res.json({
      users: { total: totalUsers, active: activeUsers, disabled: disabledUsers },
      codes: { total: totalCodes, used: usedCodes },
      records: { total: totalRecords, ai: aiRecords, local: localRecords },
      today: { records: todayRecords, users: todayUsers },
      trend
    });
  } catch (e) {
    console.error('获取统计错误:', e);
    res.status(500).json({ error: '服务器错误' });
  }
});

// ===== 系统配置 =====

// 获取配置
router.get('/configs', authMiddleware, async (req, res) => {
  try {
    const [rows] = await getPool().query('SELECT * FROM configs');
    const configs = {};
    rows.forEach(row => {
      configs[row.config_key] = row.value;
    });
    res.json(configs);
  } catch (e) {
    res.status(500).json({ error: '服务器错误' });
  }
});

// 更新配置
router.post('/configs', authMiddleware, async (req, res) => {
  const { key, value, description } = req.body;
  if (!key) {
    return res.status(400).json({ error: '请输入配置键' });
  }
  try {
    const [existing] = await getPool().query('SELECT id FROM configs WHERE config_key = ?', [key]);
    if (existing[0]) {
      await getPool().query('UPDATE configs SET value = ? WHERE config_key = ?', [value, key]);
    } else {
      await getPool().query('INSERT INTO configs (config_key, value, description) VALUES (?, ?, ?)', [key, value, description || '']);
    }
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: '服务器错误' });
  }
});

// 辅助函数: 生成随机兑换码
function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

module.exports = router;
