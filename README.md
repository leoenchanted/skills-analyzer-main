# Skills Analyzer

一个 Claude Code Skill，用于扫描、对比和深度分析你的 Skills 集合。输出精美的交互式 HTML 探索仪表板，包含详细的使用说明、流程图解和交互式模拟。

## 功能特性

- 🔍 **自动扫描** - 发现系统中所有的 Claude Code Skills
- ✅ **强制选择** - **必须先让用户选择要分析的 skills**，不会自动分析全部
- 📊 **多选对比** - 支持最多5个 skills 的并排对比
- 🎨 **可视化仪表板** - 精美的交互式 HTML 展示
- 📚 **详细文档** - 每个 skill 的完整使用说明、流程图解
- 💬 **大白话解释** - 用通俗易懂的语言解释复杂概念
- 🔄 **交互模拟器** - 模拟实际使用场景
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
skill documentation
skill explorer
```

## 工作流程

1. **扫描阶段** - 自动扫描 `~/.claude/skills/` 和 `./.claude/skills/` 目录
2. **选择阶段** - **展示发现的 skills 列表，等待用户选择**（最多5个）
3. **分析阶段** - 深度解析每个选中 skill 的结构、功能、流程和用法
4. **生成阶段** - 输出交互式 HTML 探索仪表板

### 用户选择界面示例

```
发现了 8 个 skills：

编号 | Skill 名称              | 描述
-----|------------------------|------------------------------------------
 1   | codebase-to-course     | 将代码库转换为交互式课程
 2   | skills-analyzer        | 分析和对比 skills (就是我自己！)
 3   | semantic-search        | 语义搜索代码库
 4   | pr-reviewer            | PR 代码审查助手
 5   | ui-generator           | 生成 UI 组件
 6   | refactor-helper        | 代码重构助手
 7   | doc-generator          | 文档生成器
 8   | test-writer            | 测试用例生成器

请选择要分析/对比的 skills（输入编号，可多选，最多5个）：
例如：1,3,5 或 2 4 6
```

## 输出内容

生成的探索仪表板包含：

### 1. 流程概览
- 📈 **可视化流程图** - 展示每个 skill 的执行阶段
- 🔍 **可点击节点** - 点击查看每个阶段的详细信息
- 📋 **输入/输出说明** - 清晰标注每个阶段的输入和输出

### 2. 详细步骤
- 📝 **可展开步骤卡片** - 点击展开查看详细说明
- 💻 **代码示例** - 展示实际使用代码
- 💡 **大白话解释** - 用通俗易懂的语言解释
- 🎯 **触发关键词** - 列出所有触发词

### 3. 交互模拟器
- 🎮 **使用场景模拟** - 模拟实际使用流程
- 💬 **对话预览** - 展示用户与 AI 的交互
- ✅ **进度展示** - 可视化执行进度

### 4. 对比视图
- 📊 **功能对比矩阵** - 并排对比多个 skills
- 🗺️ **副作用地图** - 可视化副作用类型和等级
- 📈 **复杂度对比** - 代码量、交互元素等对比

### 5. 搜索与过滤
- 🔍 **全文搜索** - 搜索所有 skills 的内容
- 🏷️ **类型过滤** - 按 skill 类型过滤
- 🚦 **副作用过滤** - 按副作用等级过滤

## 技术实现

- 单页 HTML 应用，无需服务器
- 现代 CSS 设计系统（基于 codebase-to-course）
- 原生 JavaScript，无外部依赖
- 可拖动的课程进度条
- 平滑滚动和动画效果

## 文件结构

```
skills-analyzer-main/
├── SKILL.md              # 主要技能指令（包含详细设计规范）
├── README.md             # 本文件
└── references/
    ├── _base.html        # HTML 模板
    ├── styles.css        # 样式系统
    ├── main.js           # 交互逻辑
    └── build.sh          # 构建脚本
```

## 设计系统

采用与 codebase-to-course 一致的设计语言：

- **主色**: 朱红色 `#E07A5F`
- **背景**: 米白色 `#FDF8F3`
- **字体**: DM Sans (正文), JetBrains Mono (代码)
- **圆角**: 8px / 12px / 16px / 24px
- **阴影**: 柔和的暖色调阴影

## 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 示例输出

分析 `codebase-to-course` 和 `skills-analyzer` 两个 skills 后，生成的仪表板将展示：

1. **并排流程图** - 对比两个 skill 的执行流程
2. **详细步骤卡片** - 每个 skill 的可展开步骤说明
3. **交互模拟器** - 模拟使用这两个 skills 的场景
4. **对比矩阵** - 功能、副作用、复杂度对比
5. **搜索功能** - 全文搜索两个 skills 的内容

## 许可

MIT License

## 作者

Created with ❤️ for the Claude Code community.
