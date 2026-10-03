$(function () {

  function findCourse(code) {
  return COURSES.find(function (c) { return c.code === code; });
}

const course = findCourse(g.code);
if (!course) return;

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

  const lastSem = CURRENT.semester - 1;

  function showSemester(si) {
    const courses = SEMESTERS[si];

    const ri = (si === lastSem) ? CURRENT.report : 1;
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

    $('.pair').removeClass('active');
    $('.dot').each(function () {
      const i = $(this).data('s');
      $(this).removeClass('active done');
      if (i === si) {
        $(this).addClass('active');
        $(this).closest('.pair').addClass('active');
      } else if (i < si) {
        $(this).addClass('done');
      }
    });

    const partial = (si === lastSem && CURRENT.report === 0) ? ' · ' + REPORT_NAMES[0] : '';
    $('.view-label').text('Semester ' + (si + 1) + partial);
  }

  let line = '';

  for (let s = 0; s < 8; s++) {
    line += '<div class="pair"><div class="dots">' +
      '<button type="button" class="dot" data-s="' + s + '"' +
      ' title="Semester ' + (s + 1) + '" aria-label="Semester ' + (s + 1) + '"' +
      (s > lastSem ? ' disabled' : '') + '></button>' +
      '</div><span class="pair-label">Smt ' + (s + 1) + '</span></div>';
  }

  $('#steps').html(line);

  $('.steps').on('click', '.dot', function () {
    showSemester($(this).data('s'));
  });

  showSemester(lastSem);
});