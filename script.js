// Cumulus OS — 交互脚本

document.addEventListener('DOMContentLoaded', function () {
    // 鼠标跟随光晕效果
    const glow = document.querySelector('.glow');
    if (glow) {
        document.addEventListener('mousemove', function (e) {
            const x = e.clientX;
            const y = e.clientY;
            glow.style.transform = `translate(calc(-50% + ${x - window.innerWidth / 2}px * 0.05), calc(-50% + ${y - window.innerHeight / 2}px * 0.05))`;
        });
    }

    // 下载按钮点击反馈
    const downloadBtns = document.querySelectorAll('.nav-download, .cta-download');
    downloadBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            // 可在此处添加统计或提示逻辑
            console.log('Cumulus OS 下载链接已触发');
        });
    });

    // 反馈面板展开/收起
    const feedbackToggle = document.getElementById('feedbackToggle');
    const feedbackPanel = document.getElementById('feedbackPanel');
    if (feedbackToggle && feedbackPanel) {
        feedbackToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            feedbackPanel.classList.toggle('active');
        });
        // 点击外部关闭
        document.addEventListener('click', function (e) {
            if (!feedbackPanel.contains(e.target) && e.target !== feedbackToggle) {
                feedbackPanel.classList.remove('active');
            }
        });
    }

    // 复制微信号
    const wechatItems = document.querySelectorAll('.wechat-item');
    wechatItems.forEach(function (item) {
        const copyBtn = item.querySelector('.wx-copy');
        const wxId = item.getAttribute('data-wx');
        if (copyBtn && wxId) {
            copyBtn.addEventListener('click', function () {
                navigator.clipboard.writeText(wxId).then(function () {
                    copyBtn.textContent = '已复制';
                    copyBtn.classList.add('copied');
                    setTimeout(function () {
                        copyBtn.textContent = '复制';
                        copyBtn.classList.remove('copied');
                    }, 2000);
                }).catch(function () {
                    // 降级方案
                    const textarea = document.createElement('textarea');
                    textarea.value = wxId;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                    copyBtn.textContent = '已复制';
                    copyBtn.classList.add('copied');
                    setTimeout(function () {
                        copyBtn.textContent = '复制';
                        copyBtn.classList.remove('copied');
                    }, 2000);
                });
            });
        }
    });
});
