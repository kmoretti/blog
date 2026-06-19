/**
 * AISummary 配置文件
 * 说明：本文件作为普通脚本注入页面（非模块），使用 var 保持全局可见
 */

// AI 摘要脚本配置（供离线脚本读取，从 .env 文件读取）：
// [AI_SUMMARY_API] 摘要服务地址
// AI_SUMMARY_API=https://ai.zsxcoder.top/api/spark-proxy

// [AI_SUMMARY_KEY] 摘要服务密钥
// AI_SUMMARY_KEY=your-api-key

// [AISUMMARY_WORD_LIMIT] 提交与处理的最大字数
// AISUMMARY_WORD_LIMIT=5000

// [AISUMMARY_LOG_LEVEL] 运行日志等级（0/1/2）
// AISUMMARY_LOG_LEVEL=1

// [AISUMMARY_CONCURRENCY] 并发处理数（默认 3，建议不高于 5）
// AISUMMARY_CONCURRENCY=2

// [AISUMMARY_CLEAN_BEFORE_API] 是否清洗提交给摘要服务的正文
// AISUMMARY_CLEAN_BEFORE_API=true

// [AISUMMARY_OVERWRITE_EXISTING] 已有摘要的覆盖策略：ask/always/never
// AISUMMARY_OVERWRITE_EXISTING=ask

// 说明：以上为注释形式的键值配置，供离线脚本解析，不在浏览器中使用

// AISummary 静态摘要配置（前端浏览器使用）：
var aisummaryTypingAnimate = true; // true 开启打字机动画；false 直接渲染文本
var aisummaryPostSelector = '#content'; // 文章内容容器选择器
