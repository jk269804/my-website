# 数据可视化平台

一个现代化的数据可视化网站，使用 Chart.js 实现多种图表展示。

## 功能特性

- 📊 多种图表类型（折线图、柱状图、饼图、雷达图）
- 📱 响应式设计，支持移动端
- 🎨 现代化UI设计，渐变背景和毛玻璃效果
- 🔄 实时数据刷新和交互功能
- 📈 数据统计卡片展示

## 技术栈

- HTML5
- CSS3（Grid布局、Flexbox、动画效果）
- JavaScript（ES6+）
- Chart.js（数据可视化库）

## 快速开始

1. 克隆或下载项目文件
2. 使用以下命令启动开发服务器：
   ```bash
   npm install -g live-server
   live-server --port=3000
   ```
3. 打开浏览器访问 `http://localhost:3000`

或者直接双击 `index.html` 文件在浏览器中打开。

## 项目结构

```
data-visualization-platform/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # JavaScript逻辑
├── package.json        # 项目配置
└── README.md           # 项目说明
```

## 图表类型

1. **销售趋势图** - 折线图展示月度销售数据
2. **用户分布图** - 环形图展示用户年龄分布
3. **产品类别分析** - 柱状图展示产品类别占比
4. **地域分布图** - 雷达图展示各地区市场份额

## 自定义配置

可以修改 `script.js` 文件中的 `sampleData` 对象来使用真实数据：

```javascript
const sampleData = {
    sales: {
        labels: ['你的月份数据'],
        data: [你的销售数据]
    },
    // ... 其他数据配置
};
```

## 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 许可证

MIT License