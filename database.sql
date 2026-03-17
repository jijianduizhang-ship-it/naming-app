-- 智能起名小程序 - MySQL 数据库表结构
-- 创建日期: 2026-03-17

-- 管理员表
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
  `password` VARCHAR(255) NOT NULL COMMENT '密码(加密存储)',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `last_login` DATETIME DEFAULT NULL,
  `status` TINYINT DEFAULT 1 COMMENT '1正常 0禁用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 用户表（记录起名用户）
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `openid` VARCHAR(100) DEFAULT NULL COMMENT '微信openid',
  `nickname` VARCHAR(100) DEFAULT NULL COMMENT '昵称',
  `credits` INT DEFAULT 0 COMMENT '剩余次数',
  `total_used` INT DEFAULT 0 COMMENT '累计使用次数',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `status` TINYINT DEFAULT 1 COMMENT '1正常 0禁用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 兑换码表
CREATE TABLE IF NOT EXISTS `redeem_codes` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `code` VARCHAR(50) NOT NULL UNIQUE COMMENT '兑换码',
  `amount` INT NOT NULL COMMENT '兑换次数',
  `used_count` INT DEFAULT 0 COMMENT '已使用次数',
  `max_use` INT DEFAULT 1 COMMENT '最大使用次数(0不限)',
  `created_by` INT DEFAULT NULL COMMENT '创建者ID',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `expired_at` DATETIME DEFAULT NULL COMMENT '过期时间',
  `status` TINYINT DEFAULT 1 COMMENT '1正常 0禁用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 兑换记录表
CREATE TABLE IF NOT EXISTS `redeem_records` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT NOT NULL COMMENT '用户ID',
  `code_id` INT NOT NULL COMMENT '兑换码ID',
  `amount` INT NOT NULL COMMENT '兑换数量',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 起名记录表
CREATE TABLE IF NOT EXISTS `name_records` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT DEFAULT NULL COMMENT '用户ID(可为空)',
  `surname` VARCHAR(10) NOT NULL COMMENT '姓氏',
  `gender` VARCHAR(10) NOT NULL COMMENT '性别',
  `birthday` DATE NOT NULL COMMENT '出生日期',
  `name_length` INT DEFAULT 3 COMMENT '名字字数',
  `result_names` TEXT COMMENT '生成的名字(JSON数组)',
  `source` VARCHAR(20) DEFAULT 'ai' COMMENT '来源:ai/local',
  `ip` VARCHAR(50) DEFAULT NULL COMMENT 'IP地址',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 系统配置表
CREATE TABLE IF NOT EXISTS `configs` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `key` VARCHAR(50) NOT NULL UNIQUE COMMENT '配置键',
  `value` TEXT COMMENT '配置值',
  `description` VARCHAR(255) DEFAULT NULL COMMENT '说明',
  `updated_at` DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 初始化默认管理员账号 (密码: admin123)
INSERT INTO `admins` (`username`, `password`) VALUES 
('admin', '$2a$10$8K1p/a0dL3.XcvqjqFjjqe1Jj5J/0J9Y5mKx2XhQKJYFPO5vG4W6');

-- 初始化默认配置
INSERT INTO `configs` (`key`, `value`, `description`) VALUES
('ai_api_url', 'https://api.deepseek.com/v1/chat/completions', 'AI API 地址'),
('ai_api_key', 'sk-c2f2ce816b3f43b09b6740f702ad3f36', 'AI API 密钥'),
('ai_model', 'deepseek-chat', 'AI 模型名称');
