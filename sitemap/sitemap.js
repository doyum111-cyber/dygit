/* ===== 오늘 날짜 ===== */
const today = new Date();
document.getElementById('today-date').textContent =
  `${String(today.getFullYear()).slice(2)}.${today.getMonth()+1}.${today.getDate()}`;

/* ===== 연도 탭 ===== */
const tabs = document.querySelectorAll('.year-tab');
const sections = document.querySelectorAll('.section');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(`section-${tab.dataset.year}`).classList.add('active');
  });
});

/* ===== 카드 토글 ===== */
document.querySelectorAll('.project-head').forEach(head => {
  head.addEventListener('click', () => {
    head.closest('.project-card').classList.toggle('open');
  });
});

/* ===== 프로젝트 수 카운트 ===== */
['2026', '2025', 'logo'].forEach(year => {
  const count = document.querySelectorAll(`#list-${year} .project-card`).length;
  const el = document.getElementById(`count-${year}`);
  if (el) el.textContent = `${count} projects`;
});

/* ===== 필터 & 검색 ===== */
document.querySelectorAll('.filter-bar').forEach(bar => {
  const btns = bar.querySelectorAll('.filter-btn');
  const search = bar.querySelector('.filter-search');
  const list = bar.nextElementSibling;

  function applyFilter() {
    const active = bar.querySelector('.filter-btn.active');
    const filterVal = active ? active.dataset.filter : 'all';
    const searchVal = search ? search.value.trim().toLowerCase() : '';

    list.querySelectorAll('.project-card').forEach(card => {
      const device = card.dataset.device || '';
      const name = card.querySelector('.project-name').textContent.toLowerCase();

      const deviceMatch = filterVal === 'all' || device.includes(filterVal);
      const searchMatch = !searchVal || name.includes(searchVal);

      card.style.display = (deviceMatch && searchMatch) ? '' : 'none';
    });
  }

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter();
    });
  });

  if (search) {
    search.addEventListener('input', applyFilter);
  }
});
