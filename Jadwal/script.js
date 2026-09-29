$(function () {
  const COLORS = { blue: '#2563eb', amber: '#f79009', purple: '#7c3aed', teal: '#0f766e' };
  const STATUSES = ['All', 'Confirmed', 'High priority', 'Draft', 'Weekly'];
  const ICON = {
    cal: '<svg viewBox="0 0 24 24"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2z"/></svg>',
    user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    edit: '<svg viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
    del: '<svg viewBox="0 0 24 24"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>'
  };
  const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const pad = n => String(n).padStart(2, '0');
  const iso = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const parse = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const shift = n => { const d = new Date(); d.setDate(d.getDate() + n); return iso(d); };
  const fmtTime = t => { const [h, m] = t.split(':').map(Number); return ((h % 12) || 12) + ':' + pad(m) + ' ' + (h < 12 ? 'AM' : 'PM'); };
  const fmtDate = s => parse(s).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const esc = s => $('<div>').text(s == null ? '' : s).html();

  const TODAY = iso(new Date());
  let events = [
    { id: 1, title: 'Client onboarding', date: TODAY, time: '09:00', status: 'Confirmed', color: 'blue', owner: 'Ava Carter', desc: 'Review the kickoff deck, confirm the project scope, and assign the first milestone.' },
    { id: 2, title: 'Design review', date: TODAY, time: '11:30', status: 'High priority', color: 'amber', owner: 'Marcus Lee', desc: 'Walk through the updated dashboard wireframes and finalize the navigation flow.' },
    { id: 3, title: 'Content planning', date: TODAY, time: '14:00', status: 'Draft', color: 'purple', owner: 'Priya Shah', desc: 'Outline the next three blog posts and assign writing deadlines for the editorial team.' },
    { id: 4, title: 'Weekly sync', date: TODAY, time: '16:30', status: 'Weekly', color: 'teal', owner: 'Team all-hands', desc: 'Review blockers, share progress, and align the team on the next sprint.' },
    { id: 5, title: 'Launch checklist', date: shift(2), time: '10:00', status: 'High priority', color: 'amber', owner: 'Marcus Lee', desc: 'Final QA pass and sign-off before the release.' },
    { id: 6, title: 'Weekly sync', date: shift(7), time: '16:30', status: 'Weekly', color: 'teal', owner: 'Team all-hands', desc: 'Review blockers, share progress, and align the team on the next sprint.' },
    { id: 7, title: 'Client demo', date: shift(-3), time: '13:00', status: 'Confirmed', color: 'blue', owner: 'Ava Carter', desc: 'Walk the client through the latest build.' }
  ];

  let selected = TODAY, anchor = new Date(), mode = 'month', query = '', filter = 'All';

  const matches = e => (filter === 'All' || e.status === filter) &&
    (!query || (e.title + ' ' + e.desc + ' ' + e.owner).toLowerCase().includes(query));
  const sorted = list => list.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  const badgeClass = s => 'b-' + s.split(' ')[0];

  function renderList() {
    let list = events.filter(matches);
    const searching = !!query;
    list = searching ? sorted(list) : sorted(list.filter(e => e.date === selected));
    $('#listTitle').text(searching ? 'Search results' : selected === TODAY ? "Today's activities" : fmtDate(selected));
    if (!list.length) {
      $('#list').html('<div class="empty">' + (searching ? 'No activities match your search.' : 'Nothing scheduled for this day') + '</div>');
      return;
    }
    $('#list').html(list.map(e => `
      <article class="item" data-id="${e.id}">
        <div class="item-top">
          <div class="item-main">
            <div class="tile" style="background:${COLORS[e.color]}">${ICON.cal}</div>
            <div><div class="item-title">${esc(e.title)}</div>
            <div class="item-time">${searching ? fmtDate(e.date) + ' · ' : ''}${fmtTime(e.time)}</div></div>
          </div>
          <div class="item-side">
            <span class="badge ${badgeClass(e.status)}">${esc(e.status)}</span>
          </div>
        </div>
        <p class="item-desc">${esc(e.desc)}</p>
        <div class="owner"><span class="avatar">${ICON.user}</span>${esc(e.owner || 'Unassigned')}</div>
      </article>`).join(''));
  }

  function renderCalendar() {
    const cells = [];
    let start, count;
    if (mode === 'month') {
      const first = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
      start = new Date(first); start.setDate(1 - first.getDay());
      count = Math.ceil((first.getDay() + new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate()) / 7) * 7;
      $('#calTitle').text(first.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
    } else {
      start = new Date(anchor); start.setDate(anchor.getDate() - anchor.getDay()); count = 7;
      const end = new Date(start); end.setDate(start.getDate() + 6);
      const f = d => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      $('#calTitle').text(f(start) + ' – ' + f(end) + ', ' + end.getFullYear());
    }
    for (let i = 0; i < count; i++) {
      const d = new Date(start); d.setDate(start.getDate() + i);
      const key = iso(d);
      const evs = sorted(events.filter(e => matches(e) && e.date === key));
      const max = mode === 'week' ? 12 : 2;
      cells.push(`<div class="day${d.getMonth() !== anchor.getMonth() && mode === 'month' ? ' out' : ''}${key === TODAY ? ' today' : ''}${key === selected ? ' sel' : ''}" data-date="${key}">
        <span class="num">${d.getDate()}</span>
        ${evs.slice(0, max).map(e => `<div class="chip" title="${esc(e.title)}"><i style="background:${COLORS[e.color]}"></i>${esc(e.title)}</div>`).join('')}
        ${evs.length > max ? `<div class="more">+${evs.length - max} more</div>` : ''}</div>`);
    }
    $('#grid').toggleClass('week', mode === 'week').html(cells.join(''));
  }

  const render = () => { renderList(); renderCalendar(); };

  function move(dir) {
    if (mode === 'month') anchor = new Date(anchor.getFullYear(), anchor.getMonth() + dir, 1);
    else anchor.setDate(anchor.getDate() + 7 * dir);
    renderCalendar();
  }
  $('#dow').html(DOW.map(d => `<div>${d}</div>`).join(''));
  $('#prev').on('click', () => move(-1));
  $('#next').on('click', () => move(1));
  $('#todayBtn').on('click', () => { anchor = new Date(); selected = TODAY; render(); });
  $('#grid').on('click', '.day', function () {
    selected = $(this).data('date');
    anchor = parse(selected);
    $('#search').val(''); query = '';
    render();
  });

  $('#viewBtn').on('click', function () {
    mode = mode === 'month' ? 'week' : 'month';
    anchor = parse(selected);
    $(this).find('span').text(mode === 'month' ? 'Month view' : 'Week view');
    renderCalendar();
  });

  $('#search').on('input', function () { query = $.trim(this.value).toLowerCase(); render(); });

  function renderMenu() {
    $('#filterMenu').html(STATUSES.map(s => `<li data-s="${s}" class="${s === filter ? 'on' : ''}">${s}</li>`).join(''));
    $('#filterLabel').text(filter === 'All' ? 'Filter' : filter);
  }
  $('#filterBtn').on('click', e => { e.stopPropagation(); $('#filterMenu').prop('hidden', (_, v) => !v); });
  $('#filterMenu').on('click', 'li', function () { filter = $(this).data('s'); renderMenu(); $('#filterMenu').prop('hidden', true); render(); });
  $(document).on('click', () => $('#filterMenu').prop('hidden', true));

  const $form = $('#form');

  const closeModal = () => $('#modal').prop('hidden', true);
  $('#addBtn').on('click', () => openModal());
  $('#cancel').on('click', closeModal);
  $('#modal').on('click', e => { if (e.target === e.currentTarget) closeModal(); });
  $(document).on('keydown', e => { if (e.key === 'Escape') closeModal(); });
  $form.on('submit', function (e) {
    e.preventDefault();
    const data = {};
    $.each($form.serializeArray(), (_, f) => data[f.name] = $.trim(f.value));
    if (editingId) $.extend(events.find(x => x.id === editingId), data);
    else events.push($.extend({ id: nextId++ }, data));
    selected = data.date; anchor = parse(selected);
    closeModal(); render();
  });

  renderMenu();
  render();
});

$('.brand-logo').on('click', function () {
  const $img = $(this).find('img');

  if (!$img.data('src')) {
    $img.data('src', $img.attr('src'));
  }

  $img.attr('src', $img.data('src') + '?t=' + Date.now());
});