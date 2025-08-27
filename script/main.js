document.addEventListener("DOMContentLoaded", () => {
  const role = "访客";
  renderNavbar(role);

  // 轮播背景初始化
  let current = 1;
  const bg1 = document.querySelector('.banner-bg1');
  const bg2 = document.querySelector('.banner-bg2');

  setInterval(() => {
    if (current === 1) {
      bg1.style.opacity = 0;
      bg2.style.opacity = 1;
      current = 2;
    } else {
      bg1.style.opacity = 1;
      bg2.style.opacity = 0;
      current = 1;
    }
  }, 5000);

  // 绑定导航滚动高亮和点击滚动逻辑
  const navLinks = document.querySelectorAll('#navbar a');
  const sections = [...document.querySelectorAll('main section.content-section')];

  // 滚动时高亮当前区块对应链接
  window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + 70; // 固定头部高度偏移
    sections.forEach((section, index) => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if(navLinks[index]) navLinks[index].classList.add('active');
      }
    });
  });

  // 点击导航平滑滚动到对应区块
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.slice(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const top = targetEl.offsetTop - 60; // 头部高度补偿
          window.scrollTo({ top, behavior: 'smooth' });
        }
      } else {
        // href非锚点时正常跳转
        window.location.href = href;
      }
    });
  });
});

function renderNavbar(role) {
  const nav = document.getElementById("navbar");
  // 这里 href 用对应区块id锚点，首页除外
  const links = [
    { text: "首页", href: "index.html" },
    { text: "集团介绍", href: "#about" },
    { text: "业务板块", href: "#services" },
    { text: "新闻动态", href: "#news" },
    { text: "联系我们", href: "#contact" }
  ];
  nav.innerHTML = links.map(link =>
    `<a href="${link.href}">${link.text}</a>`
  ).join('');
}
