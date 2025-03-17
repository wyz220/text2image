// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const textInput = document.getElementById('textInput');
    const generateBtn = document.getElementById('generateBtn');
    const imageOutput = document.getElementById('imageOutput');
    const highQualityCheckbox = document.getElementById('highQuality');
    const styleSelect = document.getElementById('styleSelect');
    const recentItems = document.getElementById('recentItems');
    
    // 存储历史记录
    let generationHistory = [];
    
    // 初始化页面
    initPage();
    
    // 添加生成按钮点击事件
    generateBtn.addEventListener('click', generateImage);
    
    // 添加输入框回车事件
    textInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateImage();
        }
    });
    
    // 添加输入框焦点事件
    textInput.addEventListener('focus', function() {
        this.parentElement.parentElement.classList.add('active');
    });
    
    textInput.addEventListener('blur', function() {
        if (!this.value.trim()) {
            this.parentElement.parentElement.classList.remove('active');
        }
    });
    
    // 添加样式选择事件
    styleSelect.addEventListener('change', function() {
        console.log('选择的样式:', this.value);
    });
    
    // 添加高质量选项事件
    highQualityCheckbox.addEventListener('change', function() {
        console.log('高质量模式:', this.checked);
    });
    
    // 初始化页面
    function initPage() {
        // 添加输入框动画效果
        if (textInput.value.trim()) {
            textInput.parentElement.parentElement.classList.add('active');
        }
        
        // 添加欢迎动画
        imageOutput.innerHTML = `
            <div style="text-align: center; padding: 20px; opacity: 0; transform: translateY(20px);" id="welcome-message">
                <p style="font-size: 1.5rem; margin-bottom: 15px; color: var(--primary-color);">欢迎使用文本转图像工具</p>
                <p style="color: #666;">在下方输入描述文本，点击生成按钮即可创建图像</p>
                <div style="margin-top: 30px;">
                    <i class="fas fa-arrow-down" style="font-size: 2rem; color: var(--accent-color); animation: bounce 2s infinite;"></i>
                </div>
            </div>
        `;
        
        // 淡入欢迎信息
        setTimeout(() => {
            const welcomeMsg = document.getElementById('welcome-message');
            if (welcomeMsg) {
                welcomeMsg.style.transition = 'all 0.8s ease';
                welcomeMsg.style.opacity = '1';
                welcomeMsg.style.transform = 'translateY(0)';
            }
        }, 300);
        
        // 添加CSS动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {
                    transform: translateY(0);
                }
                40% {
                    transform: translateY(-20px);
                }
                60% {
                    transform: translateY(-10px);
                }
            }
        `;
        document.head.appendChild(style);
        
        // 加载历史记录
        loadHistory();
    }
    
    // 生成图像的函数
    function generateImage() {
        const text = textInput.value.trim();
        
        if (!text) {
            // 添加抖动动画
            textInput.classList.add('shake');
            setTimeout(() => textInput.classList.remove('shake'), 600);
            
            // 显示提示
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = '请输入描述文本';
            textInput.parentElement.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.classList.add('show');
                setTimeout(() => {
                    tooltip.classList.remove('show');
                    setTimeout(() => tooltip.remove(), 300);
                }, 2000);
            }, 10);
            
            return;
        }
        
        // 获取选项
        const isHighQuality = highQualityCheckbox.checked;
        const selectedStyle = styleSelect.value;
        
        // 禁用按钮，显示加载状态
        generateBtn.disabled = true;
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span class="btn-text">生成中...</span>';
        
        // 显示加载状态
        imageOutput.innerHTML = `
            <div class="loading">
                <p>正在生成图像...</p>
                <div class="spinner"></div>
                <p class="prompt">"${text}"</p>
                <p style="margin-top: 10px; font-size: 0.9rem; color: #777;">
                    ${isHighQuality ? '高质量模式' : '标准模式'} | 风格: ${getStyleName(selectedStyle)}
                </p>
            </div>
        `;
        
        // 模拟API调用延迟
        setTimeout(() => {
            // 在实际应用中，这里应该是调用后端API
            console.log('生成图像的文本:', text);
            console.log('选项:', { isHighQuality, selectedStyle });
            
            // 模拟生成结果 - 随机颜色的渐变背景
            const gradientColors = generateRandomGradient(selectedStyle);
            
            // 创建图像元素
            imageOutput.innerHTML = `
                <div class="generated-image" style="background: ${gradientColors};">
                    <div class="generated-image-content">
                        <p style="font-weight: bold; font-size: 1.3rem; margin-bottom: 10px;">根据文本生成的图像</p>
                        <p>"${text}"</p>
                        <div style="margin-top: 15px; font-size: 0.8rem; opacity: 0.8;">
                            ${isHighQuality ? '<i class="fas fa-star"></i> 高质量' : '标准质量'} | ${getStyleName(selectedStyle)}
                        </div>
                    </div>
                </div>
            `;
            
            // 恢复按钮状态
            generateBtn.disabled = false;
            generateBtn.innerHTML = '<i class="fas fa-wand-magic-sparkles"></i><span class="btn-text">生成图像</span>';
            
            // 添加历史记录
            addToHistory(text, gradientColors, selectedStyle);
            
        }, isHighQuality ? 3000 : 2000); // 高质量模式模拟更长的处理时间
    }
    
    // 获取风格名称
    function getStyleName(styleValue) {
        const styles = {
            'default': '默认风格',
            'abstract': '抽象艺术',
            'realistic': '写实风格',
            'cartoon': '卡通风格'
        };
        return styles[styleValue] || '默认风格';
    }
    
    // 生成随机渐变色
    function generateRandomGradient(style) {
        let color1, color2, angle;
        
        // 根据不同风格生成不同的颜色方案
        switch(style) {
            case 'abstract':
                color1 = getRandomColor(true);
                color2 = getRandomColor(true);
                angle = Math.floor(Math.random() * 360);
                return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
                
            case 'realistic':
                // 写实风格使用更柔和的颜色
                color1 = getRandomSoftColor();
                color2 = getRandomSoftColor();
                return `linear-gradient(to right, ${color1}, ${color2})`;
                
            case 'cartoon':
                // 卡通风格使用更鲜艳的颜色
                color1 = getRandomVibrantColor();
                color2 = getRandomVibrantColor();
                return `linear-gradient(to bottom right, ${color1}, ${color2})`;
                
            default:
                color1 = getRandomColor();
                color2 = getRandomColor();
                angle = Math.floor(Math.random() * 360);
                return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
        }
    }
    
    // 生成随机颜色
    function getRandomColor(bright = false) {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    // 生成柔和的颜色
    function getRandomSoftColor() {
        const h = Math.floor(Math.random() * 360);
        const s = Math.floor(Math.random() * 30) + 20; // 20-50%
        const l = Math.floor(Math.random() * 20) + 60; // 60-80%
        return `hsl(${h}, ${s}%, ${l}%)`;
    }
    
    // 生成鲜艳的颜色
    function getRandomVibrantColor() {
        const h = Math.floor(Math.random() * 360);
        const s = Math.floor(Math.random() * 20) + 80; // 80-100%
        const l = Math.floor(Math.random() * 20) + 50; // 50-70%
        return `hsl(${h}, ${s}%, ${l}%)`;
    }
    
    // 添加到历史记录
    function addToHistory(text, gradient, style) {
        // 创建历史记录对象
        const historyItem = {
            id: Date.now(),
            text: text,
            gradient: gradient,
            style: style,
            timestamp: new Date().toISOString()
        };
        
        // 添加到历史记录数组
        generationHistory.unshift(historyItem);
        
        // 限制历史记录数量
        if (generationHistory.length > 12) {
            generationHistory = generationHistory.slice(0, 12);
        }
        
        // 保存到本地存储
        saveHistory();
        
        // 更新UI
        updateHistoryUI();
    }
    
    // 保存历史记录到本地存储
    function saveHistory() {
        try {
            localStorage.setItem('generationHistory', JSON.stringify(generationHistory));
        } catch (e) {
            console.error('保存历史记录失败:', e);
        }
    }
    
    // 从本地存储加载历史记录
    function loadHistory() {
        try {
            const savedHistory = localStorage.getItem('generationHistory');
            if (savedHistory) {
                generationHistory = JSON.parse(savedHistory);
                updateHistoryUI();
            }
        } catch (e) {
            console.error('加载历史记录失败:', e);
        }
    }
    
    // 更新历史记录UI
    function updateHistoryUI() {
        if (!recentItems) return;
        
        // 清空现有内容
        recentItems.innerHTML = '';
        
        // 如果没有历史记录
        if (generationHistory.length === 0) {
            recentItems.innerHTML = '<p style="color: #777; font-style: italic;">暂无生成记录</p>';
            return;
        }
        
        // 添加历史记录项
        generationHistory.forEach(item => {
            const historyItemEl = document.createElement('div');
            historyItemEl.className = 'recent-item';
            historyItemEl.style.background = item.gradient;
            historyItemEl.innerHTML = `<div class="recent-item-text">${item.text}</div>`;
            
            // 点击历史记录项时加载该项
            historyItemEl.addEventListener('click', () => {
                textInput.value = item.text;
                textInput.parentElement.parentElement.classList.add('active');
                
                // 设置相应的样式
                if (item.style) {
                    styleSelect.value = item.style;
                }
                
                // 滚动到顶部
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            recentItems.appendChild(historyItemEl);
        });
    }
    
    // 添加CSS样式
    const style = document.createElement('style');
    style.textContent = `
        .shake {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        @keyframes shake {
            10%, 90% { transform: translate3d(-1px, 0, 0); }
            20%, 80% { transform: translate3d(2px, 0, 0); }
            30%, 50%, 70% { transform: translate3d(-3px, 0, 0); }
            40%, 60% { transform: translate3d(3px, 0, 0); }
        }
        
        .tooltip {
            position: absolute;
            bottom: -40px;
            left: 50%;
            transform: translateX(-50%) translateY(10px);
            background-color: #ff4757;
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 14px;
            opacity: 0;
            transition: all 0.3s ease;
            pointer-events: none;
            white-space: nowrap;
            z-index: 100;
        }
        
        .tooltip::before {
            content: '';
            position: absolute;
            top: -6px;
            left: 50%;
            transform: translateX(-50%);
            border-width: 0 6px 6px 6px;
            border-style: solid;
            border-color: transparent transparent #ff4757 transparent;
        }
        
        .tooltip.show {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        
        .form-group.active label {
            color: var(--primary-color);
            transform: translateY(-5px);
            transition: all 0.3s ease;
        }
        
        .btn-text {
            position: relative;
            z-index: 2;
        }
    `;
    document.head.appendChild(style);
}); 