-- Example data table
CREATE TABLE IF NOT EXISTS `bs_example_data` (
  `id` char(36) NOT NULL COMMENT '数据ID',
  `title` varchar(100) NOT NULL COMMENT '标题',
  `content` text COMMENT '内容',
  `plugin_config_id` char(36) DEFAULT NULL COMMENT '相关配置ID',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态:0-禁用,1-启用',
  `created_by` char(36) DEFAULT NULL COMMENT '创建人ID',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='示例插件数据表';

-- Insert some sample data
INSERT INTO `bs_example_data` (`id`, `title`, `content`, `status`, `created_at`, `updated_at`)
VALUES
(UUID(), '示例数据 1', '这是示例数据内容 1', 1, NOW(), NOW()),
(UUID(), '示例数据 2', '这是示例数据内容 2', 1, NOW(), NOW()),
(UUID(), '示例数据 3', '这是示例数据内容 3', 1, NOW(), NOW());
