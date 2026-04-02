---
name: skills-analyzer
description: "Scan, compare and visualize Claude Code skills in a beautiful interactive dashboard. Use this skill when the user wants to analyze, compare, or create a visual overview of their skills collection. Trigger phrases: 'analyze my skills', 'compare skills', 'create skills dashboard', 'visualize my skills', 'skills comparison', 'what skills do I have'"
---

# Skills Analyzer

一个 Claude Code Skill，用于扫描、对比和可视化展示你的 Skills 集合。输出一个精美的交互式 HTML 仪表板，支持多选对比（最多5个），包含代码分析、副作用检测、功能对比等。

## First-Run Welcome

当 Skill 首次触发时，向用户介绍：

> **我可以帮你分析和可视化你的 Claude Code Skills 集合。**
>
> 我会：
> 1. **扫描**你所有的 skills（从 `~/.claude/skills/`）
> 2. **解析**每个 skill 的结构、功能和工作原理
> 3. **生成**一个交互式对比仪表板
>
> 你只需要告诉我你想做什么：
> - "分析我的 skills"
> - "对比我的 skills"
> - "生成 skills 仪表板"

## The Process

### Phase 1: Discovery (技能发现)

扫描用户系统中的 skills：

```bash
# 扫描路径
~/.claude/skills/
./.claude/skills/  # 当前项目的 skills
```

对于每个找到的 skill，提取：
- **名称** (name)
- **描述** (description)
- **触发词** (trigger phrases)
- **核心功能** (main capabilities)
- **文件结构** (file structure)
- **副作用分析** (side effects: 网络/文件/纯计算)

### Phase 2: Selection (用户选择)

向用户展示发现的 skills 列表：

```
发现了 8 个 skills：

1. ✅ codebase-to-course    - 将代码库转换为交互式课程
2. 📊 skills-analyzer       - 分析和对比 skills (就是我自己！)
3. 🔍 semantic-search       - 语义搜索代码库
4. 📝 pr-reviewer           - PR 代码审查助手
5. 🎨 ui-generator          - 生成 UI 组件
6. 🔧 refactor-helper       - 代码重构助手
7. 📚 doc-generator         - 文档生成器
8. 🧪 test-writer           - 测试用例生成器

请选择要对比的 skills（输入序号，可多选，最多5个）：
例如：1,3,5 或 2 4 6
```

用户输入格式：
- 逗号分隔：`1,3,5`
- 空格分隔：`1 3 5`
- 混合：`1, 3, 5`

### Phase 3: Analysis (深度分析)

对每个选中的 skill 进行深度分析：

**1. 结构分析**
- SKILL.md 解析
- 参考文件扫描
- 依赖关系检测

**2. 功能提取**
- 主要功能点
- 触发条件
- 输入/输出类型

**3. 副作用检测**
- 🔴 文件系统操作（创建/修改/删除文件）
- 🟠 网络请求（API调用、git clone等）
- 🟢 纯计算（无副作用的数据处理）

**4. 代码复杂度**
- 代码行数估算
- 交互元素数量
- 配置参数数量

### Phase 4: Build Dashboard (生成仪表板)

输出目录结构：

```
skills-dashboard/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── main.js             # 交互逻辑
├── data.js             # skills 数据
└── assets/             # 图标等资源
    └── icons/
```

仪表板包含以下模块：

#### 1. Header (标题区)
- Skill 名称和简介
- 选中 skills 数量
- 最后更新时间

#### 2. Comparison Matrix (对比矩阵)
表格形式对比所有选中的 skills：

| Skill | 类型 | 副作用 | 输入 | 输出 | 复杂度 |
|-------|------|--------|------|------|--------|
| codebase-to-course | 生成器 | 🟡 中 | 代码库 | HTML课程 | 高 |
| skills-analyzer | 分析器 | 🟢 低 | skills | 仪表板 | 中 |

#### 3. Side Effects Map (副作用地图)
可视化展示每个 skill 的副作用分布：
- 横向：技能列表
- 纵向：副作用类型（文件/网络/计算）
- 颜色编码：红色(高) / 橙色(中) / 绿色(低)

