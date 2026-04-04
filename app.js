// 法学教材数据库（基于实际文件）
const libraryData = [
    {
        title: "中国法制史（第二版）",
        category: "textbook",
        format: "PDF",
        path: "library/textbook/中国法制史（第二版）.pdf"
    },
    {
        title: "刑法学 第二版 马工程 上册",
        category: "textbook",
        format: "PDF",
        path: "library/textbook/刑法学 第二版 马工程 上2023ocr.pdf"
    },
    {
        title: "民法学 第二版 马工程 上册",
        category: "textbook",
        format: "PDF",
        path: "library/textbook/马工程《民法学 第二》上册ocr.pdf"
    },
    {
        title: "民法学 第二版 马工程 下册",
        category: "textbook",
        format: "PDF",
        path: "library/textbook/马工程《民法学 第二版》下册ocr.pdf"
    }
];

// 渲染表格函数
function renderTable(data) {
    const tbody = document.getElementById('libraryBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    data.forEach(book => {
        const row = document.createElement('tr');
        
        // 教材名称
        const titleCell = document.createElement('td');
        titleCell.textContent = book.title;
        row.appendChild(titleCell);
        
        // 学科
        const categoryCell = document.createElement('td');
        categoryCell.textContent = book.category;
        row.appendChild(categoryCell);
        
        // 格式
        const formatCell = document.createElement('td');
        formatCell.textContent = book.format;
        row.appendChild(formatCell);
        
        // 操作（下载按钮）
        const actionCell = document.createElement('td');
        const downloadLink = document.createElement('a');
        downloadLink.href = book.path;
        downloadLink.textContent = '下载';
        downloadLink.className = 'download-btn';
        downloadLink.download = book.title + '.pdf';
        actionCell.appendChild(downloadLink);
        row.appendChild(actionCell);
        
        tbody.appendChild(row);
    });
}

// 搜索过滤函数
function filterBooks(searchTerm) {
    if (!searchTerm.trim()) {
        return libraryData;
    }
    
    const term = searchTerm.toLowerCase();
    return libraryData.filter(book => 
        book.title.toLowerCase().includes(term) ||
        book.category.toLowerCase().includes(term)
    );
}

// 初始化函数
function initLibrary() {
    // 初始渲染
    renderTable(libraryData);
    
    // 搜索框事件监听
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            const filteredData = filterBooks(event.target.value);
            renderTable(filteredData);
        });
    }
}

// 当DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', initLibrary);
