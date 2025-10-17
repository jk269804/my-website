// 示例数据
const sampleData = {
    sales: {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        data: [12000, 19000, 15000, 22000, 18000, 25000, 30000, 28000, 32000, 35000, 38000, 42000]
    },
    users: {
        labels: ['18-25岁', '26-35岁', '36-45岁', '46-55岁', '55岁以上'],
        data: [25, 40, 20, 10, 5]
    },
    categories: {
        labels: ['电子产品', '服装', '家居', '食品', '图书', '其他'],
        data: [35, 25, 15, 12, 8, 5]
    },
    regions: {
        labels: ['华东', '华北', '华南', '华中', '西南', '西北', '东北'],
        data: [30, 25, 20, 10, 8, 4, 3]
    }
};

// 图表实例
let charts = {};

// 初始化函数
function init() {
    updateStats();
    createCharts();
    setupEventListeners();
}

// 更新统计数据
function updateStats() {
    const totalSales = sampleData.sales.data.reduce((sum, val) => sum + val, 0);
    const totalUsers = sampleData.users.data.reduce((sum, val) => sum + val, 0);
    const totalOrders = Math.floor(totalSales / 250);
    const avgOrder = totalSales / totalOrders;

    document.getElementById('totalSales').textContent = `¥ ${totalSales.toLocaleString()}`;
    document.getElementById('totalUsers').textContent = totalUsers.toLocaleString();
    document.getElementById('totalOrders').textContent = totalOrders.toLocaleString();
    document.getElementById('avgOrder').textContent = `¥ ${avgOrder.toFixed(0)}`;
}

// 创建图表
function createCharts() {
    // 销售趋势图（折线图）
    charts.salesChart = new Chart(document.getElementById('salesChart'), {
        type: 'line',
        data: {
            labels: sampleData.sales.labels,
            datasets: [{
                label: '销售额（元）',
                data: sampleData.sales.data,
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // 用户分布图（饼图）
    charts.usersChart = new Chart(document.getElementById('usersChart'), {
        type: 'doughnut',
        data: {
            labels: sampleData.users.labels,
            datasets: [{
                data: sampleData.users.data,
                backgroundColor: [
                    '#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // 产品类别分析（柱状图）
    charts.categoryChart = new Chart(document.getElementById('categoryChart'), {
        type: 'bar',
        data: {
            labels: sampleData.categories.labels,
            datasets: [{
                label: '占比 (%)',
                data: sampleData.categories.data,
                backgroundColor: [
                    '#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#34495e'
                ],
                borderWidth: 0,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // 地域分布图（雷达图）
    charts.regionChart = new Chart(document.getElementById('regionChart'), {
        type: 'radar',
        data: {
            labels: sampleData.regions.labels,
            datasets: [{
                label: '市场份额 (%)',
                data: sampleData.regions.data,
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: '#3498db',
                borderWidth: 2,
                pointBackgroundColor: '#3498db'
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    pointLabels: {
                        font: {
                            size: 11
                        }
                    },
                    min: 0,
                    max: 35
                }
            }
        }
    });
}

// 设置事件监听器
function setupEventListeners() {
    // 时间范围选择
    document.getElementById('timeRange').addEventListener('change', function() {
        refreshData(this.value);
    });

    // 刷新按钮
    document.getElementById('refreshBtn').addEventListener('click', function() {
        const timeRange = document.getElementById('timeRange').value;
        refreshData(timeRange);
        
        // 添加加载效果
        this.innerHTML = '<span class="loading"></span> 刷新中...';
        this.disabled = true;
        
        setTimeout(() => {
            this.innerHTML = '刷新数据';
            this.disabled = false;
        }, 1000);
    });

    // 导航链接点击
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 更新活跃状态
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // 这里可以添加页面切换逻辑
            const target = this.getAttribute('href').substring(1);
            showSection(target);
        });
    });
}

// 刷新数据（模拟）
function refreshData(timeRange) {
    // 模拟数据更新
    const multiplier = {
        'day': 0.1,
        'week': 0.3,
        'month': 1,
        'year': 3
    }[timeRange] || 1;

    // 更新销售数据
    sampleData.sales.data = sampleData.sales.data.map(val => 
        Math.max(1000, val * multiplier * (0.9 + Math.random() * 0.2))
    );

    // 更新图表
    charts.salesChart.data.datasets[0].data = sampleData.sales.data;
    charts.salesChart.update();

    // 更新统计数据
    updateStats();
}

// 显示特定区域
function showSection(sectionId) {
    // 这里可以添加区域切换逻辑
    console.log('切换到区域:', sectionId);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);

// 添加窗口调整大小时的图表重绘
window.addEventListener('resize', function() {
    Object.values(charts).forEach(chart => {
        chart.resize();
    });
});