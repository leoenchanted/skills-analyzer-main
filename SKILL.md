---
name: skills-analyzer
description: "Scan, compare and visualize Claude Code skills with detailed usage documentation. Use this skill when the user wants to analyze, compare, or create a visual overview of their skills collection with comprehensive workflow explanations."
trigger: ["analyze my skills", "compare skills", "create skills dashboard", "visualize my skills", "skills comparison", "what skills do I have", "skill documentation", "skill explorer"]
---

# Skills Analyzer

一个 Claude Code Skill，用于扫描、对比和可视化展示你的 Skills 集合。输出一个精美的交互式 HTML 仪表板，支持多选对比（最多5个），包含详细的使用说明、流程图解、代码示例和交互式模拟。

## First-Run Welcome

当 Skill 首次触发时，向用户介绍：

> **我可以帮你分析、对比和深入了解你的 Claude Code Skills 集合。**
>
> 我会：
> 1. **扫描**你所有的 skills（从 `~/.claude/skills/` 和 `./.claude/skills/`）
> 2. **解析**每个 skill 的结构、功能、工作流程和用法
> 3. **生成**一个交互式探索仪表板，展示详细的使用说明
>
> 你只需要告诉我你想做什么：
> - "分析我的 skills"
> - "对比我的 skills"
> - "生成 skills 文档"

## The Process (MANDATORY SELECTION)

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

### Phase 2: Selection (用户选择) - **MANDATORY**

**⚠️ CRITICAL: 必须向用户展示选择界面，等待用户输入**

向用户展示发现的 skills 列表（带编号）：

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

💡 提示：输入 "all" 可选择所有 skills（但不推荐，内容会非常庞大）
```

**等待用户明确输入后才继续。**

用户输入格式：
- 逗号分隔：`1,3,5`
- 空格分隔：`1 3 5`
- 混合：`1, 3, 5`
- 范围：`1-3`
- 特殊：输入 "all" 选择全部（需确认）

如果用户选择的数量 > 5：
> ⚠️ 你选择了 N 个 skills，建议最多对比 5 个以获得最佳体验。
> 请选择最重要的 5 个，或分批查看。

### Phase 3: Deep Analysis (深度分析)

对每个选中的 skill 进行深度分析：

**1. 结构分析**
- SKILL.md 解析
- README.md 解析
- 参考文件扫描
- 依赖关系检测

**2. 功能提取**
- 主要功能点
- 触发条件
- 输入/输出类型
- 使用场景

**3. 流程分析** (类似 codebase-to-course)
- 执行阶段划分
- 每个阶段的输入/输出
- 关键决策点
- 用户交互流程

**4. 副作用检测**
- 🔴 文件系统操作（创建/修改/删除文件）
- 🟠 网络请求（API调用、git clone等）
- 🟢 纯计算（无副作用的数据处理）

**5. 代码复杂度**
- 代码行数估算
- 交互元素数量
- 配置参数数量

### Phase 4: Build Explorer Dashboard (生成探索仪表板)

**CRITICAL: 采用 codebase-to-course-explorer 的设计模式**

输出目录结构：

```
skills-explorer/
├── index.html          # 主页面（单文件应用）
└── assets/             # 图标等资源（可选）
    └── icons/
```

**仪表板必须包含以下模块：**

#### 1. Header (标题区)
- 项目名称和简介
- 选中 skills 数量
- 最后更新时间

#### 2. Navigation (导航栏)
- 流程概览
- 详细步骤
- 对比视图
- 副作用地图
- 搜索按钮

#### 3. Course Progress Bar (课程进度条)
- 可拖动的阅读进度条
- 显示当前阅读百分比

#### 4. Flow Diagram (流程图)
每个 skill 的执行流程可视化：

```
Phase 1: Discovery → Phase 2: Selection → Phase 3: Analysis → Phase 4: Build
     🔍                    📝                   🔍                  🏗️
