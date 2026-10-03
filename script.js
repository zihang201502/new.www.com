// Cumulus OS — 首页交互脚本

document.addEventListener('DOMContentLoaded', function () {

    // ===== 下载按钮点击 =====
    const downloadBtns = document.querySelectorAll('a[href*="cumulusosxz"]');
    downloadBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            console.log('Cumulus OS 跳转到下载页');
        });
    });

    // ===== 背景光晕跟随鼠标 =====
    const glow = document.querySelector('.hero .glow');
    if (glow) {
        document.addEventListener('mousemove', function (e) {
            const x = (e.clientX / window.innerWidth - 0.5) * 40;
            const y = (e.clientY / window.innerHeight - 0.5) * 40;
            glow.style.transform = 'translate(calc(-50% + ' + x + 'px), calc(-50% + ' + y + 'px))';
        });
    }

    // ===== 反馈面板展开/收起 =====
    const feedbackToggle = document.getElementById('feedbackToggle');
    const feedbackPanel = document.getElementById('feedbackPanel');
    if (feedbackToggle && feedbackPanel) {
        feedbackToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            feedbackPanel.classList.toggle('active');
        });
        document.addEventListener('click', function (e) {
            if (!feedbackPanel.contains(e.target) && e.target !== feedbackToggle) {
                feedbackPanel.classList.remove('active');
            }
        });
    }

    // ===== 复制微信号（反馈面板 + 关于我们通用） =====
    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    const copyBtns = document.querySelectorAll('.wx-copy');
    copyBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const parent = btn.parentElement;
            const idEl = parent.querySelector('.wx-id');
            let wxId = null;
            if (idEl) {
                wxId = idEl.getAttribute('data-wx') || idEl.textContent.trim();
            } else {
                wxId = parent.getAttribute('data-wx');
            }
            if (!wxId) return;

            const showDone = function () {
                btn.textContent = '已复制';
                btn.classList.add('copied');
                setTimeout(function () {
                    btn.textContent = '复制';
                    btn.classList.remove('copied');
                }, 2000);
            };

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(wxId).then(showDone).catch(function () {
                    fallbackCopy(wxId);
                    showDone();
                });
            } else {
                fallbackCopy(wxId);
                showDone();
            }
        });
    });

    // ===== 打赏码放大灯箱 =====
    const donateQr = document.getElementById('donateQr');
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightboxClose');

    function openLightbox() {
        if (lightbox) {
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (donateQr) donateQr.addEventListener('click', openLightbox);
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) closeLightbox();
        });
    }
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // ===== 滚动时导航高亮切换 =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links .nav-link');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    navLinks.forEach(function (l) { l.classList.remove('active'); });
                    const match = document.querySelector('.nav-links .nav-link[href="#' + entry.target.id + '"]');
                    if (match) match.classList.add('active');
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        sections.forEach(function (s) { observer.observe(s); });
    }
});
