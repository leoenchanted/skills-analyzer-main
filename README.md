# Skills Analyzer

一个 Claude Code Skill，用于扫描、对比和可视化展示你的 Skills 集合。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Claude Code](https://img.shields.io/badge/claude--code-skill-orange.svg)

## 功能特性

- 🔍 **自动扫描** - 发现系统中所有的 Claude Code Skills
- 📊 **多选对比** - 支持最多5个 skills 的并排对比
- 🎨 **可视化仪表板** - 精美的交互式 HTML 展示
- 🔴🟠🟢 **副作用分析** - 检测每个 skill 的文件/网络/计算副作用
- 🔗 **依赖关系** - 分析 skills 之间的依赖和调用关系
- 📱 **响应式设计** - 完美支持桌面和移动端
- ⌨️ **快捷键** - Ctrl+K 搜索，ESC 关闭，拖动进度条

## 使用方法

在 Claude Code 中输入以下任意触发语：

```
analyze my skills
compare skills
skills dashboard
visualize my skills
what skills do I have
```

## 工作流程

1. **扫描阶段** - 自动扫描 `~/.claude/skills/` 目录
2. **选择阶段** - 用户选择要对比的 skills（最多5个）
3. **分析阶段** - 深度解析每个 skill 的结构和功能
4. **生成阶段** - 输出交互式 HTML 仪表板

## 输出内容

生成的仪表板包含：

- 📈 **概览统计** - 总技能数、平均复杂度、副作用分布
- 📊 **对比矩阵** - 并排对比各 skill 的关键指标
- 🗺️ **副作用地图** - 可视化展示副作用类型和等级
- 🎴 **技能卡片** - 每个 skill 的详细信息和触发词
- 🔍 **文档搜索** - 支持关键词搜索所有 skills

## 技术实现

- 单页 HTML 应用，无需服务器
- 现代 CSS 设计系统（基于 codebase-to-course）
- 原生 JavaScript，无外部依赖
- 可拖动的课程进度条
- 平滑滚动和动画效果

## 文件结构

```
skills-analyzer-main/
├── SKILL.md              # 主要技能指令
├── README.md             # 本文件
└── references/
    ├── _base.html        # HTML 模板
    ├── styles.css        # 样式系统
    ├── main.js           # 交互逻辑
    └── build.sh          # 构建脚本
```

## 设计系统

采用与 codebase-to-course 一致的设计语言：

- **主色**: 朱红色 `#D94F30`
- **背景**: 米白色 `#FAF7F2`
- **字体**: Bricolage Grotesque (标题), DM Sans (正文), JetBrains Mono (代码)
- **圆角**: 8px / 12px / 16px / 24px
- **阴影**: 柔和的暖色调阴影

## 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 许可

MIT License

## 作者

Created with Leoenchanted & ai for the Claude Code community.
