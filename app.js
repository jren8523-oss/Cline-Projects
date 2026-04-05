// 网盘资源数据库（包含原有的4本书 + 法学概论）
const resourceData = [
    {
        id: 1,
        title: "中国法制史（第二版）",
        formattedTitle: "[中国法制史(第二版)][教材][PDF]",
        category: "教材",
        format: "PDF",
        hasBaidu: true,
        hasQuark: true,
        baiduUrl: "#",
        quarkUrl: "#"
    },
    {
        id: 2,
        title: "刑法学 第二版 马工程 上册",
        formattedTitle: "[刑法学 第二版 马工程 上册][教材][PDF]",
        category: "教材",
        format: "PDF",
        hasBaidu: true,
        hasQuark: true,
        baiduUrl: "#",
        quarkUrl: "#"
    },
    {
        id: 3,
        title: "民法学 第二版 马工程 上册",
        formattedTitle: "[民法学 第二版 马工程 上册][教材][PDF]",
        category: "教材",
        format: "PDF",
        hasBaidu: true,
        hasQuark: true,
        baiduUrl: "#",
        quarkUrl: "#"
    },
    {
        id: 4,
        title: "民法学 第二版 马工程 下册",
        formattedTitle: "[民法学 第二版 马工程 下册][教材][PDF]",
        category: "教材",
        format: "PDF",
        hasBaidu: true,
        hasQuark: true,
        baiduUrl: "#",
        quarkUrl: "#"
    },
    {
        id: 5,
        title: "法学概论",
        formattedTitle: "[法学概论][教材][2025]",
        category: "教材",
        format: "PDF",
        hasBaidu: true,
        hasQuark: true,
        baiduUrl: "#",
        quarkUrl: "#"
    }
];

// 渲染资源卡片函数
function renderResourceCards(data) {
    const resourceList = document.getElementById('resourceList');
    if (!resourceList) return;
    
    resourceList.innerHTML = '';
    
    data.forEach(resource => {
        // 创建卡片容器
        const card = document.createElement('div');
        card.className = 'resource-card';
        
        // 创建标题
        const title = document.createElement('h3');
        title.className = 'resource-title';
        title.textContent = resource.formattedTitle;
        card.appendChild(title);
        
        // 创建底部容器
        const bottom = document.createElement('div');
        bottom.className = 'resource-bottom';
        
        // 创建网盘链接容器
        const links = document.createElement('div');
        links.className = 'resource-links';
        
        // 添加百度网盘按钮
        if (resource.hasBaidu) {
            const baiduBtn = document.createElement('a');
            baiduBtn.href = resource.baiduUrl;
            baiduBtn.className = 'resource-btn baidu-btn';
            baiduBtn.textContent = '百度网盘';
            baiduBtn.target = '_blank';
            links.appendChild(baiduBtn);
        }
        
        // 添加夸克网盘按钮
        if (resource.hasQuark) {
            const quarkBtn = document.createElement('a');
            quarkBtn.href = resource.quarkUrl;
            quarkBtn.className = 'resource-btn quark-btn';
            quarkBtn.textContent = '夸克网盘';
            quarkBtn.target = '_blank';
            links.appendChild(quarkBtn);
        }
        
        bottom.appendChild(links);
        
        // 创建操作按钮容器
        const actions = document.createElement('div');
        actions.className = 'resource-actions';
        
        // 添加复制链接按钮
        const copyBtn = document.createElement('button');
        copyBtn.className = 'action-btn copy-btn';
        copyBtn.textContent = '复制链接';
        copyBtn.addEventListener('click', () => {
            copyResourceLink(resource);
        });
        actions.appendChild(copyBtn);
        
        // 添加失效报错按钮
        const reportBtn = document.createElement('button');
        reportBtn.className = 'action-btn report-btn';
        reportBtn.textContent = '失效报错';
        reportBtn.addEventListener('click', () => {
            reportResourceIssue(resource);
        });
        actions.appendChild(reportBtn);
        
        bottom.appendChild(actions);
        card.appendChild(bottom);
        resourceList.appendChild(card);
    });
}

// 复制链接功能
function copyResourceLink(resource) {
    // 这里可以添加实际的复制逻辑
    // 暂时使用简单的提示
    alert(`已复制 ${resource.title} 的链接到剪贴板`);
    
    // 实际实现应该使用 Clipboard API:
    // navigator.clipboard.writeText(resource.baiduUrl || resource.quarkUrl)
    //     .then(() => alert('链接已复制'))
    //     .catch(err => console.error('复制失败:', err));
}

// 报错功能
function reportResourceIssue(resource) {
    const issue = prompt(`报告 ${resource.title} 的问题:\n1. 链接失效\n2. 内容错误\n3. 其他问题\n\n请描述问题:`, "链接失效");
    if (issue) {
        alert(`已提交问题报告: ${issue}\n感谢您的反馈！`);
        // 这里可以添加实际的上报逻辑
    }
}

// 搜索过滤函数
function filterResources(searchTerm) {
    if (!searchTerm.trim()) {
        return resourceData;
    }
    
    const term = searchTerm.toLowerCase();
    return resourceData.filter(resource => 
        resource.title.toLowerCase().includes(term) ||
        resource.formattedTitle.toLowerCase().includes(term) ||
        resource.category.toLowerCase().includes(term)
    );
}

// 初始化函数
function initResourceLibrary() {
    // 初始渲染所有资源卡片
    renderResourceCards(resourceData);
    
    // 搜索框事件监听
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            const filteredData = filterResources(event.target.value);
            renderResourceCards(filteredData);
        });
        
        // 搜索按钮事件监听
        const searchButton = searchInput.nextElementSibling;
        if (searchButton && searchButton.tagName === 'BUTTON') {
            searchButton.addEventListener('click', () => {
                const filteredData = filterResources(searchInput.value);
                renderResourceCards(filteredData);
            });
        }
    }
    
    // 添加键盘事件支持（按Enter键搜索）
    if (searchInput) {
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const filteredData = filterResources(searchInput.value);
                renderResourceCards(filteredData);
            }
        });
    }
}

// 当DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', initResourceLibrary);