#### 4. Feature Cards (功能卡片)
每个 skill 的详细信息卡片：
- 图标 + 名称
- 一句话描述
- 触发词标签
- 功能列表
- 输入/输出类型
- 代码预览（可选）

#### 5. Interaction Flow (交互流程图)
展示每个 skill 的执行流程：
- Phase 1 → Phase 2 → Phase 3
- 点击展开详情

#### 6. Search & Filter (搜索过滤)
- 实时搜索 skills
- 按类型过滤
- 按副作用等级过滤

## Output Structure

### HTML Structure

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <!-- Meta, Fonts, CSS -->
</head>
<body>
  <!-- Progress Bar -->
  <div class="course-progress-container">...</div>

  <!-- Navigation -->
  <nav class="nav-bar">...</nav>

  <!-- Main Content -->
  <main class="container">
    <!-- Hero Section -->
    <section class="hero">...</section>

    <!-- Comparison Matrix -->
    <section class="comparison-section">...</section>

    <!-- Side Effects Map -->
    <section class="effects-section">...</section>

    <!-- Skill Cards -->
    <section class="skills-grid">...</section>
  </main>

  <!-- Floating Actions -->
  <button class="floating-summary-btn">...</button>

  <!-- Modals -->
  <div class="modal-overlay" id="searchModal">...</div>
  <div class="modal-overlay" id="summaryModal">...</div>

  <!-- Scripts -->
  <script src="data.js"></script>
  <script src="main.js"></script>
</body>
</html>
```

### CSS Design System

参考 codebase-to-course 的设计系统：

```css
:root {
  /* Colors */
  --color-bg: #FAF7F2;
  --color-bg-warm: #F5F0E8;
  --color-accent: #D94F30;
  --color-text: #2C2A28;

  /* Typography */
  --font-display: 'Bricolage Grotesque', ...;
  --font-body: 'DM Sans', ...;
  --font-mono: 'JetBrains Mono', ...;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  ...
  --space-16: 4rem;

  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(44, 42, 40, 0.06);
  --shadow-md: 0 4px 16px rgba(44, 42, 40, 0.08);
  --shadow-lg: 0 8px 32px rgba(44, 42, 40, 0.12);

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
}
```

### JavaScript Features

1. **Progress Bar** - 可拖动的阅读进度条
2. **Search Modal** - 文档式搜索（Ctrl+K）
3. **Comparison Toggle** - 对比模式切换
4. **Filter System** - 类型/副作用过滤
5. **Smooth Scroll** - 平滑滚动导航
6. **Animations** - 入场动画和交互动画

## Design Principles

1. **Warm Palette** - 米白色背景，朱红色强调
2. **Generous Whitespace** - 大量的留白和呼吸感
3. **Card-based Layout** - 卡片式布局，圆角阴影
4. **Visual Hierarchy** - 清晰的视觉层次
5. **Interactive Elements** - 丰富的交互反馈

## Reference Files

- `references/styles.css` - 预构建样式系统
- `references/main.js` - 交互逻辑引擎
- `references/_base.html` - HTML 模板
- `references/build.sh` - 构建脚本

## Critical Rules

1. **Never regenerate** `styles.css` or `main.js` - 总是从 references 复制
2. **Extract exact code** from skills - 不要修改或简化
3. **Max 5 skills** for comparison - 超过5个提示用户精简
4. **Include all side effects** - 准确标记每个 skill 的副作用类型
5. **Mobile responsive** - 移动端适配是必须的

## Example Output

用户选择 skills 1, 3, 5 后，生成的仪表板包含：

1. **Hero Section** - "Skills Dashboard: 3 skills analyzed"
2. **Quick Stats** - 总代码行数、平均复杂度、副作用分布
3. **Comparison Table** - 并排对比3个 skills 的关键指标
4. **Side Effects Visualization** - 三色矩阵图
5. **Skill Detail Cards** - 每个 skill 的详细信息
6. **Flow Diagrams** - 执行流程可视化
7. **Export Options** - 导出为 PDF/Markdown/HTML

整个输出是一个完整的、可直接在浏览器打开的交互式仪表板。
