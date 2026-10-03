$(function () {

  const SCALE = {
    'A': 4, 'A-': 3.75,
    'B+': 3.25, 'B': 3, 'B-': 2.75,
    'C+': 2.25, 'C': 2,
    'D': 1, 'E': 0
  };

  const GRADE_IDX = 4;

  const SEMESTERS = [
    {
      courses: [
        ['UM1101', 'Pendidikan Agama', 2, 'B',  'B+'],
        ['MA1101', 'Kalkulus I', 3, 'C', 'B-'],
        ['IF1101', 'Pengantar Informatika', 3, 'B+', 'A-'],
        ['IF1102', 'Logika Matematika', 3, 'B', 'B'],
        ['UM1102', 'Bahasa Indonesia', 2, 'A-', 'A'],
        ['MA1201', 'Kalkulus II', 3, 'C', 'C+'],
        ['IF1201', 'Algoritma dan Pemrograman', 4, 'B+', 'A-'],
        ['IF1202', 'Matematika Diskrit', 3, 'B', 'B+'],
        ['UM1201', 'Pendidikan Pancasila', 2, 'A', 'A'],
        ['IF2101', 'Struktur Data', 3, 'B+', 'B+'],
        ['IF2102', 'Basis Data', 3, 'A-', 'A'],
        ['IF2103', 'Organisasi Komputer', 3, 'C+', 'B-'],
        ['MA2101', 'Statistika', 3, 'B', 'B'],
        ['UM2101', 'Bahasa Inggris', 2, 'A',  'A'],
        ['IF2201', 'Pemrograman Berorientasi Objek', 4, 'B',  'B+'],
        ['IF2202', 'Sistem Operasi', 3, 'C+', 'C+'],
        ['IF2203', 'Jaringan Komputer', 3, 'B+', 'A-'],
        ['IF2204', 'Rekayasa Perangkat Lunak', 3, 'A-', 'A'],
        ['IF3101', 'Pemrograman Web', 3, 'A', 'A'],
        ['IF3102', 'Kecerdasan Buatan', 3, 'B', 'B+'],
        ['IF3103', 'Interaksi Manusia dan Komputer', 3, 'B+', 'A-'],
        ['IF3104', 'Keamanan Informasi', 3, 'C+', 'B-'],
      ]
    }
  ];

  let globalNo   = 1;
  let totalSKS   = 0;
  let totalBobot = 0;
  let totalEarned = 0;
  let rows = '';

  $.each(SEMESTERS, function (si, sem) {
    rows += '<tr class="sem-header">' +
      '<td colspan="7">' + sem.label + '</td>' +
      '</tr>';

    let semSKS   = 0;
    let semBobot = 0;
    let semEarned = 0;

    $.each(sem.courses, function (ci, c) {
      const grade  = c[GRADE_IDX];
      const weight = SCALE[grade];
      const mutu   = weight * c[2];

      semSKS    += c[2];
      semBobot  += mutu;
      if (grade !== 'E') semEarned += c[2];

      rows += '<tr>' +
        '<td>' + globalNo++ + '</td>' +
        '<td>' + c[0] + '</td>' +
        '<td>' + c[1] + '</td>' +
        '<td class="center">' + c[2] + '</td>' +
        '<td class="center ' + (weight <= 1 ? 'low' : '') + '">' + grade + '</td>' +
        '<td class="center">' + weight.toFixed(2) + '</td>' +
        '<td class="center">' + mutu.toFixed(2) + '</td>' +
        '</tr>';
    });

    const semIPS = semSKS > 0 ? (semBobot / semSKS).toFixed(2) : '–';
    rows += '<tr class="sem-subtotal">' +
      '<td colspan="3">Subtotal ' + sem.label + '</td>' +
      '<td class="center">' + semSKS + '</td>' +
      '<td class="center">IPS: ' + semIPS + '</td>' +
      '<td colspan="2" class="center">' + semBobot.toFixed(2) + '</td>' +
      '</tr>';

    totalSKS    += semSKS;
    totalBobot  += semBobot;
    totalEarned += semEarned;
  });

  $('#row').html(rows);

  const ipk = totalSKS > 0 ? (totalBobot / totalSKS).toFixed(2) : '–';
  $('#kreditDiambil').text(totalSKS);
  $('#kreditDiperoleh').text(totalEarned);
  $('#ipk').text(ipk);
});