```

- 可点击的节点
- 展开显示阶段详情
- 输入/输出说明

#### 5. Step Cards (步骤卡片)
每个 skill 的详细步骤（可展开）：
- 步骤编号和标题
- 代码示例
- 大白话解释（Plain English）
- 触发关键词
- 使用示例

#### 6. Simulator (交互模拟器)
模拟实际使用场景：
- 用户输入示例
- AI 响应预览
- 执行进度展示

#### 7. Comparison View (对比视图)
多 skill 并排对比：
- 功能对比矩阵
- 副作用对比
- 复杂度对比
- 使用场景对比

#### 8. Side Effects Map (副作用地图)
可视化展示每个 skill 的副作用：
- 文件操作（读/写/删除）
- 网络请求
- 纯计算

#### 9. Search & Filter (搜索过滤)
- 实时搜索 skills
- 按类型过滤
- 按副作用等级过滤
- Ctrl+K 快捷键

#### 10. Floating Summary Button (悬浮总结按钮)
- 点击显示当前 skill 的关键信息
- 可复制到剪贴板

## HTML Structure

参考 codebase-to-course-explorer.html 的结构：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Skills Explorer - {{skill_names}}</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    /* Design System from codebase-to-course */
    :root {
      --bg-primary: #FDF8F3;
      --bg-secondary: #F5EDE6;
      --bg-tertiary: #E8DED4;
      --accent: #E07A5F;
      --accent-light: #F4C2B0;
      --accent-dark: #C45A3D;
      --text-primary: #2D2A26;
      --text-secondary: #5C5753;
      --text-muted: #8B8580;
      --code-bg: #1E1E2E;
      --success: #81B29A;
      --warning: #F2CC8F;
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 16px;
      --radius-xl: 24px;
      --card-shadow: 0 2px 8px rgba(45, 42, 38, 0.06), 0 4px 24px rgba(45, 42, 38, 0.04);
      --card-shadow-hover: 0 4px 16px rgba(45, 42, 38, 0.1), 0 8px 32px rgba(45, 42, 38, 0.08);
    }
  </style>
</head>
<body>
  <!-- Header -->
  <header class="header">...</header>

  <!-- Course Progress Bar -->
  <div class="course-progress-container" id="courseProgress">...</div>

  <!-- Navigation -->
  <nav class="nav-bar">...</nav>

  <!-- Container -->
  <div class="container">
    <!-- Section: Overview -->
    <section id="overview" class="section active">
      <div class="flow-container">
        <div class="flow-diagram">
          <!-- Phase cards -->
        </div>
        <div class="phase-details" id="phase-1">...</div>
        <!-- More phase details -->
      </div>
    </section>

    <!-- Section: Steps -->
    <section id="steps" class="section">
      <div class="steps-container">
        <!-- Step cards with expandable content -->
      </div>
    </section>

    <!-- Section: Comparison -->
    <section id="comparison" class="section">
      <!-- Comparison matrix -->
    </section>

    <!-- Section: Side Effects -->
    <section id="effects" class="section">
      <!-- Side effects visualization -->
    </section>
  </div>

  <!-- Floating Summary Button -->
  <button class="floating-summary-btn" id="summaryBtn">📋</button>

  <!-- Modals -->
  <div class="modal-overlay" id="summaryModal">...</div>
  <div class="modal-overlay search-modal" id="searchModal">...</div>

  <script>
    // Interactive features
  </script>
</body>
</html>
```

## CSS Design System

采用 codebase-to-course 的设计系统：

```css
:root {
  /* Colors */
  --bg-primary: #FDF8F3;
  --bg-secondary: #F5EDE6;
  --bg-tertiary: #E8DED4;
  --accent: #E07A5F;
  --accent-light: #F4C2B0;
  --accent-dark: #C45A3D;
  --text-primary: #2D2A26;
  --text-secondary: #5C5753;
  --text-muted: #8B8580;
  --code-bg: #1E1E2E;
  --success: #81B29A;
  --warning: #F2CC8F;

  /* Typography */
  --font-display: 'DM Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  ...
  --space-16: 4rem;

  /* Shadows */
  --card-shadow: 0 2px 8px rgba(45, 42, 38, 0.06), 0 4px 24px rgba(45, 42, 38, 0.04);
  --card-shadow-hover: 0 4px 16px rgba(45, 42, 38, 0.1), 0 8px 32px rgba(45, 42, 38, 0.08);

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
}
```

