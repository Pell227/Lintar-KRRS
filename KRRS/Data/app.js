(() => {
  const KEY = "lintar_krrs_windriew";
  const MIN_SKS = 20;
  const MAX_SKS = 24;
  let courses = [];

  try {
    courses = JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    courses = [];
  }

  const totalSks = courses.reduce(
    (total, course) => total + Number(course.sks || 0),
    0,
  );
  const isValid = totalSks >= MIN_SKS && totalSks <= MAX_SKS;

  document.getElementById("count").textContent = courses.length;
  document.getElementById("sks").textContent = `${totalSks} / ${MAX_SKS}`;

  const status = document.getElementById("status");
  const message = document.getElementById("message");
  const rows = document.getElementById("dataRows");

  status.textContent = courses.length
    ? isValid
      ? "Memenuhi ketentuan"
      : "Perlu diperbaiki"
    : "Belum diisi";

  message.className = `notice${isValid ? " success" : " error"}`;
  message.textContent = isValid
    ? `KRRS tersimpan dengan total ${totalSks} SKS.`
    : courses.length
      ? `Total ${totalSks} SKS. KRRS harus berjumlah minimal ${MIN_SKS} dan maksimal ${MAX_SKS} SKS.`
      : "Belum ada mata kuliah tersimpan. Silakan mulai pengisian.";

  rows.innerHTML = courses.length
    ? courses
        .map(
          (course, index) => `
            <tr>
              <td>${index + 1}</td>
              <td><strong>${course.code}</strong></td>
              <td>${course.name}</td>
              <td><span class="badge">${course.sks} SKS</span></td>
              <td>${course.kelas || course.class || "-"}</td>
              <td>${
                course.jadwal || `${course.day || ""}, ${course.time || ""}`
              }</td>
              <td>${course.ruang || course.room || "-"}</td>
            </tr>
          `,
        )
        .join("")
    : '<tr><td colspan="7"><div class="empty">Data KRRS belum tersedia.</div></td></tr>';

  document.getElementById("printLink").hidden = !isValid;
})();
