$(function () {

  const SCALE = {
    'A': 4, 'A-': 3.75,
    'B+': 3.25, 'B': 3, 'B-': 2.75,
    'C+': 2.25, 'C': 2,
    'D': 1, 'E': 0
  };

  const REPORT_NAMES = ['Ganjil', 'Genap'];
  const CURRENT = { semester: 5, report: 1 };
  const SEMESTERS = [
    [
      ['UM1101', 'Pendidikan Agama',       2, 'B',  'B+'],
      ['MA1101', 'Kalkulus I',             3, 'C',  'B-'],
      ['IF1101', 'Pengantar Informatika',  3, 'B+', 'A-'],
      ['IF1102', 'Logika Matematika',      3, 'B',  'B'],
      ['UM1102', 'Bahasa Indonesia',       2, 'A-', 'A']
    ],
    [
      ['MA1201', 'Kalkulus II',            3, 'C',  'C+'],
      ['IF1201', 'Algoritma dan Pemrograman', 4, 'B+', 'A-'],
      ['IF1202', 'Matematika Diskrit',     3, 'B',  'B+'],
      ['UM1201', 'Pendidikan Pancasila',   2, 'A',  'A']
    ],
    [
      ['IF2101', 'Struktur Data',          3, 'B+', 'B+'],
      ['IF2102', 'Basis Data',             3, 'A-', 'A'],
      ['IF2103', 'Organisasi Komputer',    3, 'C+', 'B-'],
      ['MA2101', 'Statistika',             3, 'B',  'B'],
      ['UM2101', 'Bahasa Inggris',         2, 'A',  'A']
    ],
    [
      ['IF2201', 'Pemrograman Berorientasi Objek', 4, 'B', 'B+'],
      ['IF2202', 'Sistem Operasi',         3, 'C+', 'C+'],
      ['IF2203', 'Jaringan Komputer',      3, 'B+', 'A-'],
      ['IF2204', 'Rekayasa Perangkat Lunak', 3, 'A-', 'A']
    ],
    [
      ['IF3101', 'Pemrograman Web',        3, 'A',  'A'],
      ['IF3102', 'Kecerdasan Buatan',      3, 'B',  'B+'],
      ['IF3103', 'Interaksi Manusia dan Komputer', 3, 'B+', 'A-'],
      ['IF3104', 'Keamanan Informasi',     3, 'C+', 'B-']
    ]
  ];

  function summary(courses, ri) {
    let credits = 0;
    let bobot = 0;
    let earned = 0;

    $.each(courses, function (i, c) {
      const grade = c[3 + ri];
      credits += c[2];
      bobot += SCALE[grade] * c[2];
      if (grade !== 'E') {
        earned += c[2];
      }
    });

    return { credits: credits, bobot: bobot, earned: earned };
  }

  function showReport(si, ri) {
    const courses = SEMESTERS[si];
    let rows = '';

    $.each(courses, function (i, c) {
      const grade = c[3 + ri];
      const number = SCALE[grade];

      rows += '<tr>' +
        '<td>' + (i + 1) + '</td>' +
        '<td>' + c[0] + '</td>' +
        '<td>' + c[1] + '</td>' +
        '<td>' + c[2] + '</td>' +
        '<td class="' + (number <= 1 ? 'low' : '') + '">' + grade + '</td>' +
        '<td>' + number.toFixed(2) + '</td>' +
        '<td>' + (number * c[2]).toFixed(2) + '</td>' +
        '</tr>';
    });

    const now = summary(courses, ri);

    const before = { credits: 0, bobot: 0, earned: 0 };
    for (let s = 0; s < si; s++) {
      const p = summary(SEMESTERS[s], 1);
      before.credits += p.credits;
      before.bobot += p.bobot;
      before.earned += p.earned;
    }

    $('#row').html(rows);
    $('.table-foot').html(
      '<span>Total Kredit: <b>' + now.credits + '</b></span>' +
      '<span>Total Bobot Kualitas: <b>' + now.bobot.toFixed(2) + '</b></span>'
    );

    $('#totalSks').text(now.credits);
    $('#ips').text((now.bobot / now.credits).toFixed(2));
    $('#kreditDiambil').text(before.credits + now.credits);
    $('#kreditDiperoleh').text(before.earned + now.earned);
    $('#ipk').text(((before.bobot + now.bobot) / (before.credits + now.credits)).toFixed(2));

    const index = si * 2 + ri;
    $('.pair').removeClass('active');
    $('.dot').each(function () {
      const i = $(this).data('i');
      $(this).removeClass('active done');
      if (i === index) {
        $(this).addClass('active');
        $(this).closest('.pair').addClass('active');
      } else if (i < index) {
        $(this).addClass('done');
      }
    });
    $('.view-label').text('Semester ' + (si + 1) + ' · ' + REPORT_NAMES[ri]);
  }

  const lastIndex = (CURRENT.semester - 1) * 2 + CURRENT.report;
  let line = '';

  for (let s = 0; s < 8; s++) {
    line += '<div class="pair"><div class="dots">';
    for (let r = 0; r < 2; r++) {
      const i = s * 2 + r;
      line += '<button type="button" class="dot" data-s="' + s + '" data-r="' + r + '" data-i="' + i + '"' +
        ' title="Semester ' + (s + 1) + ' - ' + REPORT_NAMES[r] + '"' +
        ' aria-label="Semester ' + (s + 1) + ' ' + REPORT_NAMES[r] + '"' +
        (i > lastIndex ? ' disabled' : '') + '></button>';
    }
    line += '</div><span class="pair-label">Smt ' + (s + 1) + '</span></div>';
  }

  $('#steps').html(line);

  $('.steps').on('click', '.dot', function () {
    showReport($(this).data('s'), $(this).data('r'));
  });

  showReport(CURRENT.semester - 1, CURRENT.report);
});