## JavaScript Features

1. **Progress Bar** - 可拖动的阅读进度条
2. **Section Navigation** - Tab 切换不同视图
3. **Flow Diagram** - 可点击的流程图节点
4. **Step Cards** - 可展开的步骤详情
5. **Search Modal** - 文档式搜索（Ctrl+K）
6. **Comparison Toggle** - 对比模式切换
7. **Filter System** - 类型/副作用过滤
8. **Smooth Scroll** - 平滑滚动导航
9. **Floating Summary** - 悬浮总结按钮
10. **Animations** - 入场动画和交互动画

## Content Structure per Skill

每个 skill 的展示内容必须包含：

### 1. 基本信息卡片
```
┌─────────────────────────────────────────┐
│  🔧 Skill Name                          │
│  一句话描述                              │
│  ─────────────────────────────────────  │
│  触发词: trigger1, trigger2, trigger3   │
│  类型: 生成器/分析器/工具                │
│  副作用: 🟢 低 / 🟠 中 / 🔴 高          │
└─────────────────────────────────────────┘
```

### 2. 流程图解
```
Phase 1 → Phase 2 → Phase 3 → Phase 4
  🔍        📝        🔍        🏗️

点击每个阶段查看：
- 阶段目标
- 输入内容
- 输出内容
- 关键决策点
```

### 3. 详细步骤（可展开）
```
┌─────────────────────────────────────────┐
│  1️⃣  触发 Skill              [展开 ▼]  │
├─────────────────────────────────────────┤
│  （展开后）                              │
│  触发关键词：                             │
│  ```                                    │
│  "analyze my skills"                    │
│  "compare skills"                       │
│  ```                                    │
│  ─────────────────────────────────────  │
│  💡 大白话解释                           │
│  这就像是一个智能助手听到了...           │
└─────────────────────────────────────────┘
```

### 4. 代码示例
```html
<div class="code-block">
  <code>
    <span style="color: #F2CC8F;"># 示例命令</span>
    analyze my skills
  </code>
</div>
```

### 5. 使用场景
- 何时使用这个 skill
- 输入示例
- 预期输出
- 注意事项

## Design Principles

1. **Warm Palette** - 米白色背景，朱红色强调
2. **Generous Whitespace** - 大量的留白和呼吸感
3. **Card-based Layout** - 卡片式布局，圆角阴影
4. **Visual Hierarchy** - 清晰的视觉层次
5. **Interactive Elements** - 丰富的交互反馈
6. **Plain English Explanations** - 大白话解释复杂概念

## Critical Rules

1. **NEVER skip user selection** - 必须询问用户选择要分析的 skills
2. **Max 5 skills** for comparison - 超过5个提示用户精简
3. **Extract exact code** from skills - 不要修改或简化
4. **Include all side effects** - 准确标记每个 skill 的副作用类型
5. **Mobile responsive** - 移动端适配是必须的
6. **Single file output** - 输出为单个 HTML 文件
7. **Self-contained** - 不依赖外部资源（除字体外）

## Example Output

用户选择 skills 1, 3, 5 后，生成的仪表板包含：

1. **Header** - "Skills Explorer: 3 skills documented"
2. **Flow Overview** - 每个 skill 的执行流程图
3. **Step-by-Step Guide** - 可展开的详细步骤
4. **Comparison Matrix** - 并排对比关键指标
5. **Side Effects Visualization** - 三色矩阵图
6. **Simulator** - 交互式使用模拟
7. **Search** - 全文搜索所有内容

整个输出是一个完整的、可直接在浏览器打开的交互式探索仪表板。
