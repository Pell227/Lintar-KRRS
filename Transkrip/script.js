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

  const profile = datamahasiswa.dataprofile.find(function (p) { return p.nim === myNim; }) || {};
  const user = dummyUsers.users.find(function (u) { return u.id === myNim; }) || {};

  const STUDENT = {
    name: profile.nama || user.nama || '-',
    nim: myNim,
    fakultas: profile.Fakultas || user.fakultas || '-',
    prodi: profile.jurusan || user.prodi || '-',
    photo: 'image/profile.jpg'
  };

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

  $('#name').text(STUDENT.name);
  $('#nim').text(STUDENT.nim);
  $('#fakultas').text(STUDENT.fakultas);
  $('#prodi').text(STUDENT.prodi);

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

  for (let s = 0; s <= lastSem; s++) {
    $.each(getSemester(s), function (i, c) {
      const grade = c.akhir;
      if (!grade) {
        return;
      }
      const weight = SCALE[grade];
      const mutu = weight * c.sks;

      totalSKS += c.sks;
      totalBobot += mutu;
      if (grade !== 'E') {
        totalEarned += c.sks;
      }

      rows += '<tr>' +
        '<td>' + (no++) + '</td>' +
        '<td>' + c.code + '</td>' +
        '<td>' + c.name + '</td>' +
        '<td class="center">' + c.sks + '</td>' +
        '<td class="center ' + (weight <= 1 ? 'low' : '') + '">' + grade + '</td>' +
        '<td class="center">' + weight.toFixed(2) + '</td>' +
        '<td class="center">' + mutu.toFixed(2) + '</td>' +
        '</tr>';
    });
  }

  $('#row').html(rows);

  $('#kreditDiperoleh').text(totalEarned);
  $('#kreditDiambil').text(totalSKS);
  $('#ipk').text(totalSKS > 0 ? (totalBobot / totalSKS).toFixed(2) : '-');
});