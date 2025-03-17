// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const textInput = document.getElementById('textInput');
    const generateBtn = document.getElementById('generateBtn');
    const imageOutput = document.getElementById('imageOutput');
    
    // 添加生成按钮点击事件
    generateBtn.addEventListener('click', generateImage);
    
    // 添加输入框回车事件
    textInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateImage();
        }
    });
    
    // 生成图像的函数
    function generateImage() {
        const text = textInput.value.trim();
        
        if (!text) {
            alert('请输入描述文本');
            return;
        }
        
        // 显示加载状态
        imageOutput.innerHTML = `
            <div class="loading">
                <p>正在生成图像...</p>
                <div class="spinner"></div>
                <p class="prompt">"${text}"</p>
            </div>
        `;
        
        // 模拟API调用延迟
        setTimeout(() => {
            // 在实际应用中，这里应该是调用后端API
            console.log('生成图像的文本:', text);
            
            // 模拟生成结果 - 随机颜色的矩形
            const randomColor = getRandomColor();
            imageOutput.innerHTML = `
                <div style="width: 100%; height: 100%; background-color: ${randomColor}; 
                            display: flex; justify-content: center; align-items: center; color: white;">
                    <div style="text-align: center; padding: 20px;">
                        <p style="font-weight: bold; font-size: 1.2rem;">根据文本生成的图像</p>
                        <p>"${text}"</p>
                    </div>
                </div>
            `;
        }, 1500);
    }
    
    // 生成随机颜色
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}); 