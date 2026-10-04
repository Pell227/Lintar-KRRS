$(function () {

  const PALETTE = ['#2563eb', '#f79009', '#7c3aed', '#0f766e', '#d92d20',
                   '#0891b2', '#c11574', '#4d7c0f', '#a16207', '#475467'];

  const DAY_NUMBER = { Minggu: 0, Senin: 1, Selasa: 2, Rabu: 3, Kamis: 4, Jumat: 5, Sabtu: 6 };
  const MONTHS = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
  const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const ICON = {
    cal: '<svg viewBox="0 0 24 24"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2z"/></svg>',
    room: '<svg viewBox="0 0 24 24"><path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>'
  };

  const COURSE_ICON = {
  IF101: 'fa-code',
  IF102: 'fa-sitemap',
  IF103: 'fa-database',
  IF104: 'fa-globe',
  IF105: 'fa-computer',
  IF106: 'fa-brands fa-windows',
  IF107: 'fa-brands fa-google-play',
  IF108: 'fa-brain',
  IF109: 'fa-scale-balanced',
  IF110: 'fa-language'
};

  const pad = n => String(n).padStart(2, '0');
  const iso = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const parse = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const fmtDate = s => parse(s).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const esc = s => $('<div>').text(s == null ? '' : s).html();

  function parseJadwal(text) {
    const parts = text.split(',');
    const time = parts[1].trim();
    return { day: DAY_NUMBER[parts[0].trim()], time: time, start: time.split('-')[0].trim() };
  }

  const courses = krrsCourses.map(function (c, i) {
    const j = parseJadwal(c.jadwal);
    return {
      code: c.code, name: c.name, sks: c.sks, kelas: c.kelas, ruang: c.ruang, jadwal: c.jadwal,
      day: j.day, time: j.time, start: j.start,
      color: PALETTE[i % PALETTE.length],
      icon: COURSE_ICON[c.code] || 'fa-book'
    };
  });

  function parseTanggal(text) {
    const p = text.trim().split(' ');
    return new Date(Number(p[2]), MONTHS[p[1]], Number(p[0]));
  }

  const periods = [];
  $.each(dataKalenderAkademik.kalenderAkademik, function (i, k) {
    if (k.kategori !== 'Perkuliahan') {
      return;
    }
    const range = k.tanggal.split(' s/d ');
    periods.push({ from: parseTanggal(range[0]), to: parseTanggal(range[range.length - 1]) });
  });

  function inPeriod(d) {
    if (periods.length === 0) {
      return true;
    }
    return periods.some(function (p) { return d >= p.from && d <= p.to; });
  }

  const TODAY = iso(new Date());
  let selected = TODAY, anchor = new Date(), mode = 'month', query = '';

  const matches = c => !query || (c.name + ' ' + c.code + ' ' + c.ruang + ' ' + c.jadwal).toLowerCase().includes(query);
  const byTime = (a, b) => ((a.day || 7) + a.start).localeCompare((b.day || 7) + b.start);

  function coursesOn(d) {
    if (!inPeriod(d)) {
      return [];
    }
    return courses.filter(function (c) { return c.day === d.getDay() && matches(c); }).sort(byTime);
  }

  function renderList() {
    const list = courses.filter(matches).sort(byTime);
    const onDay = coursesOn(parse(selected)).map(function (c) { return c.code; });

    $('#listTitle').text(query ? 'Hasil pencarian' : 'Jadwal Mata Kuliah');
    $('#listNote').text('Kuliah pada ' + fmtDate(selected) + ': ' +
      (onDay.length ? onDay.length + ' mata kuliah (ditandai)' : 'tidak ada'));

    $('#list').toggleClass('filtering', onDay.length > 0);
    if (!list.length) {
      $('#list').html('<div class="empty">Tidak ada mata kuliah yang cocok.</div>');
      return;
    }

    $('#list').html(list.map(c => `
          <article class="item course${onDay.includes(c.code) ? ' hl' : ''}" style="--c:${c.color}"><div class="item-top">
          <div class="item-main">
            <div class="tile""><i class="fa-solid ${c.icon}"></i></div>
            <div><div class="item-title">${esc(c.name)}</div>
            <div class="item-time">${esc(c.jadwal)}</div></div>
          </div>
          <div class="item-side">
            <span class="badge"">${esc(c.code)}</span>
          </div>
        </div>
        <div class="room">${ICON.room}${esc(c.ruang)} · ${c.sks} SKS · Kelas ${esc(c.kelas)}</div>
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
      const evs = coursesOn(d);
      const max = mode === 'week' ? 12 : 3;

      const chips = evs.slice(0, max).map(c => `<div class="chip" style="background:${c.color}" title="${esc(c.name)} · ${esc(c.time)} · ${esc(c.ruang)}">
          <i style="background:${c.color}"></i>
          <span>${esc(c.name)}${mode === 'week' ? `<small>${esc(c.time)} · ${esc(c.ruang)}</small>` : ''}</span></div>`).join('');

      cells.push(`<div class="day${d.getMonth() !== anchor.getMonth() && mode === 'month' ? ' out' : ''}${key === TODAY ? ' today' : ''}${key === selected ? ' sel' : ''}" data-date="${key}">
        <span class="num">${d.getDate()}</span>
        ${chips}
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
    render();
  });

  $('#viewBtn').on('click', function () {
    mode = mode === 'month' ? 'week' : 'month';
    anchor = parse(selected);
    $(this).find('span').text(mode === 'month' ? 'Month view' : 'Week view');
    renderCalendar();
  });

  $('#search').on('input', function () { query = this.value.trim().toLowerCase(); render(); });

  $('.brand-logo').on('click', function () {
    const $img = $(this).find('img');

    if (!$img.data('src')) {
      $img.data('src', $img.attr('src'));
    }

    $img.attr('src', $img.data('src') + '?t=' + Date.now());
  });

  render();
});