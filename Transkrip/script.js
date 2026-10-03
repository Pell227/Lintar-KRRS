$(function () {

  $('#name').text(STUDENT.name);
  $('#nim').text(STUDENT.nim);
  $('#fakultas').text(STUDENT.fakultas);

  const initials = STUDENT.name.split(' ').map(function (w) { return w[0]; }).join('').slice(0, 2);
  $('#photo').on('error', function () {
    $(this).hide();
    $('.student-photo').text(initials);
  }).attr('src', STUDENT.photo);

  const lastSem = CURRENT.semester - 1;
  let rows = '';
  let no = 1;
  let totalSKS = 0;
  let totalBobot = 0;
  let totalEarned = 0;

  $.each(SEMESTERS, function (s, courses) {
    if (s > lastSem) {
      return;
    }

    const ri = (s === lastSem) ? CURRENT.report : 1;

    $.each(courses, function (i, c) {
      const grade = c[3 + ri];
      const weight = SCALE[grade];
      const mutu = weight * c[2];

      totalSKS += c[2];
      totalBobot += mutu;
      if (grade !== 'E') {
        totalEarned += c[2];
      }

      rows += '<tr>' +
        '<td>' + (no++) + '</td>' +
        '<td>' + c[0] + '</td>' +
        '<td>' + c[1] + '</td>' +
        '<td class="center">' + c[2] + '</td>' +
        '<td class="center ' + (weight <= 1 ? 'low' : '') + '">' + grade + '</td>' +
        '<td class="center">' + weight.toFixed(2) + '</td>' +
        '<td class="center">' + mutu.toFixed(2) + '</td>' +
        '</tr>';
    });
  });

  $('#row').html(rows);

  $('#kreditDiperoleh').text(totalEarned);
  $('#kreditDiambil').text(totalSKS);
  $('#ipk').text(totalSKS > 0 ? (totalBobot / totalSKS).toFixed(2) : '-');
});