$(function () {

  const SCALE = dataNilai.skalaNilai;
  const GRADES = dataNilai.nilai;
  const CURRENT = dataNilai.semesterAktif;

  const allCourses = krrsCourses.concat(dataNilai.mataKuliahLalu);

  let myNim = null;
  try {
    myNim = sessionStorage.getItem('userId');
  } catch (e) {
    myNim = null;
  }
  if (!myNim) {
    myNim = datamahasiswa.dataprofile[0].nim;
  }

  function findCourse(code) {
    return allCourses.find(function (c) { return c.code === code; });
  }

  function getSemester(si) {
    const list = [];
    $.each(GRADES, function (i, g) {
      if (g.semester !== si + 1) {
        return;
      }
      if (g.nim && g.nim !== myNim) {
        return;
      }
      const course = findCourse(g.code);
      if (!course) {
        return;
      }
      list.push({ code: course.code, name: course.name, sks: course.sks, akhir: g.akhir });
    });
    return list;
  }

  function average(total, credits) {
    return credits > 0 ? (total / credits).toFixed(2) : '-';
  }

  function summary(courses) {
    let credits = 0;
    let bobot = 0;
    let earned = 0;

    $.each(courses, function (i, c) {
      const grade = c.akhir;
      if (!grade) {
        return;
      }
      credits += c.sks;
      bobot += SCALE[grade] * c.sks;
      if (grade !== 'E') {
        earned += c.sks;
      }
    });

    return { credits: credits, bobot: bobot, earned: earned };
  }

  const lastSem = CURRENT.semester - 1;

  function showSemester(si) {
    const courses = getSemester(si);

    let rows = '';
    let no = 0;

    $.each(courses, function (i, c) {
      const grade = c.akhir;
      if (!grade) {
        return;
      }
      const number = SCALE[grade];
      no++;

      rows += '<tr>' +
        '<td>' + no + '</td>' +
        '<td>' + c.code + '</td>' +
        '<td>' + c.name + '</td>' +
        '<td>' + c.sks + '</td>' +
        '<td class="' + (number <= 1 ? 'low' : '') + '">' + grade + '</td>' +
        '<td>' + number.toFixed(2) + '</td>' +
        '<td>' + (number * c.sks).toFixed(2) + '</td>' +
        '</tr>';
    });

    $('#row').html(rows);

    const now = summary(courses);

    const before = { credits: 0, bobot: 0, earned: 0 };
    for (let s = 0; s < si; s++) {
      const p = summary(getSemester(s));
      before.credits += p.credits;
      before.bobot += p.bobot;
      before.earned += p.earned;
    }

    $('.table-foot').html(
      '<span>Total Kredit: <b>' + now.credits + '</b></span>' +
      '<span>Total Bobot Kualitas: <b>' + now.bobot.toFixed(2) + '</b></span>'
    );

    $('#totalSks').text(now.credits);
    $('#ips').text(average(now.bobot, now.credits));
    $('#kreditDiambil').text(before.credits + now.credits);
    $('#kreditDiperoleh').text(before.earned + now.earned);
    $('#ipk').text(average(before.bobot + now.bobot, before.credits + now.credits));

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

    $('.view-label').text('Semester ' + (si + 1));
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