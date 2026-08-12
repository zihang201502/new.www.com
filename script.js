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
});
